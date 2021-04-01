import mongoose, { Document } from 'mongoose';

export interface IRole extends Document {
  value: 'USER' | 'ADMIN',
}

const schema = new mongoose.Schema({
  value: { type: String, unique: true, default: 'USER' },
});

export default mongoose.model<IRole>('Role', schema);
