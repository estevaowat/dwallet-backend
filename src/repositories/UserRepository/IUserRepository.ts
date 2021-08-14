import ICreateUserDto from '@dtos/requests/repositories/ICreateUserDto';
import IUserFound from '@dtos/result/IUserFound';
import { User } from '@prisma/client';

export default interface IUserRepository {
   create(data: ICreateUserDto): Promise<User>;
   findByEmail(email: string): Promise<User | null>;
   findById(id: number): Promise<IUserFound | null>;
}
