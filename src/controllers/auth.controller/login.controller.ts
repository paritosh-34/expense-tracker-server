import { Request, Response } from 'express';
import logger from '@logger';
import Session from '@models/Session';
import User from '@models/User';
import handleErrs from '@utils/handleErrs.util';
import validateSchema from '@utils/validateSchema.util';
import { generateAccessToken, generateRefreshToken } from '@utils/auth.util';
import { loginSchema } from '@joiSchemas/auth.schema';
import customResponse from '@interfaces/response.interface';
import { ILogin } from '@interfaces/auth.schema';

// eslint-disable-next-line @typescript-eslint/ban-types
const login = async (req: Request<{}, {}, ILogin>, res: Response<customResponse>) => {
  try {
    await validateSchema(req, loginSchema);

    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    logger.info('yoo checkkkk');

    logger.debug(user!, 'check');
    // check if user exists
    if (!user)
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });

    // check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(404).send({
        success: false,
        message: 'Invalid phone/password',
      });

    // get tokens
    const refreshToken = generateRefreshToken();
    const accessToken = generateAccessToken(user._id);

    // store a session
    const session = new Session({
      refreshToken,
      userId: user._id,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await session.save();

    // set cookies
    res.cookie('__refresh__token', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return res.status(200).send({
      success: true,
      message: 'Successfully logged in',
      accessToken,
    });
  } catch (e) {
    return handleErrs(res, e);
  }
};

export default login;
