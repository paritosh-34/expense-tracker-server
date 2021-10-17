import { model, Schema, Types } from 'mongoose';

interface ISession {
  userId: Types.ObjectId;
  expiryDate: Date;
}

const sessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  expiryDate: {
    type: Date,
    required: true,
  },
});

export default model<ISession>('Session', sessionSchema);
