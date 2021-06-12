import { createContext } from '@database/context';
import { findAll } from '@services/stockService';

const context = createContext();

describe('Stocks transation unit tests', () => {
   beforeAll(async () => {
      await context.prisma.stock.create({
         data: {
            id: 1,
            name: 'Netflix',
            code: 'NTF34',
            currentPrice: 12.33,
         },
      });
   });
   it('should find all stocks', async () => {
      const stocks = await findAll();
      const firstStock = stocks[0];

      expect(firstStock).toHaveProperty('id', 1);
      expect(firstStock).toHaveProperty('name', 'Netflix');
      expect(firstStock).toHaveProperty('code', 'NTF34');
   });
   afterAll(async () => {
      const deleteStocks = context.prisma.stock.deleteMany();

      await context.prisma.$transaction([deleteStocks]);

      await context.prisma.$disconnect();
   });
});
