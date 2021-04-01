import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import UserModel, { IUser } from '../models/user.js';
import RoleModel from '../models/role.js';

export interface IUserData {
  id: IUser['_id'],
  email: IUser['email'],
  avatar: IUser['avatar'],
  name: IUser['name'],
  accounts: IUser['accounts'],
  roles: IUser['roles'],
}

export const getUserData = (user: IUser): IUserData => ({
  id: user._id,
  email: user.email,
  avatar: user.avatar,
  name: user.name,
  accounts: user.accounts,
  roles: user.roles,
});

const getTokenAndUserData = (user: IUser) => {
  if (!process.env.SECRET_KEY) {
    console.error('Добавь SECRET_KEY в .env');
    throw new Error();
  }

  const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.SECRET_KEY, { expiresIn: '1h' });
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
      const userRole = await RoleModel.findOne({ value: 'USER' });
      if (!userRole) {
        console.error('Role not found');
        return res.status(500).send({ message: 'Server error' });
      }

      const user = new UserModel({ email, password: hashPassword, roles: [userRole.value] });
      await user.save();

      return res.status(201).json({ message: 'User was created' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Server error' });
    }
  }

  async login (req: Request, res: Response)  {
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

  async authorizeUser (req: Request, res: Response) {
    try {
      const user = await UserModel.findOne({ _id: req.user.id });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json(getTokenAndUserData(user));
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Server error' });
    }
  }
}

export default new AuthController();
