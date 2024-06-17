import mongoose, { model } from 'mongoose';

export enum UserStatus {
  active,
  inActive,
  banned,
}

export type UserType = {
  email: string;
  login: string;
  passwordHash: string;
  age: number;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date | null;
};

export const UserSchema = new mongoose.Schema<UserType>({
  email: { type: String, required: true },
  status: { type: Number, enum: UserStatus, required: true },
  passwordHash: { type: String, required: true },
  age: { type: Number, required: true },
  createdAt: { type: Date, default: new Date() },
  login: { type: String, required: true },
  updatedAt: { type: Date, default: null },
});

export const UserModel = model('users', UserSchema);
