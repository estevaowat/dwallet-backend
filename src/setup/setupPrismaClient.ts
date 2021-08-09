import { container } from 'tsyringe';

import { PrismaClient } from '@prisma/client';

export default () => {
   container.register<PrismaClient>('PrismaClient', {
      useValue: new PrismaClient(),
   });
};
