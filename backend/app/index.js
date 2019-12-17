import express from 'express';
import GenerationEngine from './generation/engine';
import dragonRouter from './api/dragon';
import generationRouter from './api/generation';

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);

engine.start();

export default app;
