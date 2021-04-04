import { nanoid } from 'nanoid';
import { Response, Request } from 'express';

import AccountModel from '../models/account.js';
import ProgressModel from '../models/progress.js';
import UserModel from '../models/user.js';
import MissionModel from '../models/mission.js';

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

      const progress = new ProgressModel({ account: account.login });
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

  // todo: refactor
  async getMissionsProgress (req: Request, res: Response) {
    try {
      const { login } = req.params;
      const accountProgress = await ProgressModel.findOne({ account: login });
      if (!accountProgress) {
        return res.status(404).json({ message: `Account ${login} not found` });
      }

      const missions = await MissionModel.find();

      const progress = Array.from({ length: 16 }, (_, i) => ({
        id: nanoid(6),
        completed: false,
        maxStars: i === 0 ? 10 : 6,
        missions: [] as any,
        stars: 0,
        week: i + 1,
      }));

      missions.forEach(mission => {
        const missionWeek = progress.find(missionsWeek => missionsWeek.week === mission.week);
        if (!missionWeek) {
          throw new Error(`Неделя ${mission.week} не найдена`);
        }

        const isCompleted = accountProgress.completedMissions.includes(mission._id);
        if (isCompleted) {
          missionWeek.stars += mission.stars;
        }

        if (missionWeek.stars >= missionWeek.maxStars) {
          missionWeek.stars = missionWeek.maxStars;
          missionWeek.completed = true;
        }

        const missionData = {
          completed: isCompleted,
          description: mission.description,
          id: mission._id,
          stars: mission.stars,
          title: mission.title,
          type: mission.type,
          week: mission.week,
        };

        missionWeek.missions.push(missionData);
      });

      const stars = progress.reduce((stars, missionWeek) => stars + missionWeek.stars, 0);
      const wastedTime = accountProgress.wastedTime;

      return res.json({ missionsWeeks: progress, stars, wastedTime });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new AccountController();
