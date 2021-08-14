import request from 'supertest';
import { container } from 'tsyringe';

import { PrismaClient, Type } from '@prisma/client';
import authenticationUtils from '@utils/authentication.utils';

import App from '../../src/app';

describe('#Transaction', () => {
   it('should create a transaction', async () => {
      const prisma = container.resolve<PrismaClient>('PrismaClient');
      const user = {
         name: 'Create transaction',
         email: 'create_transaction@transaction.com',
         passwordHash: '123456',
         salt: '123',
         avatarUrl: 'www.amazons3.com/create_transaction.png',
      };
      const userCreated = await prisma.user.create({ data: user });

      const transaction = {
         userId: userCreated?.id,
         description: 'Salary August 2021',
         transactionDate: new Date(),
         amount: 7000,
         type: Type.INCOME,
      };

      const jwt = await authenticationUtils.generateJwtToken({
         payload: { userId: userCreated.id },
      });

      const response = await request(App)
         .post('/transaction')
         .type('json')
         .set('Authorization', `Bearer ${jwt}`)
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
