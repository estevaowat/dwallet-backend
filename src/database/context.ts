import { PrismaClient } from '@prisma/client';

export interface Context {
   prisma: PrismaClient;
}

export function createContext(): Context {
   return {
      prisma: new PrismaClient(),
   };
}

export function createTestContext(): Context {
   return {
      prisma: new PrismaClient(),
   };
}
