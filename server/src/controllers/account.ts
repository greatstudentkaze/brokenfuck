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

        const missionProgress = accountProgress.missions.find(missionData => missionData.id.toString() === mission.id);
        if (!missionProgress) {
          accountProgress.missions.push({
            id: mission.id,
            completed: false,
            points: 0,
            stars: 0,
          });
        }

        const isCompleted = missionProgress && missionProgress.completed;
        const userPoints = missionProgress ? missionProgress.points : 0;
        const stars = missionProgress ? missionProgress.stars : 0;
        if (isCompleted) {
          const stars = mission.points.length * mission.operationalPoints;
          missionWeek.stars += stars;
        } else if (userPoints > 0) {
          missionWeek.stars += stars;
        }

        if (missionWeek.stars >= missionWeek.maxStars) {
          missionWeek.stars = missionWeek.maxStars;
          missionWeek.completed = true;
        }

        const missionData = {
          completed: isCompleted,
          description: mission.description,
          id: mission._id,
          points: mission.points,
          userPoints,
          stars,
          maxPoints: Math.max(...mission.points),
          operationalPoints: mission.operationalPoints,
          title: mission.title,
          type: mission.type,
          week: mission.week,
        };

        missionWeek.missions.push(missionData);
      });

      await accountProgress.save();

      const stars = progress.reduce((stars, missionWeek) => stars + missionWeek.stars, 0);
      const wastedTime = accountProgress.wastedTime;

      return res.json({ missionsWeeks: progress, stars, wastedTime });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // todo: refactor
  async updateUserPoints (req: Request, res: Response) {
    try {
      const {login, id} = req.params;
      const {userPoints} = req.body;

      const progress = await ProgressModel.findOne({account: login});
      if (!progress) {
        return res.status(404).json({message: `Account ${login} not found`});
      }

      const missionProgress = progress.missions.find(missionData => missionData.id.toString() === id);
      if (!missionProgress) {
        return res.status(404).json({message: `Mission ${id} progress not found`});
      }

      const mission = await MissionModel.findById(id);
      if (!mission) {
        return res.status(404).json({message: `Mission ${id} not found in database`});
      }

      const maxPoints = Math.max(...mission.points);
      missionProgress.points = userPoints;
      missionProgress.completed = userPoints >= maxPoints;

      const missionData = {
        completed: missionProgress.completed,
        description: mission.description,
        id,
        points: mission.points,
        userPoints,
        maxPoints,
        stars: mission.points.reduce((stars, item) => userPoints >= item ? stars + mission.operationalPoints : stars, 0),
        operationalPoints: mission.operationalPoints,
        title: mission.title,
        type: mission.type,
        week: mission.week,
      };

      missionProgress.stars = missionData.stars;
      await progress.save();

      const weeksStars = Array.from({ length: 16 }, _ => 0) as number[];
      const missions = await MissionModel.find();
      missions.forEach(mission => {
        const index = mission.week - 1;
        const { stars } = progress.missions.find(missionData => missionData.id.toString() === mission.id)!;

        weeksStars[index] += stars;
        if (mission.week === 1 && weeksStars[index] >= 10) {
          weeksStars[index] = 10;
        } else if (mission.week !== 1 && weeksStars[index] >= 6) {
          weeksStars[index] = 6;
        }
      });

      const stars = weeksStars.reduce((stars, weekStars) => stars + weekStars, 0);

      res.json({ message: 'Mission points updated', mission: missionData, stars });
    } catch (err) {
      console.error(err);
      return res.status(500).json({message: 'Progress update error'});
    }
  }

  // todo: refactor
  async completeWeekMissions (req: Request, res: Response) {
    try {
      const { login, weekNumber } = req.params;

      const progress = await ProgressModel.findOne({ account: login });
      if (!progress) {
        return res.status(404).json({ message: `Account ${login} not found` });
      }

      const missions = await MissionModel.find({ week: Number(weekNumber) });
      const missionsIds = missions.map(mission => mission._id.toString());

      progress.missions = progress.missions.map(mission => {
        if (missionsIds.includes(mission.id.toString())) {
          const { points, operationalPoints } = missions.find(item => item._id.toString() === mission.id.toString())!;
          const maxStars = points.length * operationalPoints;
          const maxPoints = Math.max(...points);

          mission.stars = maxStars;
          mission.points = maxPoints;
          mission.completed = true;
        }
        return mission;
      });

      const missionsWeek = {
        id: nanoid(6),
        completed: true,
        maxStars: Number(weekNumber) === 1 ? 10 : 6,
        missions: [] as any,
        stars: Number(weekNumber) === 1 ? 10 : 6,
        week: Number(weekNumber),
      };

      missions.forEach(mission => {
        const missionProgress = progress.missions.find(missionData => missionData.id.toString() === mission.id)!;

        const missionData = {
          completed: true,
          description: mission.description,
          id: mission._id,
          points: mission.points,
          userPoints: missionProgress.points,
          stars: missionProgress.stars,
          maxPoints: missionProgress.points,
          operationalPoints: mission.operationalPoints,
          title: mission.title,
          type: mission.type,
          week: mission.week,
        };

        missionsWeek.missions.push(missionData);
      });

      await progress.save();

      res.json({ message: 'Account progress updated', missionsWeek });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Progress update error' });
    }
  }

  // todo: refactor
  async clearCompletionOfWeekMissions (req: Request, res: Response) {
    try {
      const { login, weekNumber } = req.params;

      const progress = await ProgressModel.findOne({ account: login });
      if (!progress) {
        return res.status(404).json({ message: `Account ${login} not found` });
      }

      const missions = await MissionModel.find({ week: Number(weekNumber) });
      const missionsIds = missions.map(mission => mission._id.toString());

      progress.missions = progress.missions.map(mission => {
        if (missionsIds.includes(mission.id.toString())) {
          mission.stars = 0;
          mission.points = 0;
          mission.completed = false;
        }
        return mission;
      });

      const missionsWeek = {
        id: nanoid(6),
        completed: false,
        maxStars: Number(weekNumber) === 1 ? 10 : 6,
        missions: [] as any,
        stars: 0,
        week: Number(weekNumber),
      };

      missions.forEach(mission => {
        const missionProgress = progress.missions.find(missionData => missionData.id.toString() === mission.id)!;

        const missionData = {
          completed: false,
          description: mission.description,
          id: mission._id,
          points: mission.points,
          userPoints: missionProgress.points,
          stars: missionProgress.stars,
          maxPoints: Math.max(...mission.points),
          operationalPoints: mission.operationalPoints,
          title: mission.title,
          type: mission.type,
          week: mission.week,
        };

        missionsWeek.missions.push(missionData);
      });

      await progress.save();

      res.json({ message: 'Account progress updated', missionsWeek });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Progress update error' });
    }
  }
}

export default new AccountController();
