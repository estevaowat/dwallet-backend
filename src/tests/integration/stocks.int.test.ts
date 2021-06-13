import { createContext } from '@database/context';
import { findByCode } from '@services/stockService';

const context = createContext();

describe('Stocks - Integration Tests', () => {
   beforeAll(async () => {
      await context.prisma.stock.create({
         data: {
            name: 'Netflix',
            code: 'NTF34',
            currentPrice: 12.33,
         },
      });
   });

   it('should find a stock by code', async () => {
      const stock = await findByCode('NTF34');
      expect(stock).toHaveProperty('name', 'Netflix');
      expect(stock).toHaveProperty('code', 'NTF34');
   });

   afterAll(async () => {
      await context.prisma.stock.deleteMany();
      await context.prisma.$disconnect();
   });
});
