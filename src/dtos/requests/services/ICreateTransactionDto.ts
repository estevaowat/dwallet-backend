export default interface ICreateTransactionDto {
   userId: number;
   description: string;
   transactionDate: Date | string;
   amount: number;
   type: 'SPENDING' | 'INCOME';
}
