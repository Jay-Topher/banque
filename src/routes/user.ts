import {
  createAccount,
  viewAnAccount,
  viewAllAccountsByUser,
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
} from '../controllers/user';
import auth from '../middleware/auth';
import adminAuth from '../middleware/adminAuth';

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

    const doc = await createUser(value);
    const userId = doc.id;
    const isAdmin = doc.isAdmin;
    const userAccount = await createAccount(userId);

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
router.patch('/:userId', auth, async (req, res) => {
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
router.delete('/:userId', adminAuth, async (req, res) => {
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

export default router;
