import Joi from 'joi';

const signupSchema = Joi.object({
  firstName: Joi.string().min(6).required(),
  lastName: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^\d{10}/)
    .required(),
  password: Joi.string().min(6).required(),
}).label('ISignup');

const loginSchema = Joi.object({
  phone: Joi.string()
    .length(10)
    .pattern(/^\d{10}/)
    .required(),
  password: Joi.string().min(6).required(),
}).label('ILogin');

export { signupSchema, loginSchema };
