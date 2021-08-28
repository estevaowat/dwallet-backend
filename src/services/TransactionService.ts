import * as csv from 'fast-csv';
import ITransactionRepository from 'repositories/TransactionRepository/ITransactionRepository';
import { Readable } from 'stream';
import { inject, injectable } from 'tsyringe';

import ICreateTransactionDto from '@dtos/requests/services/ICreateTransactionDto';

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
         headers: true,
         delimiter: ',',
      };
      const transactions = [];
      return new Promise<number>((resolve, reject) => {
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

               transactions.push(transaction);

               await this.transactionRepository.create(transaction);
            })
            .on('end', () => {
               resolve(transactions.length);
            })
            .on('error', () => {
               reject();
            });
      });
   }
}

export default TransactionService;
