import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserService from '@services/UserService';

class UserController {
   async createUser(req: Request, res: Response) {
      const userService = container.resolve(UserService);
      const user = await userService.createUser(req.body);
      return res.json(user);
   }

   async findByEmail(req: Request, res: Response) {
      const { email } = req.query;
      const userService = container.resolve(UserService);
      const user = await userService.findByEmail(email as string);
      return res.json(user);
   }
}

export default UserController;
