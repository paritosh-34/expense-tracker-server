import { Request, Response } from 'express';
import Expense from '@models/Expense';
import handleErrs from '@utils/handleErrs.util';

const all = async (req: Request, res: Response) => {
  try {
    const r = await Expense.find();

    res.send({
      success: true,
      message: '',
      data: r,
    });
  } catch (e) {
    handleErrs(res, e);
  }
};

export default all;
