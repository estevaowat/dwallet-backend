import csvParser from 'csv-parser';
import fs from 'fs';

interface IStockTransactionCSV {
   stockCode: string;
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
         .on('data', data => {
            const transaction = transformTransaction(data);
            csvParsed.push(transaction);
         })
         .on('error', error => reject(error))
         .on('end', () => {
            resolve(csvParsed);
         });
   });
};

const importCsv = async (filePath: string) => {
   const csvParsed = await parseCsv(filePath);

   return csvParsed;
};

export default () => {
   return { importCsv };
};
