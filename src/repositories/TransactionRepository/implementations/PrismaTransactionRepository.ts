import ICreateTransactionDto from 'dtos/ICreateTransactionDto';
import { inject, injectable } from 'tsyringe';

import { PrismaClient, Transaction } from '@prisma/client';

import ITransactionRepository from '../ITransactionRepository';

@injectable()
export default class PrismaTransactionRepository
   implements ITransactionRepository
{
   constructor(@inject('PrismaClient') private database: PrismaClient) {}

   async create(data: ICreateTransactionDto): Promise<Transaction> {
      return this.database.transaction.create({ data });
   }
}
