import ICreateTransactionDto from '@dtos/requests/services/ICreateTransactionDto';

export default interface ITransactionRepository {
   create(listTransactions: ICreateTransactionDto[]): Promise<number>;
}
