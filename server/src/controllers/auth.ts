import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import UserModel from '../models/user.js';

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
}

export default new AuthController();
