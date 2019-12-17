import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  res.json({ generation: req.app.locals.engine.generation });
});

export default router;
