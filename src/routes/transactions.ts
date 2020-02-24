import { Router } from 'express';
import { viewTransactions } from '../controllers/transactions';
import adminAuth from '../middleware/adminAuth';

const router = Router();

// view all transactions
router.get('/', adminAuth, async (_req, res) => {
  try {
    const doc = await viewTransactions();

    if (!doc) {
      res.status(404).json({ msg: 'No Transactions yet' });

      return;
    }

    res.status(200).json({ doc });

    return;
  } catch (err) {
    res.status(500).json({ err: err.message });

    return;
  }
});

export default router;
