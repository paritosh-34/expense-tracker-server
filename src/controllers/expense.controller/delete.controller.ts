import { Request, Response } from 'express';
import Expense from '@models/Expense';
import handleErrs from '@utils/handleErrs.util';
import customResponse from '@interfaces/response.interface';

interface RequestBody {
  ids: string[];
}

const deleteController = async (
  // eslint-disable-next-line @typescript-eslint/ban-types
  req: Request<{}, {}, RequestBody>,
  res: Response<customResponse>
) => {
  try {
    const { ids } = req.body;

    const r = await Expense.deleteMany({ _id: { $in: ids } });

    return res.status(200).send({
      success: true,
      message: `Successfully deleted ${r.deletedCount} entries`,
    });
  } catch (e) {
    return handleErrs(res, e);
  }
};

export default deleteController;
