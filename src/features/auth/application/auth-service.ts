import { cryptoService } from '../../../core/services/crypto-service';
import { userRepository } from '../../users/infrastructure/user-repository';

export const authService = {
  async checkCredentials(login: string, password: string): Promise<string | null> {
    const user = await userRepository.getUserByLogin(login);

    if (!user) {
      return null;
    }

    const isCorrectPassword = await cryptoService.compareHash(password, user.passwordHash);

    if (isCorrectPassword) {
      return user._id.toString();
    }

    return null;
  },
};
