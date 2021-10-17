import { Document, model, Schema, Types } from 'mongoose';

export interface SessionInput {
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

export interface SessionDocument extends SessionInput, Document {
  _id: Types.ObjectId;
}

export default model<SessionDocument>('Session', sessionSchema);
