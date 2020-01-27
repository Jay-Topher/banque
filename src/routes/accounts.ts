import { Router } from 'express';
import {
  viewAllAccounts,
  viewAllAccountsByUser,
  viewAnAccount,
} from '../controllers/accounts';

const router = Router();

// view a user's account
router.get('/api/v1/users/:userId/accounts/:accountId', async (req, res) => {
  const userId = req.params.userId;
  const accountId = req.params.accountId;

  try {
    const doc = await viewAnAccount(accountId);

    if (!doc) {
      throw Error('Account not found');
    }

    if (doc.user !== userId) {
      res.status(403).json({ msg: 'Forbidden' });

      return;
    }

    res.status(200).json({ doc });

    return;
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// view all accounts by user
router.get('/api/v1/users/:userId/accounts', async (req, res) => {
  const userId = req.params.userId;

  try {
    const doc = await viewAllAccountsByUser(userId);

    if (!doc) {
      res.status(404).json({ msg: 'Accounts not found' });

      return;
    }

    res.status(200).json({ doc });

    return;
  } catch (err) {
    res.status(500).json({ err: err.message });
    return;
  }
});

// view all accounts
// for admin alone
router.get('/api/v1/users/accounts', async (_req, res) => {
  try {
    const doc = await viewAllAccounts();

    if (!doc) {
      res.status(404).json({ msg: 'No transactions yet' });

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
