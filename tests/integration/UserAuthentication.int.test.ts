import request from 'supertest';
import { container } from 'tsyringe';

import { PrismaClient } from '@prisma/client';

import App from '../../src/app';

describe('#User Authentication', () => {
   // beforeAll(async () => {});

   it.todo('should create a jwt token when user exists');

   it.todo('should return response 400 when user not exists');

   //   afterAll(async () => {});
});
