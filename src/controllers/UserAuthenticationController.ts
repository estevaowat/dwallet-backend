import { NextFunction, Request, Response } from 'express';
import { autoInjectable, container } from 'tsyringe';

import UserAuthenticationService from '@services/UserAuthenticationService';
import AppError from '@shared/AppError';

@autoInjectable()
class UserAuthenticationController {
   async isUserAuthenticated(req: Request, _: Response, next: NextFunction) {
      const { authorization } = req.headers;

      if (authorization == null) {
         throw new AppError(403, 'Missing JWT Token in request header', true);
      }

      const [, jwt] = authorization.split(' ');

      const userAuthenticationService = container.resolve(
         UserAuthenticationService,
      );

      const isAuthenticated = await userAuthenticationService.isAuthenticated(
         jwt,
      );

      if (!isAuthenticated) {
         throw new AppError(403, 'Permission Denied', true);
      }
      next();
   }

   async authenticateUser(req: Request, res: Response) {
      const userAuthenticationService = container.resolve(
         UserAuthenticationService,
      );

      const { email, password } = req.body;
      const jwt = await userAuthenticationService.generateAuthenticationToken({
         email,
         password,
      });

      res.cookie('token', jwt, {
         // token expires in 7 days
         expires: new Date(Date.now() + 7),
         secure: false, // not using https
         httpOnly: true,
      });
      return res.send(jwt);
   }
}

export default UserAuthenticationController;
