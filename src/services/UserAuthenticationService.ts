import { inject, injectable } from 'tsyringe';

import IFindUserByEmailAndPassword from '@dtos/requests/services/IFindUserByEmailAndPassword';
import IUserRepository from '@repositories/UserRepository/IUserRepository';
import AppError from '@shared/AppError';
import authenticationUtils from '@utils/authentication.utils';

@injectable()
class UserAuthenticationService {
   constructor(
      @inject('UserRepository') private userRepository: IUserRepository,
   ) {}

   async isAuthenticated(jwt: string) {
      const payload = await authenticationUtils.getPayloadFromJwt(jwt);

      if (payload == null) {
         return false;
      }

      const { userId } = payload;
      const user = await this.userRepository.findById(Number(userId));

      return user != null;
   }

   async generateAuthenticationToken({
      email,
      password,
   }: IFindUserByEmailAndPassword): Promise<string | null> {
      const user = await this.userRepository.findByEmail(email);

      if (user == null) {
         throw new AppError(400, 'User or password incorrect', true);
      }

      const isPasswordValid = await authenticationUtils.isPasswordValid(
         password,
         user.passwordHash,
      );

      if (!isPasswordValid) {
         throw new AppError(400, 'User or password incorrect', true);
      }

      const jwt = await authenticationUtils.generateJwtToken({
         payload: { userId: user.id },
      });

      return jwt;
   }
}

export default UserAuthenticationService;
