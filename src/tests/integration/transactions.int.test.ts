import path from 'path';

import { createContext } from '@database/context';
import importCsv from '@services/csvService';

const context = createContext();

describe('Transactions stocks - Integration Tests', () => {
   beforeAll(async () => {
      await context.prisma.stock.create({
         data: {
            name: 'Wisz corretora',
            code: 'WIZS3',
            currentPrice: 12.33,
         },
      });
   });

   it('should import transactions stocks csv', async () => {
      const numberOfLinesExpected = 9;
      const filePath = path.join(
         __dirname,
         '..',
         '..',
         'tests',
         'files',
         'stock_transactions.csv',
      );

      const result = await importCsv(filePath);
      expect(result.count).toBe(numberOfLinesExpected);
   });

   afterAll(async () => {
      await context.prisma.stockTransaction.deleteMany();
      await context.prisma.stock.deleteMany();
      await context.prisma.$disconnect();
   });
});
