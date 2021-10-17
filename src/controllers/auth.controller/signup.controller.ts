import { Request, Response } from 'express';
import User from '@models/User';
import Session from '@models/Session';
import handleErrs from '@utils/handleErrs.util';
import validateSchema from '@utils/validateSchema.util';
import { generateAccessToken } from '@utils/auth.util';
import { signupSchema } from '@joiSchemas/auth.schema';
import customResponse from '@interfaces/response.interface';
import { ISignup } from '@interfaces/auth.schema';

// eslint-disable-next-line @typescript-eslint/ban-types
const signup = async (req: Request<{}, {}, ISignup>, res: Response<customResponse>) => {
  try {
    await validateSchema(req, signupSchema);

    const { phone } = req.body;

    const checkIfExists = await User.find({ phone });

    // check if user exists
    if (checkIfExists.length)
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });

    const user = new User(req.body);
    await user.save();

    // get tokens
    const accessToken = generateAccessToken(user._id);

    // store a session
    const session = new Session({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      userId: user._id,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await session.save();

    // set cookies
    res.cookie('__refresh__token', session._id, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return res.status(200).send({
      success: true,
      message: 'Successfully signed up',
      accessToken,
    });
  } catch (e) {
    return handleErrs(res, e);
  }
};

export default signup;
