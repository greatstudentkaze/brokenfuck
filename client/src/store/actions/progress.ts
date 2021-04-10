import { createAsyncThunk } from '@reduxjs/toolkit';

import accountsAPI from '../../api/accounts';
import { ProgressUpdateType } from '../../const';

import { updateMission, updateMissionsWeek, addStars, subtractStars } from '../slices/progress';

import { RootState } from '../index';
import { IAccount, IMission, IMissionsWeek } from '../../interfaces';
import { Message } from '../../types';

export const getMissionsProgress = createAsyncThunk(
  'progress/getMissionsProgress',
  async (login: IAccount['login']) => {
    return accountsAPI.getMissionsProgress(login)
  }
);

interface IToggleWeekCompletionData {
  login: IAccount['login'],
  week: IMissionsWeek['week'],
  isCompleted: boolean,
}

interface IToggleMissionCompletionData {
  login: IAccount['login'],
  week: IMissionsWeek['week'],
  id: IMission['id'],
  isCompleted: boolean,
}

interface IUpdateUserPointsData {
  login: IAccount['login'],
  userPoints: IMission['userPoints'],
  id: IMission['id'],
}

export const updateUserPoints = createAsyncThunk(
  'progress/updateUserPoints',
  async ({ login, id, userPoints }: IUpdateUserPointsData) => {
    const { mission, stars, message } = await accountsAPI.updateUserPoints(login, id, userPoints);
    console.log(message);
    return { mission, stars };
  }
);

export const completeWeekMissions = createAsyncThunk(
  'progress/completeWeekMissions',
  async ({ login, weekNumber }: { login: IAccount['login'], weekNumber: number }) => {
    const { missionsWeek, message } = await accountsAPI.completeWeekMissions(login, weekNumber);
    console.log(message);
    return missionsWeek;
  }
);

export const clearCompletionOfWeekMissions = createAsyncThunk(
  'progress/clearCompletionOfWeekMissions',
  async ({ login, weekNumber }: { login: IAccount['login'], weekNumber: number }) => {
    const { missionsWeek, message } = await accountsAPI.clearCompletionOfWeekMissions(login, weekNumber);
    console.log(message);
    return missionsWeek;
  }
);
