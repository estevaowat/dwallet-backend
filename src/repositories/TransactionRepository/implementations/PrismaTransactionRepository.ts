import { inject, injectable } from 'tsyringe';

import ICreateTransactionDto from '@dtos/requests/services/ICreateTransactionDto';
import { PrismaClient, Transaction } from '@prisma/client';

import ITransactionRepository from '../ITransactionRepository';

@injectable()
export default class PrismaTransactionRepository
   implements ITransactionRepository
{
   constructor(@inject('PrismaClient') private database: PrismaClient) {}

   async create(transaction: ICreateTransactionDto): Promise<Transaction> {
      return this.database.transaction.create({
         data: transaction,
      });
   }

   async createMany(
      listTransactions: ICreateTransactionDto[],
   ): Promise<number> {
      const transactionsCreated = await this.database.transaction.createMany({
         data: listTransactions,
      });

      return transactionsCreated.count;
   }
}
