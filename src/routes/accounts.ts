import { Router } from 'express';
import { viewAllAccounts } from '../controllers/accounts';
import adminAuth from '../middleware/adminAuth';

const router = Router();

// view all accounts
// for admin alone
router.get('/', adminAuth, async (_req, res) => {
  try {
    const doc = await viewAllAccounts();

    if (!doc) {
      res.status(404).json({ msg: 'No Accounts yet' });

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
