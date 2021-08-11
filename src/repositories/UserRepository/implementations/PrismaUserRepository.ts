import { inject, injectable } from 'tsyringe';

import ICreateUserDto from '@dtos/requests/ICreateUserDto';
import IFindUserByEmailAndPassword from '@dtos/requests/IFindUserByEmailAndPassword';
import IUserFound from '@dtos/result/IUserFound';
import { PrismaClient, User } from '@prisma/client';

import IUserRepository from '../IUserRepository';

@injectable()
export default class PrismaUserRepository implements IUserRepository {
   constructor(@inject('PrismaClient') private database: PrismaClient) {}

   async findById(id: number): Promise<IUserFound | null> {
      const user = await this.database.user.findUnique({
         where: {
            id,
         },
      });

      if (user == null) {
         return null;
      }

      const { name, email } = user;
      return { id, name, email };
   }

   async findByEmailAndPassword({
      email,
      password,
   }: IFindUserByEmailAndPassword): Promise<IUserFound | null> {
      const user = await this.database.user.findFirst({
         where: {
            email,
            password,
         },
      });

      if (user == null) {
         return null;
      }

      const { id, name } = user;
      return { id, name, email };
   }

   async findByEmail(email: string): Promise<IUserFound | null> {
      const user = await this.database.user.findFirst({
         where: {
            email,
         },
      });

      if (user == null) {
         return null;
      }

      const { id, name } = user;
      return { id, name, email };
   }

   async create(data: ICreateUserDto): Promise<User> {
      return this.database.user.create({ data });
   }
}
