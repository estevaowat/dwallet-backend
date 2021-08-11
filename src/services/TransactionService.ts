import ITransactionRepository from 'repositories/TransactionRepository/ITransactionRepository';
import { inject, injectable } from 'tsyringe';

import ICreateTransactionDto from '@dtos/requests/ICreateTransactionDto';

@injectable()
class TransactionService {
   constructor(
      @inject('TransactionRepository')
      private transactionRepository: ITransactionRepository,
   ) {}

   async createTransaction(data: ICreateTransactionDto[]) {
      return this.transactionRepository.create(data);
   }
}

export default TransactionService;
