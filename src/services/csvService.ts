import csvParser from 'csv-parser';
import fs from 'fs';

import { createContext } from '@database/context';

const context = createContext();

interface IStockTransactionCSV {
   stockCode: string;
   userId: number;
   price: number;
   amount: number;
}
interface IStockTransaction {
   stockId: number;
   userId: number;
   price: number;
   amount: number;
}

const transformTransaction = ({
   stockCode,
   userId,
   price,
   amount,
}: IStockTransactionCSV) => {
   return {
      stockCode,
      userId: Number(userId),
      price: Number(price),
      amount: Number(amount),
   };
};

const parseCsv = (filePath: string): Promise<IStockTransactionCSV[]> => {
   const csvParsed: IStockTransactionCSV[] = [];

   return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
         .pipe(csvParser())
         .on('data', (data) => {
            const transaction = transformTransaction(data);
            csvParsed.push(transaction);
         })
         .on('error', (error) => reject(error))
         .on('end', () => {
            resolve(csvParsed);
         });
   });
};

const formatTransactions = async (
   transactions: IStockTransactionCSV[],
): Promise<IStockTransaction[]> => {
   const stocks = await context.prisma.stock.findMany();
   const transactionsFiltered = transactions.filter((transaction) => {
      return stocks.find((stock) => stock.code === transaction.stockCode);
   });

   return transactionsFiltered.map<IStockTransaction>((transaction) => {
      const { userId, price, amount } = transaction;
      const stockFound = stocks.find(
         (stock) => stock.code === transaction.stockCode,
      );
      return {
         stockId: stockFound!.id,
         userId,
         price,
         amount,
      };
   });
};

export default async (filePath: string) => {
   const csvParsed = await parseCsv(filePath);
   const stockTransactions = await formatTransactions(csvParsed);

   const transactionsSaved = await context.prisma.stockTransaction.createMany({
      data: stockTransactions,
   });
   return transactionsSaved;
};
