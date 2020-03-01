import { Router } from 'express';
import { sendRegistrationSuccessful } from '../controllers/mail';

const router = Router();

router.post('/', (_req, res) => {
  try {
    sendRegistrationSuccessful(
      'jay.topher11@gmail.com',
      'Jones Ogolo',
      '2213122343',
    );
    res.status(200).json({ msg: 'Mail sent successfully' });

    return;
  } catch (err) {
    res.status(500).json({ err: err.message });

    return;
  }
});

export default router;
