import { Response } from 'express';
import logger from '@logger/index';
import customResponse from '@interfaces/response.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleUnexpectedErr = (res: Response<customResponse>, e: any) => {
  logger.error(e);
  return res.status(501).send({
    success: false,
    message: 'Unexpected error occurred!',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    error: e,
  });
};

export default handleUnexpectedErr;
