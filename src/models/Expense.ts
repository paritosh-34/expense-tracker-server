import { model, Schema } from 'mongoose';

export interface IExpense {
  date: Date;
  title: string;
  expense: number;
  state: string;
}

const expenseSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  expense: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

export default model<IExpense>('Expense', expenseSchema);
