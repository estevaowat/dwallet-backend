import { Router } from 'express';
import { container } from 'tsyringe';

import ErrorController from '@controllers/ErrorController';
import UserAuthenticationController from '@controllers/UserAuthenticationController';

import authenticatedRoutes from './authenticatedRoutes';
import unauthenticatedRoutes from './unauthenticatedRoutes';

const router = Router();

const userAuthenticationController = container.resolve(
   UserAuthenticationController,
);

router.use(unauthenticatedRoutes);
router.use(userAuthenticationController.isUserAuthenticated);
router.use(authenticatedRoutes);
router.use(ErrorController.middlewareError);

export default router;
