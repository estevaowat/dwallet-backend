import { createContext } from '@database/context';

const context = createContext();

interface Stock {
   code: string;
   name: string;
   currentPrice: number;
}

export function createStocks(stocks: Stock[]) {
   return context.prisma.stock.createMany({ data: stocks });
}

export function findAll() {
   return context.prisma.stock.findMany();
}

export function findByCode(code: string) {
   return context.prisma.stock.findUnique({
      where: {
         code,
      },
   });
}
