import { model, Schema, Types } from 'mongoose';

export interface SessionDocument {
  refreshToken: string;
  userId: Types.ObjectId;
  expiryDate: Date;
}

const sessionSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  expiryDate: {
    type: Date,
    required: true,
  },
});

sessionSchema.index({ refreshToken: 1 });

export default model<SessionDocument>('Session', sessionSchema);
