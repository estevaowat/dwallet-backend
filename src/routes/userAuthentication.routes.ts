import express from 'express';
import { container } from 'tsyringe';

import UserAuthenticationController from '@controllers/UserAuthenticationController';

const userAuthenticationRouter = express.Router();

const userAuthenticationController = container.resolve(
   UserAuthenticationController,
);

userAuthenticationRouter.post(
   '',
   userAuthenticationController.authenticateUser,
);

export { userAuthenticationRouter };
