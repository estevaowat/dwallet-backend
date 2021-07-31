import path from 'path';

import { createTestContext } from '@database/context';
import stockTransactionService from '@services/stockTransactionService';

const getStocksTransactionsTestFile = () =>
   path.join(__dirname, '..', '..', 'files', 'stock_transactions.csv');

const testContext = createTestContext();

describe('Stock transactions service', () => {
   it('should import stocks transactions using a csv', () => {
      const filePath = getStocksTransactionsTestFile();

      stockTransactionService.importCsv(filePath, testContext);
   });
});
