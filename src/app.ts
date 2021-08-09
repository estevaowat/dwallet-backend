import 'reflect-metadata';
import express from 'express';

import setupPrismaClient from '@setup/setupPrismaClient';
import setupRepositoriesInjection from '@setup/setupRepositoriesInjection';

import routes from './routes';

setupPrismaClient();
setupRepositoriesInjection();

const app = express();
app.use(express.json());
app.use(routes);

export default app;
