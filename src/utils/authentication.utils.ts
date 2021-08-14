import bcrypt from 'bcrypt';
import { createSecretKey } from 'crypto';
// eslint-disable-next-line import/no-unresolved
import { SignJWT } from 'jose/jwt/sign';
// eslint-disable-next-line import/no-unresolved
import { jwtVerify } from 'jose/jwt/verify';

import config from '../config/defaults';

const generateRandomSalt = async () => {
   return bcrypt.genSalt(Number(config.roundSalt));
};

const generatePasswordHash = (password: string, salt: string) => {
   return bcrypt.hash(password, salt);
};

const isPasswordValid = (password: string, hash: string) => {
   return bcrypt.compare(password, hash);
};

const getJWTSecretKey = () => {
   return createSecretKey(Buffer.from(config.jwtSecretToken, 'hex'));
};

const getPayloadFromJwt = async (jwt: string) => {
   try {
      const secretKey = getJWTSecretKey();
      const { payload } = await jwtVerify(jwt, secretKey, {
         algorithms: ['HS256'],
         audience: '*',
      });
      return payload;
   } catch {
      return null;
   }
};

const generateJwtToken = async ({ payload, expirationTime = '2h' }: any) => {
   const secretKey = getJWTSecretKey();

   const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setAudience('*')
      .setExpirationTime(expirationTime)
      .sign(secretKey);

   return jwt;
};

export default {
   getPayloadFromJwt,
   generateJwtToken,
   generateRandomSalt,
   generatePasswordHash,
   isPasswordValid,
};
