import { Router } from 'express';
export const pingRouter = Router();


pingRouter.get('/ping', (_req, res) => {
  res.type('text').send('PONG');
});

