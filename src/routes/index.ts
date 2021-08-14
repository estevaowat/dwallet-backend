import { Router } from 'express';
import { container } from 'tsyringe';

import UserAuthenticationController from '@controllers/UserAuthenticationController';
import UserController from '@controllers/UserController';

import { transactionRouter } from './transaction.routes';
import { userAuthenticationRouter } from './userAuthentication.routes';

const router = Router();
const userController = container.resolve(UserController);
const userAuthenticationController = container.resolve(
   UserAuthenticationController,
);

router.use('/authentication', userAuthenticationRouter);
router.post('/user', userController.createUser);

router.use(userAuthenticationController.isUserAuthenticated);

router.get('/user', userController.findByEmail);
router.use('/transaction', transactionRouter);

export default router;
