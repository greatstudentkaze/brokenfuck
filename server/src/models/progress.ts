import mongoose, { Document } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

import { IAccount } from './account';
import { IMission } from './mission';

type MissionProgress = {
  completed: boolean,
  points: number,
  stars: number,
  id: IMission['id'],
};

export interface IProgress extends Document {
  account: IAccount['login'],
  stars: number,
  missions: MissionProgress[],
  wastedTime: number,
}

const schema = new mongoose.Schema({
  account: { type: String, ref: 'Account' },
  stars: { type: Number, default: 0 },
  missions: [{ completed: Boolean, points: Number, stars: Number, id: { type: ObjectId, ref: 'Mission' } }],
  wastedTime: { type: Number, default: 0 },
});

export default mongoose.model<IProgress>('Progress', schema);
