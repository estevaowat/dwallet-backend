import { createSecretKey } from 'crypto';
// eslint-disable-next-line import/no-unresolved
import { SignJWT } from 'jose/jwt/sign';
// eslint-disable-next-line import/no-unresolved
import { jwtVerify } from 'jose/jwt/verify';

import config from '../config/defaults';

export const getJWTSecretKey = () => {
   return createSecretKey(Buffer.from(config.jwtSecretToken, 'hex'));
};

export const getPayloadFromJwt = async (jwt: string) => {
   const secretKey = getJWTSecretKey();
   const { payload } = await jwtVerify(jwt, secretKey, {
      algorithms: ['HS256'],
      audience: '*',
   });
   return payload;
};

export const generateJwtToken = async ({
   payload,
   expirationTime = '2h',
}: any) => {
   const secretKey = getJWTSecretKey();

   const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setAudience('*')
      .setExpirationTime(expirationTime)
      .sign(secretKey);

   return jwt;
};
