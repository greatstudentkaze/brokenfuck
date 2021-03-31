import mongoose, { Document } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

import { IAccount } from './account';

export interface IUser extends Document {
  name?: string,
  email: string,
  password: string,
  avatar: string | null,
  accounts: IAccount['_id'][],
}

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: null },
  name: { type: String },
  accounts: [{ type: ObjectId, ref: 'Account' }]
});

export default mongoose.model<IUser>('User', schema);
