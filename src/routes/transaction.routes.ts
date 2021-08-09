import express from 'express';
import { container } from 'tsyringe';

import TransactionController from '@controllers/TransactionController';

const transactionRouter = express.Router();

const transactionController = container.resolve(TransactionController);

transactionRouter.post('', transactionController.createTransaction);

export { transactionRouter };
