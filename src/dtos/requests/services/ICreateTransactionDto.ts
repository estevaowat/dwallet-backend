export default interface ICreateTransactionDto {
   userId: number;
   description: string;
   transactionDate: Date;
   amount: number;
   type: 'SPENDING' | 'INCOME';
}
