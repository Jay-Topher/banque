import { Router } from 'express';
import joi from '@hapi/joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Response } from 'express';

import Users from '../models/users';
import Accounts from '../models/accounts';
import Transactions from '../models/transactions';
import auth from '../middleware/auth';

const router = Router();

// interface IReq extends Request {
//   user: {
//     id: string
//   }
// }

/**
 * @route GET api/auth
 * @description GET logged in user
 * @access Private
 */

router.get('/', auth, async (req: any, res: Response) => {
  try {
    const [user, userAccount, userTransactions] = await Promise.all([
      await Users.findById({
        _id: req.user.id,
        deletedAt: null,
      }).select('-password -pin -_id -__v -isAdmin'),
      await Accounts.findOne({
        user: req.user.id,
        deletedAt: null,
      }).select('-user -_id -__v -deletedAt'),
      await Transactions.find({
        user: req.user.id,
        deletedAt: null,
      }).select('-_id -__v -user'),
    ]);
    res.status(200).json({ user, userAccount, userTransactions });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route POST api/auth
 * @description Authenticate user and get token
 * @access Public
 */

router.post('/', async (req, res) => {
  const schema = joi.object({
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
    let user = await Users.findOne({ email: value.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials ' });
    }
    const isMatch = await bcrypt.compare(value.password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials ' });

      return;
    }
    const payload = {
      user: {
        id: user._id,
        isAdmin: user.isAdmin,
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
        expiresIn: '1h',
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ token });
        return;
      },
    );

    return;
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
    return;
  }
});

export default router;
