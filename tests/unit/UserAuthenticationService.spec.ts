import { mock } from 'jest-mock-extended';

import IUserRepository from '@repositories/UserRepository/IUserRepository';
import UserAuthenticationService from '@services/UserAuthenticationService';
import authenticationUtils from '@utils/authentication.utils';

jest.mock('@utils/authentication.utils');

describe('#User Authentication', () => {
   it('should return true when user exists in database', async () => {
      const mockUserRepository = mock<IUserRepository>();

      const mockedAuhenticationUtils = authenticationUtils as jest.Mocked<
         typeof authenticationUtils
      >;

      mockedAuhenticationUtils.getPayloadFromJwt.mockImplementation(() =>
         Promise.resolve({ userId: 123 }),
      );

      mockUserRepository.findById.mockReturnValue(
         Promise.resolve({
            id: 123,
            name: 'John Doe',
            email: 'jogndoe@hacker.com',
         }),
      );

      const userAuthenticationService = new UserAuthenticationService(
         mockUserRepository,
      );

      const validJwt = 'VALID_JWT';
      const isAuthenticated = await userAuthenticationService.isAuthenticated(
         validJwt,
      );

      expect(isAuthenticated).toBeTruthy();
   });

   it('should return false when user not exists in database', async () => {
      const mockUserRepository = mock<IUserRepository>();
      const mockedAuhenticationUtils = authenticationUtils as jest.Mocked<
         typeof authenticationUtils
      >;

      mockedAuhenticationUtils.getPayloadFromJwt.mockImplementation(() => {
         return Promise.resolve({ userId: 123 });
      });

      mockUserRepository.findById.mockReturnValue(Promise.resolve(null));

      const userAuthenticationService = new UserAuthenticationService(
         mockUserRepository,
      );

      const validJwt = 'VALID_JWT';
      const isAuthenticated = await userAuthenticationService.isAuthenticated(
         validJwt,
      );

      expect(isAuthenticated).toBeFalsy();
   });

   it('should return false when JWT is invalid', async () => {
      const mockUserRepository = mock<IUserRepository>();
      mockUserRepository.findById.mockReturnValue(Promise.resolve(null));
      const userAuthenticationService = new UserAuthenticationService(
         mockUserRepository,
      );

      const invalidJWT = 'INVALID_JWT';
      const isAuthenticated = await userAuthenticationService.isAuthenticated(
         invalidJWT,
      );
      expect(isAuthenticated).toBeFalsy();
   });
});
