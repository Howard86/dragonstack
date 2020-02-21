import express, { json } from 'express';
import cors from 'cors';
import cookieParse from 'cookie-parser';

import GenerationEngine from './generation/engine';

import dragonRouter from './api/dragon';
import generationRouter from './api/generation';
import accountRouter from './api/account';

const app = express();
const engine = new GenerationEngine();

engine.start();

app.locals.engine = engine;

app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  }),
);
app.use(json());
app.use(cookieParse());

app.use('/account', accountRouter);
app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  const statusCode = err.statusCode || 500;

  console.error('logging error', err);

  res.status(statusCode).json({
    type: 'error',
    message: err.message,
  });
});

export default app;
