import { WithId } from 'mongodb';
import { UserModel, UserStatus, UserType } from '../domain/User.entity';

export const userRepository = {
  async getUsers(): Promise<WithId<UserType>[]> {
    return UserModel.find();
  },

  getUser(id: string): Promise<WithId<UserType> | null> {
    return UserModel.findOne({ _id: id });
  },

  getUserByLogin(login: string): Promise<WithId<UserType> | null> {
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
    });

    return result._id.toString();
  },

  async updateUser(
    id: string,
    { email, login, age }: Omit<UserType, 'passwordHash' | 'status'>
  ): Promise<void> {
    await UserModel.updateOne({ _id: id }, { email, login, age });
  },
};