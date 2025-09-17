import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import dotenv from 'dotenv';
import path from 'path';

import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());


app.get('/ping', (_req, res) => {
  res.status(200)
    .type('text/plain')      // force Content-Type: text/plain
    .send('pong');           // exactement "pong", sans JSON
});
app.use(errorHandler);

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`🏓 Ping endpoint available at http://localhost:${port}/ping`);
});
