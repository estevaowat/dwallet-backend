import express from 'express';
import { container } from 'tsyringe';

import UserController from '@controllers/UserController';

const userRouter = express.Router();

const userController = container.resolve(UserController);

userRouter.get('', userController.findByEmail);

export { userRouter };
