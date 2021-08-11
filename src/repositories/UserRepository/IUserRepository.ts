import ICreateUserDto from '@dtos/requests/ICreateUserDto';
import IFindUserByEmailAndPassword from '@dtos/requests/IFindUserByEmailAndPassword';
import IUserFound from '@dtos/result/IUserFound';
import { User } from '@prisma/client';

export default interface IUserRepository {
   create(data: ICreateUserDto): Promise<User>;
   findByEmail(email: string): Promise<IUserFound | null>;
   findById(id: number): Promise<IUserFound | null>;
   findByEmailAndPassword({
      email,
      password,
   }: IFindUserByEmailAndPassword): Promise<IUserFound | null>;
}
