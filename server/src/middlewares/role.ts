import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import { IRole } from '../models/role';

const role = (roles: IRole['value'][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      return next();
    }

    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(403).json({ message: 'No token provided' });
      }

      if (!process.env.SECRET_KEY) {
        res.status(500).send({ message: 'Server error' });
        return console.error('Добавь SECRET_KEY в .env');
      }

      const { roles: userRoles } = jwt.verify(token, process.env.SECRET_KEY) as { token: string, roles: IRole['value'][] };

      const hasRole = userRoles.some(role => roles.includes(role));
      if (!hasRole) {
        return res.status(403).json({ message: 'Bad role' });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: 'Bad role' });
    }
  }
};

export default role;
