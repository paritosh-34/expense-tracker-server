import { Response, Request } from 'express';
import Session from '@models/Session';
import customResponse from '@interfaces/response.interface';

const logout = async (req: Request, res: Response<customResponse>) => {
  const refreshToken = (req.cookies as Record<string, string>).__refresh__token;

  if (!refreshToken) {
    return res.status(401).send({
      success: false,
      message: 'Refresh token not found',
    });
  }

  await Session.findByIdAndRemove(refreshToken);

  return res
    .status(200)
    .cookie('__refresh__token', '', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(),
    })
    .send({
      success: true,
      message: 'Successfully logged out',
    });
};

export default logout;
