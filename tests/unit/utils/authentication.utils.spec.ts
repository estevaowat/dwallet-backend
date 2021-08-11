import {
   getPayloadFromJwt,
   generateJwtToken,
} from '@utils/authentication.utils';

describe('#Authentication Utils', () => {
   it('should generate JWT Token containing a payload with userId', async () => {
      const jwt = await generateJwtToken({
         payload: { userId: 123 },
         issuer: '123',
      });

      const payload = await getPayloadFromJwt(jwt);

      expect(payload).toEqual(
         expect.objectContaining({
            userId: 123,
            aud: '*',
         }),
      );
   });

   it('should throw error when JWT Token is invalid', async () => {
      const wrongJWT = 'WRONG_JWT';
      await expect(getPayloadFromJwt(wrongJWT)).rejects.toThrowError();
   });
});
