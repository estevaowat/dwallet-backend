import ICreateUserDto from 'dtos/ICreateUserDto';
import IUserRepository from 'repositories/UserRepository/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class UserService {
   constructor(
      @inject('UserRepository') private userRepository: IUserRepository,
   ) {}

   async createUser({ name, email, password, avatarUrl }: ICreateUserDto) {
      const user = await this.userRepository.create({
         name,
         email,
         password,
         avatarUrl,
      });
      return user;
   }

   async findByEmail(email: string) {
      const user = await this.userRepository.findByEmail(email);
      return user;
   }
}

export default UserService;
