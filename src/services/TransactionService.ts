import * as csv from 'fast-csv';
import ITransactionRepository from 'repositories/TransactionRepository/ITransactionRepository';
import { Readable } from 'stream';
import { inject, injectable } from 'tsyringe';

import ICreateTransactionDto from '@dtos/requests/services/ICreateTransactionDto';
import AppError from '@shared/AppError';

@injectable()
class TransactionService {
   constructor(
      @inject('TransactionRepository')
      private transactionRepository: ITransactionRepository,
   ) {}

   async createTransaction(data: ICreateTransactionDto) {
      return this.transactionRepository.create(data);
   }

   async createTransactionsByCsv({
      userId,
      transactionsBuffer,
   }: {
      userId: number;
      transactionsBuffer: Buffer[];
   }) {
      const stream = Readable.from(transactionsBuffer);
      const options = {
         headers: ['date', 'category', 'title', 'amount'],
         delimiter: ',',
      };
      return new Promise<void>((resolve, _) => {
         stream
            .pipe(csv.parse(options))
            .on('data', async row => {
               const transaction: ICreateTransactionDto = {
                  userId,
                  description: row.title,
                  transactionDate: new Date(row.date),
                  amount: Number(row.amount),
                  type: row.amount < 0 ? 'SPENDING' : 'INCOME',
               };

               await this.transactionRepository.create(transaction);
            })
            .on('end', () => {
               resolve();
            })
            .on('error', () => {
               throw new AppError(400, 'CSV Mal-formatted', true);
            });
      });
   }
}

export default TransactionService;
