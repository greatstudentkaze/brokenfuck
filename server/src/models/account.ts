import mongoose, { Document } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

import { IProgress } from './progress';
import { IUser } from './user';

export interface IAccount extends Document {
  login?: string,
  link?: string,
  user: IUser['_id'],
  progress?: IProgress['_id'],
  avatar: string | null,
  prime: boolean,
}

const schema = new mongoose.Schema({
  progress: { type: ObjectId, ref: 'Progress' },
  user: { type: ObjectId, ref: 'User' },
  avatar: { type: String, default: null },
  login: { type: String },
  link: { type: String },
  prime: { type: Boolean },
});

export default mongoose.model<IAccount>('Account', schema);
