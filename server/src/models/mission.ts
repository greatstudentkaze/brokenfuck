import mongoose, { Document } from 'mongoose';

type MissionType = 'retakes' | 'guardian' | 'casual' | 'competitive' | 'premier' |
  'dangerzone' | 'coop' | 'wingman' | 'demolition' | 'deathmatch' | 'armsrace';

export interface IMission extends Document {
  week: number,
  points: number[],
  operationalPoints: number,
  type: MissionType,
  title: {
    en: string,
    ru: string,
  },
  description: {
    en: string,
    ru: string,
  },
}

const schema = new mongoose.Schema({
  week: { type: Number, required: true },
  points: [{ type: Number, default: 1 }],
  operationalPoints: { type: Number, default: 1 },
  type: { type: String, required: true },
  title: { type: { en: String, ru: String }, required: true },
  description: { type: { en: String, ru: String }, required: true },
});

export default mongoose.model<IMission>('Mission', schema);
