import { inject, injectable } from 'tsyringe';

import IFindUserByEmailAndPassword from '@dtos/requests/IFindUserByEmailAndPassword';
import IUserRepository from '@repositories/UserRepository/IUserRepository';
import {
   generateJwtToken,
   getPayloadFromJwt,
} from '@utils/authentication.utils';

@injectable()
class UserAuthenticationService {
   constructor(
      @inject('UserRepository') private userRepository: IUserRepository,
   ) {}

   async isAuthenticated(jwt: string) {
      const payload = await getPayloadFromJwt(jwt);
      const { userId } = payload;

      const user = this.userRepository.findById(Number(userId));

      const isAuthenticated = user != null;

      return isAuthenticated;
   }

   async generateAuthenticationToken({
      email,
      password,
   }: IFindUserByEmailAndPassword): Promise<string | null> {
      const user = await this.userRepository.findByEmailAndPassword({
         email,
         password,
      });

      if (user == null) {
         return null;
      }

      return generateJwtToken({ payload: { userId: user.id } });
   }
}

export default UserAuthenticationService;
