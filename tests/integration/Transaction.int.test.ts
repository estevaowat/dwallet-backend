import request from 'supertest';
import { container } from 'tsyringe';

import { PrismaClient, Type } from '@prisma/client';

import App from '../../src/app';

describe('#Transaction', () => {
   beforeAll(async () => {
      const prisma = container.resolve<PrismaClient>('PrismaClient');

      const user = {
         name: 'Create transaction',
         email: 'create_transaction@transaction.com',
         password: '123456',
         avatarUrl: 'www.amazons3.com/create_transaction.png',
      };
      await prisma.user.create({ data: user });
   });

   it('should create a transaction', async () => {
      const prisma = container.resolve<PrismaClient>('PrismaClient');
      const userCreated = await prisma.user.findUnique({
         where: {
            email: 'create_transaction@transaction.com',
         },
      });

      const transaction = {
         userId: userCreated?.id,
         description: 'Salary August 2021',
         type: Type.INCOME,
      };

      const response = await request(App)
         .post('/transaction')
         .type('json')
         .send(transaction);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
         expect.objectContaining({
            count: 1,
         }),
      );
   });

   afterAll(async () => {
      const prisma = container.resolve<PrismaClient>('PrismaClient');
      const deleteTransactions = prisma.transaction.deleteMany();
      const deleteUsers = prisma.user.deleteMany();
      await prisma.$transaction([deleteTransactions, deleteUsers]);
      await prisma.$disconnect();
   });
});
