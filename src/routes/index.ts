import { Router } from 'express';

import { transactionRouter } from './transaction.routes';
import { userRouter } from './user.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/transaction', transactionRouter);

export default router;
