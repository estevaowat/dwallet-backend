import { Request, Response } from 'express';
import { autoInjectable, container } from 'tsyringe';

import TransactionService from '@services/TransactionService';

@autoInjectable()
class TransactionController {
   async createTransaction(req: Request, res: Response) {
      const transactionService = container.resolve(TransactionService);
      const transactionsSaved = await transactionService.createTransaction(
         req.body,
      );
      return res.json({ count: transactionsSaved });
   }
}

export default TransactionController;
