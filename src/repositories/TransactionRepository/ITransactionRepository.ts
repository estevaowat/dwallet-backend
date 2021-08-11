import ICreateTransactionDto from '@dtos/requests/ICreateTransactionDto';

export default interface ITransactionRepository {
   create(listTransactions: ICreateTransactionDto[]): Promise<number>;
}
