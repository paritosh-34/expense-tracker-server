import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, sign, verify } from 'jsonwebtoken';
import { Types } from 'mongoose';
import handleUnexpectedErr from '@utils/handleUnexpectedErr.util';
import customResponse from '@interfaces/response.interface';
import jwtPayload from '@interfaces/customs.interface';

const getSecret = () => {
  const secret = process.env.SECRET_KEY;
  if (!secret) throw new Error('Secret not found');

  return secret;
};

const generateAccessToken = (userId: Types.ObjectId): string =>
  sign({ userId }, getSecret(), {
    expiresIn: '15m',
  });

const authenticate = (req: Request, res: Response<customResponse>, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).send({
      success: false,
      message: 'Authorization failed',
    });

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, getSecret()) as jwtPayload;
    req.userId = payload.userId;
    return next();
  } catch (_error) {
    const error = _error as JsonWebTokenError;

    if (error.message) {
      return res.status(401).send({
        success: false,
        message: error.message,
      });
    }

    return handleUnexpectedErr(res, error);
  }
};

export { generateAccessToken, authenticate };
