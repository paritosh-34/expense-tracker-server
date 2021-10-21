import Joi from 'joi';

const expenseSchema = Joi.object({
  date: Joi.date().required(),
  title: Joi.string().required(),
  expense: Joi.number().required(),
  state: Joi.string().required(),
}).label('IExpense');

export default expenseSchema;
