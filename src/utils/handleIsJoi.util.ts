import { Response } from 'express';
import customResponse from '@interfaces/response.interface';

const handleIsJoi = (res: Response<customResponse>, message: string) =>
  res.status(422).send({
    success: false,
    message,
  });

export default handleIsJoi;
