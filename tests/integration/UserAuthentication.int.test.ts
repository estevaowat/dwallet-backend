import request from 'supertest';
import { container } from 'tsyringe';

import { PrismaClient } from '@prisma/client';

import App from '../../src/app';

describe('#User Authentication', () => {
   beforeAll(async () => {
      const user = {
         name: 'User to authenticate',
         email: 'user_to_authenticate@email.com',
         password: 'PASSWORD_SUPER_SECRET',
         avatarUrl: 'www.amazons3.com/estevaowat.png',
      };

      await request(App).post('/user').type('json').send(user);
   });

   it('should create a jwt token when user exists', async () => {
      const userCredentials = {
         email: 'user_to_authenticate@email.com',
         password: 'PASSWORD_SUPER_SECRET',
      };

      const response = await request(App)
         .post('/authentication')
         .type('json')
         .send(userCredentials);

      expect(response.statusCode).toBe(200);

      const cookieToken = response.headers['set-cookie'][0];

      const [, jwt] = cookieToken.split('=');

      expect(jwt).toStrictEqual(expect.any(String));
      expect(response.body.name).toBe('User to authenticate');
      expect(response.body.email).toBe('user_to_authenticate@email.com');
   });

   it('should return response 400 when user not exists', async () => {
      const userCredentials = {
         email: 'user_not_exists@notexists.com',
         password: 'PASSWORD_SUPER_WEAK',
      };
      const response = await request(App)
         .post('/authentication')
         .type('json')
         .send(userCredentials);

      expect(response.statusCode).toBe(400);
      expect(response.body.description).toBe('User or password incorrect');
   });
   it('should return response 400 when user credentials are wrong', async () => {
      const userCredentials = {
         email: 'user_to_authenticate@email.com',
         password: 'PASSWORD_WEAK',
      };
      const response = await request(App)
         .post('/authentication')
         .type('json')
         .send(userCredentials);

      expect(response.statusCode).toBe(400);
      expect(response.body.description).toBe('User or password incorrect');
   });

   afterAll(async () => {
      const prisma = container.resolve<PrismaClient>('PrismaClient');
      const deleteUsers = prisma.user.deleteMany();
      await prisma.$transaction([deleteUsers]);
      await prisma.$disconnect();
   });
});
