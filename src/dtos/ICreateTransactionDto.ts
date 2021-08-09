export default interface ICreateTransactionDto {
   userId: number;
   description: string;
   type: 'SPENDING' | 'INCOME';
}
