import {
  createAccount,
  viewAnAccount,
  viewAllAccountsByUser,
  creditAccount,
  debitAccount,
  checkAccount,
} from './../controllers/accounts';
import { addTransaction } from '../controllers/transactions';
import { Router } from 'express';
import joi from '@hapi/joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  getAllUsers,
  getAUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user';
import { ITransaction } from '../../types';

const router = Router();

// get all users
router.get('/', (_req, res) => {
  getAllUsers()
    .then(data => {
      res.status(200).json({ data });
      return;
    })
    .catch(err => {
      console.log(err);

      res
        .status(500)
        .json({ message: 'An error occured. Please try again later' });
      return;
    });
});

// get a user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  getAUser(userId)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json({ data });
      return;
    })
    .catch(err => {
      console.log(err);

      res
        .status(500)
        .json({ message: 'An error occurred. Please try again later' });
      return;
    });
});

// register user
router.post('/', async (req, res) => {
  const schema = joi.object({
    firstName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    lastName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    phone: joi
      .string()
      .pattern(/^(\+234[789][01]\d{8})$|^(0[789][01]\d{8})$/)
      .min(11)
      .max(14)
      .trim()
      .lowercase()
      .required(),
    bvn: joi
      .string()
      .min(10)
      .max(10)
      .trim()
      .lowercase()
      .required(),
    email: joi
      .string()
      .email()
      .lowercase()
      .allow('')
      .required(),
    password: joi
      .string()
      .min(6)
      .max(50)
      .lowercase()
      .required(),
  });
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ message: 'Please provide valid parameters', error });
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    value.password = await bcrypt.hash(value.password, salt);

    const doc = await createUser(value);
    const userId = doc._id;
    const userAccount = await createAccount(userId);

    const payload = {
      user: {
        id: userId,
      },
    };
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.log('no secret');
      return;
    }

    jwt.sign(
      payload,
      secret,
      {
        expiresIn: '36000',
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.status(201).json({ token, doc, userAccount });
      },
    );

    return;
  } catch (err) {
    res.status(400).json({ message: err.message });
    return;
  }
});

// update user
router.patch('/:userId', async (req, res) => {
  const schema = joi.object({
    firstName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    lastName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    phone: joi
      .string()
      .pattern(/^(\+234[789][01]\d{8})$|^(0[789][01]\d{8})$/)
      .min(11)
      .max(14)
      .trim()
      .lowercase()
      .required(),
    email: joi
      .string()
      .email()
      .lowercase()
      .allow('')
      .required(),
  });

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ message: 'Please provide valid parameters', error });

    return;
  }

  const doc = await updateUser(req.params.userId, value);

  if (!doc) {
    res.status(404).json({ message: 'User to edit not found' });

    return;
  }

  res.status(200).json({ data: doc.toJSON() });
});

// delete user
router.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;

  const doc = await deleteUser(userId);

  if (!doc) {
    res.status(404).json({ message: 'User to delete not found' });

    return;
  }

  res.status(200).json({ data: doc.id });

  return;
});

// view a user's account
router.get('/:userId/accounts/:accountId', async (req, res) => {
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

    return;
  }
});

// view all accounts by user
router.get('/:userId/accounts', async (req, res) => {
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

// credit your account
router.patch('/:userId/accounts/:accountNumber', async (req, res) => {
  const userId = req.params.userId;
  const accountNumber = req.params.accountNumber;
  const amount = req.body.amount;
  const description = req.body.description;

  // TODO Card verification

  try {
    const doc = await creditAccount(accountNumber, amount, userId);

    if (!doc) {
      res.status(404).json({ msg: 'Account not found' });

      return;
    }
    const body: ITransaction = {
      user: userId,
      benefactor: userId,
      transactionType: 'CREDIT',
      description,
      transactionAmount: Number(amount),
    };
    const transaction = await addTransaction(body);

    res.status(201).json({ doc, transaction });

    return;
  } catch (error) {
    res.status(500).json({ msg: error.message });

    return;
  }
});

// transfer funds
router.patch(
  '/:userId/accounts/:accountNumber/transfer/:receiver',
  async (req, res) => {
    const { userId, accountNumber, receiver } = req.params;
    const { amount, description } = req.body;
    // verify accounts
    const [account1, account2] = await Promise.all([
      checkAccount(accountNumber),
      checkAccount(receiver),
    ]);

    if (!account1 || !account2) {
      res.status(401).json({ err: 'Invalid accounts' });

      return;
    }
    // debit user
    try {
      const debitted = await debitAccount(accountNumber, amount, userId);
      if (!debitted) {
        res.status(400).json({ msg: 'Something went wrong' });

        return;
      }

      const creditted = await creditAccount(receiver, amount);
      if (!creditted) {
        res.status(400).json({ msg: 'Something went wrong' });

        return;
      }

      const debitBody: ITransaction = {
        user: userId,
        benefactor: receiver,
        transactionType: 'DEBIT',
        transactionAmount: Number(amount),
        description,
      };
      const creditBody: ITransaction = {
        user: receiver,
        benefactor: userId,
        transactionType: 'CREDIT',
        transactionAmount: Number(amount),
        description,
      };
      const [transaction1, transaction2] = await Promise.all([
        addTransaction(creditBody),
        addTransaction(debitBody),
      ]);

      res.status(201).json({ creditted, debitted, transaction1, transaction2 });
    } catch (err) {}
  },
);

export default router;
