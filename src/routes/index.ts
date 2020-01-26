import { Router } from 'express';
// import sampleController from '../controllers/sample';

const router = Router();

router.get('/', function(_req, res, _next) {
  // const message = sampleController();
  const message = 'Hello World';

  res.status(200).json({ message });
});

export default router;
