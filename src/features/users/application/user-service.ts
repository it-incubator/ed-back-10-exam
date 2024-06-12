import {userRepository} from '../infrastructure/user-repository';
import {cryptoService} from '../../../core/services/crypto-service';
import {emailAdapter} from "../../../core/adapters/email.adapter";
import {userQueryRepository} from "../infrastructure/user-query-repo";
import {handleForbiddenResult, handleNotFoundResult, handleSuccessResult, Result} from "../../../core/result-code";
import {generateUniqCode} from "../../../helpers/generate-uniq-code";

export const userService = {
  async registerUser(email: string, login: string, password: string, age: number): Promise<Result<string | null>> {
    if(age < 18) {
      return handleForbiddenResult('too yang');
    }

    const salt = await cryptoService.generateSalt();
    const passwordHash = await cryptoService.generateHash(password, salt);

    const createdId = await userRepository.createUser(email, login, passwordHash, age);
    const code = generateUniqCode();

    try {
        await emailAdapter.sendRegistrationEmail(email, code);
    } catch (error) {
      console.log(error);
    }

    return handleSuccessResult(createdId.toString());
  },

  async updateUser(id: string, login: string, email: string, age: number): Promise<Result<null>> {
    const user  = await userRepository.getUser(id);

    if(!user) {
      return handleNotFoundResult('such user not found');
    }

    //TODO: add business logic: only a user with Active status can be updated

    await userRepository.updateUser(id, { login, email, age });

    return handleSuccessResult(null);
  },
};
