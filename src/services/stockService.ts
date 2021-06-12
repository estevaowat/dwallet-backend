import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
 
interface Stock {
   code: string;
   name: string;
   currentPrice: number;
}

export function createStocks (stocks: Stock[])  {

      
}
   
export function findAll() {
   return   prisma.stock.findMany();
}
 
 