import { Router } from 'express';
import { viewAllAccounts, viewAnAccount } from '../controllers/accounts';

const router = Router();

// view all accounts
// for admin alone
router.get('/', async (_req, res) => {
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

router.get('/:accountId', async (req, res) => {
  const userAccountId = req.params.accountId;

  if (!userAccountId) {
    res.status(400).json({ msg: 'Invalid url/Account does not exist' });

    return;
  }
  try {
    const doc = await viewAnAccount(userAccountId);

    if (!doc) {
      res.status(400).json({ msg: 'Account not found' });

      return;
    }
    res.status(200).json({ doc });
  } catch (err) {
    res.status(500).json({ err: err.message });

    return;
  }
});

export default router;
