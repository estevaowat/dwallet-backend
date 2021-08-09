import { Request, Response } from 'express';
import { container } from 'tsyringe';

import TransactionService from '@services/TransactionService';

class TransactionController {
   async createTransaction(req: Request, res: Response) {
      const transactionService = container.resolve(TransactionService);
      const Transaction = await transactionService.createTransaction(req.body);
      return res.json(Transaction);
   }
}

export default TransactionController;
