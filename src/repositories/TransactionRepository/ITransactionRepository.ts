import ICreateTransactionDto from 'dtos/ICreateTransactionDto';

import { Transaction } from '@prisma/client';

export default interface ITransactionRepository {
   create(data: ICreateTransactionDto): Promise<Transaction>;
}
