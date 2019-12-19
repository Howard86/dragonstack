import express from 'express';
import GenerationEngine from './generation/engine';
import dragonRouter from './api/dragon';
import generationRouter from './api/generation';

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: 'error',
    message: err.message,
  });
});

engine.start();

export default app;
