import { AppRoute } from '../const';

export type Route = typeof AppRoute[keyof typeof AppRoute];

export type MissionType = 'retakes' | 'guardian' | 'casual' | 'competitive' | 'premier' |
  'dangerzone' | 'coop' | 'wingman' | 'demolition' | 'deathmatch' | 'armsrace';
