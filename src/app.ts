import 'reflect-metadata';
import * as dotenv from 'dotenv';
import express from 'express';
import { join } from 'path';

import setupPrismaClient from '@setup/setupPrismaClient';
import setupRepositoriesInjection from '@setup/setupRepositoriesInjection';

import routes from './routes';

const stage = process.env.STAGE || 'development';

dotenv.config({
   path: join(__dirname, '..', `.env.${stage}`),
});

setupPrismaClient();
setupRepositoriesInjection();

const app = express();
app.use(express.json());
app.use(routes);

export default app;
