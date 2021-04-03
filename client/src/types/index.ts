import { Draft } from '@reduxjs/toolkit';

import { AppRoute } from '../const';
import { IAccount } from '../interfaces';

export type Route = typeof AppRoute[keyof typeof AppRoute];

export type MissionType = 'retakes' | 'guardian' | 'casual' | 'competitive' | 'premier' |
  'dangerzone' | 'coop' | 'wingman' | 'demolition' | 'deathmatch' | 'armsrace';

export type Accounts = Draft<IAccount>[] | null;
