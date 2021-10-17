import { Request, Response } from 'express';
import Session from '@models/Session';
import { generateAccessToken } from '@utils/auth.util';
import handleErrs from '@utils/handleErrs.util';
import customResponse from '@interfaces/response.interface';

const requestRefresh = async (req: Request, res: Response<customResponse>) => {
  try {
    const refreshToken = (req.cookies as Record<string, string>).__refresh__token;

    if (!refreshToken)
      return res.status(401).send({
        success: false,
        message: 'Session not found',
      });

    const session = await Session.findOne({
      refreshToken,
    });

    if (!session)
      return res.status(401).send({
        success: false,
        message: 'Session not found',
      });

    const expiryDate = new Date(session.expiryDate);
    const currentDate = new Date();

    if (currentDate > expiryDate) {
      await session.remove();
      return res.status(401).send({
        success: false,
        message: 'Session expired',
      });
    }

    session.expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await session.save();

    const accessToken = generateAccessToken(session.userId);

    return res.send({
      success: true,
      message: 'Session authenticated',
      accessToken,
    });
  } catch (e) {
    return handleErrs(res, e);
  }
};

export default requestRefresh;
