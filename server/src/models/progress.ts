import mongoose, { Document } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

import { IAccount } from './account';
import { IMission } from './mission';

export interface IProgress extends Document {
  account: IAccount['login'],
  stars: number,
  completedMissions: IMission['_id'][],
  wastedTime: number,
}

const schema = new mongoose.Schema({
  account: { type: String, ref: 'Account' },
  stars: { type: Number, default: 0 },
  completedMissions: [{ type: ObjectId, ref: 'Mission' }],
  wastedTime: { type: Number, default: 0 },
});

export default mongoose.model<IProgress>('Progress', schema);
