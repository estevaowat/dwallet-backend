import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
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
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(routes);

export default app;
