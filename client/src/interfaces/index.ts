import { MissionType } from '../types';

export interface IRole {
  value: 'USER' | 'ADMIN',
}

export interface IMissionsWeek {
  completed: boolean,
  maxStars: IProgress['stars'],
  missions: IMission[],
  stars: IProgress['stars'],
  week: IMission['week'],
}

export interface IMission {
  completed: boolean,
  description: string,
  id: string,
  stars: number,
  title: string,
  type: MissionType,
  week: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16,
}

export interface IProgress {
  missionsWeeks: IMissionsWeek[],
  stars: number,
  wastedTime: number,
}

export interface IAccount {
  login: string,
  link?: string,
  user: IUser['_id'],
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
