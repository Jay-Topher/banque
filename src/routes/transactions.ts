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

// add transaction
router.post('/:userId', async (req, res) => {
  const user = req.params.userId;
  if (!user) {
    res.status(400).json({ msg: 'Unable to add' });

    return;
  }
  try {
    const {
      benefactor,
      transactionType,
      transactionAmount,
      description,
    } = req.body;
    const body: ITransaction = {
      user,
      benefactor,
      transactionType,
      transactionAmount,
      description,
    };
    const doc = await addTransaction(body);

    if (!doc) {
      res.status(400).json({ msg: 'Could not add transaction' });

      return;
    }

    res.status(201).json({ doc });

    return;
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

