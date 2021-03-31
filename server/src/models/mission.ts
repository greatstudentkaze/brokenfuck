import mongoose, { Document } from 'mongoose';

export interface IMission extends Document {
  week: number,
  stars: number,
  type: string,
  title: string,
  description: string,
}

const schema = new mongoose.Schema({
  week: { type: Number, required: true },
  stars: { type: Number, default: 1 },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<IMission>('Mission', schema);
