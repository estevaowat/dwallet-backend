import ICreateUserDto from 'dtos/ICreateUserDto';
import { inject, injectable } from 'tsyringe';

import { PrismaClient, User } from '@prisma/client';

import IUserRepository from '../IUserRepository';

@injectable()
export default class PrismaUserRepository implements IUserRepository {
   constructor(@inject('PrismaClient') private database: PrismaClient) {}

   async findByEmail(email: string): Promise<User | null> {
      return this.database.user.findUnique({
         where: {
            email,
         },
      });
   }

   async create(data: ICreateUserDto): Promise<User> {
      return this.database.user.create({ data });
   }
}
