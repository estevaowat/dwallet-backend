import 'reflect-metadata';

import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { join } from 'path';

import ErrorHandler from '@controllers/ErrorController';
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

app.use(ErrorHandler.middlewareError);

export default app;
