import { Router } from 'express';
import {
  addTransaction,
  viewATransaction,
  viewTransactions,
  viewTransactionsByUser,
} from '../controllers/transactions';
import { ITransaction } from '../../types';
import {
  getAccount,
  debitAccount,
  creditAccount,
  checkAccount,
} from '../controllers/accounts';
import { getAUser } from '../controllers/user';
import bcrypt from 'bcryptjs';

const router = Router();

// view all transactions
router.get('/', async (_req, res) => {
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

// add transaction
// router.post('/:userId', async (req, res) => {
//   const user = req.params.userId;
//   if (!user) {
//     res.status(400).json({ msg: 'Unable to add' });

//     return;
//   }
//   try {
//     const {
//       benefactor,
//       transactionType,
//       transactionAmount,
//       description,
//     } = req.body;
//     const body: ITransaction = {
//       user,
//       benefactor,
//       transactionType,
//       transactionAmount,
//       description,
//     };
//     const doc = await addTransaction(body);

//     if (!doc) {
//       res.status(400).json({ msg: 'Could not add transaction' });

//       return;
//     }

//     res.status(201).json({ doc });

//     return;
//   } catch (err) {
//     res.status(500).json({ err: err.message });

//     return;
//   }
// });

// view transactions by a user
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).json({ msg: 'Invalid url' });

    return;
  }

  try {
    const doc = await viewTransactionsByUser(userId);

    if (!doc) {
      res.status(400).json({ msg: 'No transactions yet' });

      return;
    }

    res.status(200).json({ doc });

    return;
  } catch (err) {
    res.status(500).json({ err: err.message });

    return;
  }
});

// view a transaction
router.get('/:transactionId', async (req, res) => {
  const transactionId = req.params.transactionId;
  if (!transactionId) {
    res.status(400).json({ msg: 'Incomplete Url' });

    return;
  }

  try {
    const doc = await viewATransaction(transactionId);

    if (!doc) {
      res.status(404).json({ err: 'Transaction not found' });

      return;
    }

    res.status(200).json({ doc });

    return;
  } catch (err) {
    res.status(500).json({ err: err.message });

    return;
  }
});

// credit your account
router.patch('/:userId/credit', async (req, res) => {
  const amount = req.body.amount;
  const userId = req.params.userId;

  try {
    const accountToCredit = await getAccount(userId);

    if (!accountToCredit) {
      res.status(404).json({ err: 'Account not found' });

      return;
    }

    const accountNumber = accountToCredit.accountNumber;

    const credittedAccount = await creditAccount(accountNumber, amount);

    if (!credittedAccount) {
      res.status(400).json({ err: 'Unable to credit' });

      return;
    }

    const newTransaction = await addTransaction({
      user: userId,
      benefactor: userId,
      transactionType: 'CREDIT',
      transactionAmount: Number(amount),
    });

    res.status(200).json({ credittedAccount, newTransaction });

    return;
  } catch (err) {
    console.log('failed');
    res.status(500).json({ err: err.message });

    return;
  }
});

// transfer funds from one account to another
router.patch('/:userId/transfer', async (req, res) => {
  const { amount, description, accountNumber, pin } = req.body;
  const userId = req.params.userId;

  try {
    const [accountToDebit, accountExists, userInfo] = await Promise.all([
      getAccount(userId),
      checkAccount(accountNumber),
      getAUser(userId),
    ]);

    const authorized = await bcrypt.compare(pin, userInfo!.pin);

    if (!authorized) {
      res.status(400).json({ msg: 'Incorrect Pin' });
    }

    if (!accountToDebit) {
      res.status(400).json({ msg: 'Invalid Account' });

      return;
    }

    if (!accountExists) {
      res.status(401).json({ msg: 'Invalid account number' });

      return;
    }

    const debittedAccount = await debitAccount(
      accountToDebit.accountNumber,
      amount,
    );

    if (!debittedAccount) {
      res.status(400).json({ msg: 'Unable to debit' });

      return;
    }

    const credittedAccount = await creditAccount(accountNumber, amount);

    if (!credittedAccount) {
      res.status(400).json({ msg: 'Unable to credit' });

      return;
    }

    const [creditTransaction, debitTransaction] = await Promise.all([
      addTransaction({
        user: credittedAccount.user,
        benefactor: userId,
        transactionType: 'CREDIT',
        transactionAmount: Number(amount),
        description,
      }),
      addTransaction({
        user: userId,
        benefactor: credittedAccount.user,
        transactionType: 'DEBIT',
        transactionAmount: Number(amount),
        description,
      }),
    ]);

    res.status(200).json({
      debittedAccount,
      credittedAccount,
      debitTransaction,
      creditTransaction,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });

    return;
  }
});

export default router;
