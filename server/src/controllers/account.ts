import { Response, Request } from 'express';

import AccountModel from '../models/account.js';
import ProgressModel from '../models/progress.js';
import UserModel from '../models/user.js';

class AccountController {
  async createAccount (req: Request, res: Response) {
    try {
      const { login, link, avatar, prime } = req.body;

      const user = await UserModel.findOne({ _id: req.user.id });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const account = new AccountModel({ user: req.user.id, login, link, avatar, prime });
      await account.save();

      const progress = new ProgressModel({ account: account._id });
      await progress.save();

      account.progress = progress._id;
      await account.save();

      user.accounts.push(account._id);
      await user.save();

      return res.status(201).json(account);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Account creation error' });
    }
  }

  async getUserAccounts (req: Request, res: Response) {
    try {
      const accounts = await AccountModel.find({ user: req.user.id });

      return res.json(accounts);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new AccountController();
