import ICreateTransactionDto from 'dtos/ICreateTransactionDto';
import ITransactionRepository from 'repositories/TransactionRepository/ITransactionRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class TransactionService {
   constructor(
      @inject('TransactionRepository')
      private transactionRepository: ITransactionRepository,
   ) {}

   async createTransaction({
      userId,
      description,
      type,
   }: ICreateTransactionDto) {
      return this.transactionRepository.create({
         userId: Number(userId),
         description,
         type,
      });
   }
}

export default TransactionService;
