import mongoose, { model } from 'mongoose';
import { UserStatus } from '../../features/users/domain/User.entity';

export type RateLimitType = {
  date: Date;
  ip: string;
  url: string;
};

const Schema = new mongoose.Schema<RateLimitType>({
  date: { type: Date, required: true },
  ip: { type: String, enum: UserStatus, required: true },
  url: { type: String, required: true },
});

export const Model = model('rate-limit', Schema);

export const rateLimitRepository = {
  async getAttemptsCountFromDate(ip: string, url: string, date: Date): Promise<number> {
    return Model.countDocuments({ ip, date: { $gte: date } });
  },

  async setAttempt(ip: string, url: string, date: Date) {
    await Model.create({ ip, url, date });
  },
};
