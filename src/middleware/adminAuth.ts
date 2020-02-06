import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { IReq } from './auth';

export default function(req: IReq, res: Response, next: NextFunction) {
  // get token from header
  const token = req.header('x-auth-token');

  // check if not token
  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });

    return;
  }
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      res.status(404).json({ message: 'Secret not found' });

      return;
    }
    const decoded: any = jwt.verify(token, secret);
    req.user = decoded.user;

    if (!req.user!.isAdmin) {
      res.status(401).json({ message: 'You do not have necessary privileges' });

      return;
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: 'Token is not valid' });

    return;
  }
}
