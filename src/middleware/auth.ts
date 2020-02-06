import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export interface IReq extends Request {
  user?: {
    id: string;
    isAdmin: boolean;
  };
}
// interface IDecode {
//   user: {
//     id: string
//   }
// }

export default function(req: IReq, res: Response, next: NextFunction) {
  //Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });

    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log('no secret');
      return;
    }
    const decoded: any = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Token is not valid' });

    return;
  }
}
