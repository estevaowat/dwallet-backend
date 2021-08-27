import fs from 'fs';
import { mock } from 'jest-mock-extended';
import path from 'path';

import ITransactionRepository from '@repositories/TransactionRepository/ITransactionRepository';
import TransactionService from '@services/TransactionService';

describe('#Create transaction', () => {
   it('should create transactions in database using a file', async () => {
      const mockTransactionRepository = mock<ITransactionRepository>();

      mockTransactionRepository.create.mockReturnValue(
         Promise.resolve({
            id: 123,
            description: 'teste',
            userId: 123,
            transactionDate: new Date(),
         }),
      );

      const TransacationAuthenticationService = new TransactionService(
         mockTransactionRepository,
      );

      const transactionsBuffer: Buffer[] = [];
      const transactionFilePath = path.join(
         __dirname,
         '..',
         'unit',
         'files',
         'transactions.csv',
      );

      for (let i = 0; i <= 5; i += 1) {
         const buffer = fs.readFileSync(transactionFilePath);
         transactionsBuffer.push(buffer);
      }

      await TransacationAuthenticationService.createTransactionsByCsv({
         userId: 123,
         transactionsBuffer,
      });
      expect(mockTransactionRepository.create).toHaveBeenCalledTimes(96);
   });
});
