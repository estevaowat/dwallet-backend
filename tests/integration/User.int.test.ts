import request from 'supertest';
import { container } from 'tsyringe';

import { PrismaClient } from '@prisma/client';
import authenticationUtils from '@utils/authentication.utils';

import App from '../../src/app';

describe('#User', () => {
   it('should create a user', async () => {
      const user = {
         name: 'Create user',
         email: 'create_user@email.com',
         password: '123456',
         avatarUrl: 'www.amazons3.com/estevaowat.png',
      };

      const response = await request(App).post('/user').type('json').send(user);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
         expect.objectContaining({
            id: expect.any(Number),
            name: 'Create user',
            email: 'create_user@email.com',
            avatarUrl: 'www.amazons3.com/estevaowat.png',
         }),
      );
   });

   it('should find a user by email', async () => {
      const prisma = container.resolve<PrismaClient>('PrismaClient');
      const user = await prisma.user.create({
         data: {
            name: 'User to find by email',
            email: 'user_find_email@account.com',
            passwordHash: '123456',
            salt: '123',
            avatarUrl: 'www.amazons3.com/user_find_email.png',
         },
      });

      const jwt = await authenticationUtils.generateJwtToken({
         payload: { userId: user.id },
      });

      const response = await request(App)
         .get('/user')
         .type('json')
         .set('Authorization', `Bearer ${jwt}`)
         .query({
            email: 'user_find_email@account.com',
         });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
         expect.objectContaining({
            id: expect.any(Number),
            name: 'User to find by email',
            email: 'user_find_email@account.com',
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
