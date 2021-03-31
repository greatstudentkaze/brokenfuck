import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    if (!process.env.SECRET_KEY) {
      res.status(500).send({ message: 'Server error' });
      return console.error('Добавь SECRET_KEY в .env');
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Auth error' });
  }
};

export default auth;
