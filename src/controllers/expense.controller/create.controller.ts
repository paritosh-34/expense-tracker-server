import { Request, Response } from 'express';
import Expense from '@models/Expense';
import handleErrs from '@utils/handleErrs.util';
import validateSchema from '@utils/validateSchema.util';
import expenseSchema from '@joiSchemas/expense.schema';
import { IExpense } from '@interfaces/expense.schema';
import customResponse from '@interfaces/response.interface';

// eslint-disable-next-line @typescript-eslint/ban-types
const create = async (req: Request<{}, {}, IExpense>, res: Response<customResponse>) => {
  try {
    await validateSchema(req, expenseSchema);

    const expense = new Expense(req.body);
    await expense.save();

    res.status(201).send({
      success: true,
      message: 'Successfully saved',
    });
  } catch (e) {
    handleErrs(res, e);
  }
};

export default create;
