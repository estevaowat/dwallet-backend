import { Request, Response } from 'express';
import { autoInjectable, container } from 'tsyringe';

import UserAuthenticationService from '@services/UserAuthenticationService';

@autoInjectable()
class UserAuthenticationController {
   async authenticateUser(req: Request, res: Response) {
      const userAuthenticationService = container.resolve(
         UserAuthenticationService,
      );

      const { email, password } = req.body;
      const jwt = await userAuthenticationService.generateAuthenticationToken({
         email,
         password,
      });
      return res.json({ jwt });
   }
}

export default UserAuthenticationController;
