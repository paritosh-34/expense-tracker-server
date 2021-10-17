import Joi from 'joi';

const expenseSchema = Joi.object({
  data: Joi.date().required(),
  title: Joi.string().min(6).required(),
  expense: Joi.number().required(),
  state: Joi.string().required(),
}).label('IExpense');

export default expenseSchema;
