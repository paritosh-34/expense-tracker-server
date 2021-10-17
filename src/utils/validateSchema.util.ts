import { Request } from 'express';
import Joi from 'joi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateSchema = async (req: Request, validationFn: Joi.ObjectSchema): Promise<any> => {
  return validationFn.validateAsync(req.body);
};

export default validateSchema;
