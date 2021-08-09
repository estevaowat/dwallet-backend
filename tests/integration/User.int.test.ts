import request from 'supertest';
import { container } from 'tsyringe';

import { PrismaClient } from '@prisma/client';

import App from '../../src/app';

describe('# User', () => {
   beforeAll(async () => {
      const prisma = container.resolve<PrismaClient>('PrismaClient');
      await prisma.user.create({
         data: {
            name: 'User to find by email',
            email: 'user_find_email@account.com',
            password: '123456',
            avatarUrl: 'www.amazons3.com/user_find_email.png',
         },
      });
   });
   it('should create a user', async () => {
      const user = {
         name: 'Estevão Watanabe',
         email: 'estevao.watanabe@gmail.com',
         password: '123456',
         avatarUrl: 'www.amazons3.com/estevaowat.png',
      };

      const response = await request(App).post('/user').type('json').send(user);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
         expect.objectContaining({
            id: expect.any(Number),
            name: 'Estevão Watanabe',
            email: 'estevao.watanabe@gmail.com',
            password: '123456',
            avatarUrl: 'www.amazons3.com/estevaowat.png',
         }),
      );
   });

   it('should find a user by email', async () => {
      const response = await request(App).get('/user').type('json').query({
         email: 'user_find_email@account.com',
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
         expect.objectContaining({
            id: expect.any(Number),
            name: 'User to find by email',
            email: 'user_find_email@account.com',
            password: '123456',
            avatarUrl: 'www.amazons3.com/user_find_email.png',
         }),
      );
   });

   afterAll(async () => {
      const prisma = container.resolve<PrismaClient>('PrismaClient');

      const deleteUsers = prisma.user.deleteMany();
      await prisma.$transaction([deleteUsers]);

      await prisma.$disconnect();
   });
});
