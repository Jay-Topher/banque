import { Router } from 'express';
import {
  addTransaction,
  viewATransaction,
  viewTransactions,
  viewTransactionsByUser,
} from '../controllers/transactions';
import { ITransaction } from '../../types';

const router = Router();

// view all transactions
router.get('/', async (_req, res) => {
  try {
    const doc = await viewTransactions();

    if (!doc) {
      res.status(404).json({ msg: 'No Transactions yet' });

      return;
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

