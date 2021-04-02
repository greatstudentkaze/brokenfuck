import { MissionType } from '../types';

export interface IRole {
  value: 'USER' | 'ADMIN',
}

export interface IMission {
  week: number,
  stars: number,
  type: MissionType,
  title: string,
  description: string,
  __v: number,
  _id: string,
}

export interface IProgress {
  account: IAccount['_id'],
  stars: number,
  completedMissions: IMission['_id'][],
  wastedTime: number,
  __v: number,
  _id: string,
}

export interface IAccount extends Document {
  login?: string,
  link?: string,
  user: IUser['_id'],
  progress?: IProgress['_id'],
  avatar: string | null,
  prime: boolean,
  __v: number,
  _id: string,
}

export interface IUser {
  name?: string,
  email: string,
  password: string,
  avatar?: string,
  accounts: IAccount['_id'][],
  roles: IRole['value'][],
  __v: number,
  _id: string,
}

export interface IUserData {
  id: IUser['_id'],
  email: IUser['email'],
  avatar: IUser['avatar'],
  name: IUser['name'],
  accounts: IUser['accounts'],
  roles: IUser['roles'],
}
