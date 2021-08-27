import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import TransactionController from '@controllers/TransactionController';
import UserController from '@controllers/UserController';

const router = Router();
const upload = multer();

const userController = container.resolve(UserController);
const transactionController = container.resolve(TransactionController);

router.get('/user', userController.findByEmail);
router.post('/transaction', transactionController.createTransaction);
router.post(
   '/transaction/csv',
   upload.array('files', 10),
   transactionController.createTransactionsByFiles,
);

export default router;
