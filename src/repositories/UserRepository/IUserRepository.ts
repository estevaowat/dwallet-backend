import ICreateUserDto from 'dtos/ICreateUserDto';

import { User } from '@prisma/client';

export default interface IUserRepository {
   create(data: ICreateUserDto): Promise<User>;
   findByEmail(email: string | undefined): Promise<User | null>;
}
