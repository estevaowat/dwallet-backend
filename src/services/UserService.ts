import IUserRepository from 'repositories/UserRepository/IUserRepository';
import { inject, injectable } from 'tsyringe';

import ICreateUserDto from '@dtos/requests/services/ICreateUserDto';
import authenticationUtils from '@utils/authentication.utils';

@injectable()
class UserService {
   constructor(
      @inject('UserRepository') private userRepository: IUserRepository,
   ) {}

   async createUser({ name, email, password, avatarUrl }: ICreateUserDto) {
      const salt = await authenticationUtils.generateRandomSalt();
      const passwordHash = await authenticationUtils.generatePasswordHash(
         password,
         salt,
      );

      const user = await this.userRepository.create({
         name,
         email,
         passwordHash,
         salt,
         avatarUrl,
      });

      return user;
   }

   async findByEmail(email: string) {
      return this.userRepository.findByEmail(email);
   }
}

export default UserService;
