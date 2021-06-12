import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response: Response) => {
   return response.json({
      message: 'Hello World!',
   });
});

export default app;
