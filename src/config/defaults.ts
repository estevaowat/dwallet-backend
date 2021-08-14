export default {
   jwtSecretToken: process.env.JWT_SECRET_TOKEN ?? '',
   roundSalt: process.env.ROUND_SALT ?? 10,
};
