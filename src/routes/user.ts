import {
  createAccount,
  viewAnAccount,
  viewAllAccountsByUser,
  deleteAccount,
  getAccount,
  creditAccount,
  checkAccount,
  debitAccount,
} from './../controllers/accounts';
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
  getAccountOwner,
} from '../controllers/user';
import auth, { IReq } from '../middleware/auth';
import adminAuth from '../middleware/adminAuth';
import {
  viewTransactionsByUser,
  viewATransaction,
  addTransaction,
} from '../controllers/transactions';
import {
  sendRegistrationSuccessful,
  sendEmailAlert,
} from '../controllers/helpers';

const router = Router();

// get all users
router.get('/', adminAuth, (_req, res) => {
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
router.get('/:userId', auth, (req, res) => {
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
    pin: joi
      .string()
      .min(4)
      .max(4)
      .pattern(/^\d{4}$/),
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
    [value.password, value.pin] = await Promise.all([
      bcrypt.hash(value.password, salt),
      bcrypt.hash(value.pin, salt),
    ]);

    const user = await createUser(value);
    const userId = user.id;
    const isAdmin = user.isAdmin;
    const userAccount = await createAccount(userId);

    const { firstName, lastName, phone, bvn, email } = user;
    const newUser = { firstName, lastName, phone, bvn, email };
    const newAccount = {
      accountNumber: userAccount.accountNumber,
      accountBalance: userAccount.accountBalance,
    };

    sendRegistrationSuccessful(
      email,
      `${firstName.toUpperCase()} ${lastName.toUpperCase()}`,
      newAccount.accountNumber,
    );

    const payload = {
      user: {
        id: userId,
        isAdmin,
      },
    };
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      res.status(500).json({ err: 'Secret not available' });
      return;
    }

    jwt.sign(
      payload,
      secret,
      {
        expiresIn: '1h',
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.status(201).json({ token, user: newUser, userAccount: newAccount });
      },
    );

    return;
  } catch (err) {
    res.status(400).json({ message: err.message });
    return;
  }
});

// update user
router.patch('/:userId', auth, async (req, res) => {
  const schema = joi.object({
    firstName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase(),
    lastName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase(),
    phone: joi
      .string()
      .pattern(/^(\+234[789][01]\d{8})$|^(0[789][01]\d{8})$/)
      .min(11)
      .max(14)
      .trim()
      .lowercase(),
    email: joi
      .string()
      .email()
      .lowercase()
      .allow(''),
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
  return;
});

// delete user
router.delete('/:userId', adminAuth, async (req, res) => {
  const userId = req.params.userId;

  const [deletedUser, deletedAccount] = await Promise.all([
    deleteUser(userId),
    deleteAccount(userId),
  ]);

  if (!deletedUser) {
    res.status(404).json({ message: 'User to delete not found' });

    return;
  }
  if (!deletedAccount) {
    res.status(404).json({ message: 'Account not found' });

    return;
  }

  res.status(200).json({ message: `user ${userId} deleted successfully` });

  return;
});

// view a user's account
router.get('/:userId/accounts/:accountId', auth, async (req, res) => {
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
router.get('/:userId/accounts', auth, async (req, res) => {
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

// view transactions by a user
router.get('/:userId/transactions', auth, async (req, res) => {
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
router.get('/:userId/transactions/:transactionId', auth, async (req, res) => {
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
router.patch(
  '/:userId/accounts/:accountNumber/credit',
  auth,
  async (req: IReq, res) => {
    const { amount, description } = req.body;
    const { userId, accountNumber } = req.params;

    if (userId !== req.user!.id) {
      res.status(401).json({ err: 'Unauthorized' });

      return;
    }

    try {
      const [accountToCredit, userToCredit] = await Promise.all([
        getAccount(accountNumber),
        getAUser(req.user!.id),
      ]);

      if (!accountToCredit) {
        res.status(404).json({ err: 'Account not found' });

        return;
      }

      const userAccountNumber = accountToCredit.accountNumber;

      const credittedAccount = await creditAccount(userAccountNumber, amount);

      if (!credittedAccount) {
        res.status(400).json({ err: 'Unable to credit' });

        return;
      }

      const newTransaction = await addTransaction({
        user: userId,
        benefactor: userId,
        transactionType: 'CREDIT',
        transactionAmount: Number(amount) * 100,
      });

      sendEmailAlert(
        userToCredit!.email,
        userToCredit!.firstName,
        userAccountNumber,
        Number(amount),
        'CREDIT',
        credittedAccount.accountBalance,
        description,
        new Date(),
      );

      res.status(200).json({ credittedAccount, newTransaction });

      return;
    } catch (err) {
      console.log('failed');
      res.status(500).json({ err: err.message });

      return;
    }
  },
);

// transfer funds from one account to another
router.patch(
  '/:userId/accounts/:accountNumber/transfer',
  auth,
  async (req, res) => {
    const { amount, description, accountNumber, pin } = req.body;
    const userId = req.params.userId;
    const userAccountNumber = req.params.accountNumber;

    try {
      const [accountToDebit, accountExists, userInfo] = await Promise.all([
        getAccount(userAccountNumber),
        checkAccount(accountNumber),
        getAUser(userId),
      ]);
      // const accountToDebit = await getAccount(userAccountNumber)

      // const accountExists = await checkAccount(accountNumber)

      // const userInfo = await getAUser(userId)

      const authorized = await bcrypt.compare(pin, userInfo!.pin);

      if (!authorized) {
        res.status(400).json({ msg: 'Incorrect Pin' });

        return;
      }

      if (!accountToDebit) {
        res.status(400).json({ msg: 'Invalid Account' });

        return;
      }

      if (!accountExists) {
        res.status(401).json({ msg: 'Invalid account number' });

        return;
      }

      if (!userInfo) {
        res.status(404).json({ err: 'User does not exist' });

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
          transactionAmount: Number(amount) * 100,
          description,
        }),
        addTransaction({
          user: userId,
          benefactor: credittedAccount.user,
          transactionType: 'DEBIT',
          transactionAmount: Number(amount) * 100,
          description,
        }),
      ]);

      // debit alert
      const email = userInfo!.email;
      const firstName = userInfo!.firstName;
      sendEmailAlert(
        email,
        firstName,
        debittedAccount.accountNumber,
        Number(amount),
        'DEBIT',
        debittedAccount.accountBalance,
        description,
        new Date(),
      );

      // credit alert
      const credittedUser = await getAccountOwner(
        credittedAccount.accountNumber,
      );
      if (!credittedUser) {
        res.status(404).json({ err: 'Could not send credit mail' });
        return;
      }
      const creditEmail = credittedUser.email;
      const creditFirstName = credittedUser.firstName;
      sendEmailAlert(
        creditEmail,
        creditFirstName,
        credittedAccount.accountNumber,
        Number(amount),
        'CREDIT',
        credittedAccount.accountBalance,
        description,
        new Date(),
      );

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
  },
);

export default router;
