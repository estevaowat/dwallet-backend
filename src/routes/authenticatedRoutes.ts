import { Router } from 'express';
import { container } from 'tsyringe';

import TransactionController from '@controllers/TransactionController';
import UserController from '@controllers/UserController';

const router = Router();

const userController = container.resolve(UserController);
const transactionController = container.resolve(TransactionController);

router.get('/user', userController.findByEmail);
router.post('/transaction', transactionController.createTransaction);

export default router;
