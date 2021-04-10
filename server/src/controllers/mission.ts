import { Response, Request } from 'express';

import MissionModel from '../models/mission.js';

class MissionController {
  async createMission (req: Request, res: Response) {
    try {
      const { week, stars, type, title, description } = req.body;

      const mission = new MissionModel({ week, stars, type, title, description });
      await mission.save();

      return res.status(201).json({ mission, message: 'Mission created' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Upload error' });
    }
  }

  async getMissions (req: Request, res: Response) {
    try {
      const missions = await MissionModel.find();

      return res.json(missions);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new MissionController();
