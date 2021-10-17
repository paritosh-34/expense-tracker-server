import { Response } from 'express';
import { ValidationError } from 'joi';
import handleIsJoi from '@utils/handleIsJoi.util';
import handleUnexpectedErr from '@utils/handleUnexpectedErr.util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleErrs = (res: Response, e: any) => {
  const error = e as ValidationError;
  if (error.isJoi) return handleIsJoi(res, error.details[0].message);

  return handleUnexpectedErr(res, error);
};

export default handleErrs;
