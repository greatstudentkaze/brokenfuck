import mongoose, { Document } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

import { IAccount } from './account';
import { IRole } from './role';

export interface IUser extends Document {
  name?: string,
  email: string,
  password: string,
  avatar?: string,
  accounts: IAccount['_id'][],
  roles: IRole['value'][],
}

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  name: { type: String },
  accounts: [{ type: ObjectId, ref: 'Account' }],
  roles: [{ type: String, ref: 'Role' }],
});

export default mongoose.model<IUser>('User', schema);
