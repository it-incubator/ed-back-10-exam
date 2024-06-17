import { WithId } from 'mongodb';
import { UserModel, UserStatus, UserType } from '../domain/User.entity';
import { HydratedDocument } from 'mongoose';

export const userRepository = {
  async getUsers(): Promise<HydratedDocument<UserType>[]> {
    return UserModel.find();
  },

  getUser(id: string): Promise<HydratedDocument<UserType> | null> {
    return UserModel.findOne({ _id: id });
  },

  getUserByLogin(login: string): Promise<HydratedDocument<UserType> | null> {
    return UserModel.findOne({ login });
  },

  async createUser(
    email: string,
    login: string,
    passwordHash: string,
    age: number
  ): Promise<string> {
    const result = await UserModel.create({
      email,
      login,
      passwordHash,
      age,
      status: UserStatus.active,
      createdAt: new Date(),
    });

    return result._id.toString();
  },

  async updateUser(
    id: string,
    { email, login, age }: Omit<UserType, 'passwordHash' | 'status' | 'createdAt'>
  ): Promise<void> {
    await UserModel.updateOne({ _id: id }, { email, login, age });
  },
};
