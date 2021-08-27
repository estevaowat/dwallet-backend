import { Express, Request, Response } from 'express';
import { autoInjectable, container } from 'tsyringe';

import TransactionService from '@services/TransactionService';
import AppError from '@shared/AppError';

@autoInjectable()
class TransactionController {
   async createTransaction(req: Request, res: Response) {
      const transactionService = container.resolve(TransactionService);
      const transactionsSaved = await transactionService.createTransaction(
         req.body,
      );
      return res.json(transactionsSaved);
   }

   async createTransactionsByFiles(req: Request, res: Response) {
      const { files } = req;
      const { userId } = req.headers;
      const transactionService = container.resolve(TransactionService);
      if (files == null) {
         throw new AppError(400, `Request doesn't contains a file`, true);
      }

      if (!userId) {
         throw new AppError(400, `Request doesn't have jwt token`, true);
      }

      const transactionsBuffer = Object.values(files).map(
         (file: Express.Multer.File) => file.buffer,
      );
      const transactionsSaved =
         await transactionService.createTransactionsByCsv({
            userId: Number(userId),
            transactionsBuffer,
         });
      return res.json({ count: transactionsSaved });
   }
}

export default TransactionController;
