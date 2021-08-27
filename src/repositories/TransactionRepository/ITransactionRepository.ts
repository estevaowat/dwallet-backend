import ICreateTransactionDto from '@dtos/requests/services/ICreateTransactionDto';

interface ITransaction {
   id: number;
   description: string;
   userId: number;
   transactionDate: Date;
}

export default interface ITransactionRepository {
   createMany(listTransactions: ICreateTransactionDto[]): Promise<number>;
   create(transaction: ICreateTransactionDto): Promise<ITransaction>;
}
