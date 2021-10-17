import { model, Schema, Types } from 'mongoose';

export interface ExpenseInput {
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

export interface ExpenseDocument extends ExpenseInput {
  _id: Types.ObjectId;
}

export default model<ExpenseInput>('Expense', expenseSchema);
