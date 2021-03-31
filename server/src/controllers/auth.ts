import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import UserModel, { IUser } from '../models/user.js';

interface IUserData {
  id: IUser['_id'],
  email: IUser['email'],
  avatar: IUser['avatar'],
  name: IUser['name'],
  accounts: IUser['accounts'],
}

export const getUserData = (user: IUser): IUserData => ({
  id: user._id,
  email: user.email,
  avatar: user.avatar,
  name: user.name,
  accounts: user.accounts,
});

const getTokenAndUserData = (user: IUser) => {
  if (!process.env.SECRET_KEY) {
    console.error('Добавь SECRET_KEY в .env');
    throw new Error();
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  return {
    token,
    user: getUserData(user),
  };
};

class AuthController {
  async registerUser (req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Incorrect request', errors });
      }

      const { email, password } = req.body;
      const candidate = await UserModel.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: `User with email ${email} already exists` });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new UserModel({ email, password: hashPassword });
      await user.save();

      return res.status(201).json({ message: 'User was created' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Server error' });
    }
  }

  async login (req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      return res.json(getTokenAndUserData(user));
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Server error' });
    }
  }
}

export default new AuthController();
