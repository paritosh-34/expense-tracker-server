import argon2 from 'argon2';
import { model, Schema, Document } from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  fullName: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    length: 10,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.index({ phone: 1 });

userSchema.virtual('fullName').get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre<IUser & Document>('save', async function (next) {
  if (this.isModified('password')) {
    const hash = await argon2.hash(this.password);
    this.password = hash;
  }

  next();
});

userSchema.methods.comparePassword = function (this: IUser, candidatePassword: string) {
  return argon2.verify(this.password, candidatePassword);
};

export default model<IUser>('User', userSchema);
