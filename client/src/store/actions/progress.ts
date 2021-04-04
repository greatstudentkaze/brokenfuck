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

export const toggleWeekCompletion = createAsyncThunk<Message, IToggleWeekCompletionData, { state: RootState }>(
  'progress/toggleWeekCompletion',
  async ({ login, week: weekNumber, isCompleted }, thunkAPI) => {
    const state = thunkAPI.getState().progress;
    const dispatch = thunkAPI.dispatch;

    const updateType = isCompleted ? ProgressUpdateType.UPGRADE : ProgressUpdateType.DEGRAGE;
    const update = {
      missions: [] as IMission['id'][],
      stars: 0,
      wastedTime: 0,
    };

    if (state.missionsWeeks) {
      const week = state.missionsWeeks.find(missionWeek => missionWeek.week === weekNumber);
      if (!week) {
        throw new Error(`Неделя ${weekNumber} не найдена`);
      }

      update.missions = isCompleted
        ? week.missions
          .filter(mission => !mission.completed)
          .map(mission => mission.id)
        : week.missions
          .map(mission => mission.id);

      dispatch(updateMissionsWeek({
        ...week,
        completed: isCompleted,
        missions: week.missions.map(mission => ({ ...mission, completed: isCompleted })),
        stars: isCompleted ? week.maxStars : 0
      }));

      if (isCompleted) {
        update.stars = week.maxStars - week.stars;
        dispatch(addStars(update.stars));
      } else {
        update.stars = week.maxStars;
        dispatch(subtractStars(update.stars));
      }
    }

    return accountsAPI.updateAccountProgress(login, update.missions, update.stars, update.wastedTime, updateType);
  }
);

export const toggleMissionCompletion = createAsyncThunk<Message, IToggleMissionCompletionData, { state: RootState }>(
  'progress/toggleMissionCompletion',
  async ({ login, week: weekNumber, id, isCompleted }, thunkAPI) => {
    const state = thunkAPI.getState().progress;
    const dispatch = thunkAPI.dispatch;

    const updateType = isCompleted ? ProgressUpdateType.UPGRADE : ProgressUpdateType.DEGRAGE;
    const update = {
      missions: [] as IMission['id'][],
      stars: 0,
      wastedTime: 0,
    };

    if (state.missionsWeeks) {
      const week = state.missionsWeeks.find(missionWeek => missionWeek.week === weekNumber);
      if (!week) {
        throw new Error(`Неделя ${weekNumber} не найдена`);
      }

      const mission = week.missions.find(mission => mission.id === id);
      if (!mission) {
        throw new Error(`Миссия не найдена (id: ${id})`);
      }

      update.missions = [mission.id];

      if (isCompleted) {
        update.stars = mission.stars;
        dispatch(addStars(update.stars));
        dispatch(updateMissionsWeek({
          ...week,
          stars: week.stars + update.stars,
        }));
      } else {
        update.stars = mission.stars;
        dispatch(subtractStars(update.stars));
        dispatch(updateMissionsWeek({
          ...week,
          completed: false,
          stars: week.stars - update.stars,
        }));
      }

      dispatch(updateMission({
        ...mission,
        completed: isCompleted,
      }));
    }

    return accountsAPI.updateAccountProgress(login, update.missions, update.stars, update.wastedTime, updateType);
  }
);
