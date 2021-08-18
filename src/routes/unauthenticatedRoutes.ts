import { Router } from 'express';
import { container } from 'tsyringe';

import UserAuthenticationController from '@controllers/UserAuthenticationController';
import UserController from '@controllers/UserController';

const router = Router();

const userController = container.resolve(UserController);
const userAuthenticationController = container.resolve(
   UserAuthenticationController,
);

router.use('/authentication', userAuthenticationController.authenticateUser);
router.post('/user', userController.createUser);

export default router;
