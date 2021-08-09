import { container } from 'tsyringe';

import PrismaTransactionRepository from '@repositories/TransactionRepository/implementations/PrismaTransactionRepository';
import ITransactionRepository from '@repositories/TransactionRepository/ITransactionRepository';
import PrismaUserRepository from '@repositories/UserRepository/implementations/PrismaUserRepository';
import IUserRepository from '@repositories/UserRepository/IUserRepository';

export default () => {
   container.registerSingleton<IUserRepository>(
      'UserRepository',
      PrismaUserRepository,
   );

   container.registerSingleton<ITransactionRepository>(
      'TransactionRepository',
      PrismaTransactionRepository,
   );
};
