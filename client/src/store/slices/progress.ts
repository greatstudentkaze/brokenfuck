import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getMissionsProgress,
  updateUserPoints,
  completeWeekMissions,
  clearCompletionOfWeekMissions,
} from '../actions/progress';

import { RootState } from '../index';
import { IMission, IMissionsWeek, IProgress } from '../../interfaces';

interface State {
  missionsWeeks: IProgress['missionsWeeks'] | null,
  stars: IProgress['stars'],
  wastedTime: IProgress['wastedTime'],
  language: 'ru' | 'en',
}

const initialState: State = {
  missionsWeeks: null as State['missionsWeeks'],
  stars: 0,
  wastedTime: 0,
  language: 'ru',
};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<State['language']>) {
      state.language = action.payload;
    },
    setMissionsWeeks(state, action: PayloadAction<State['missionsWeeks']>) {
      state.missionsWeeks = action.payload;
    },
    updateMissionsWeek(state, action: PayloadAction<IMissionsWeek>) {
      if (state.missionsWeeks) {
        const index = state.missionsWeeks.findIndex(missionsWeek => missionsWeek.week === action.payload.week);
        if (index !== -1) {
          state.missionsWeeks = [
            ...state.missionsWeeks.slice(0, index),
            action.payload,
            ...state.missionsWeeks.slice(index + 1)
          ];
        }
      }
    },
    updateMission(state, action: PayloadAction<IMission>) {
      const { week: weekNumber, id, } = action.payload;

      if (state.missionsWeeks) {
        const week = state.missionsWeeks.find(missionsWeek => missionsWeek.week === weekNumber);
        if (week) {
          const index = week.missions.findIndex(mission => mission.id === id);
          if (index !== -1) {
            week.missions = [
              ...week.missions.slice(0, index),
              action.payload,
              ...week.missions.slice(index + 1)
            ];
          }
        }
      }
    },
    addWastedTime(state, action: PayloadAction<State['wastedTime']>) {
      state.wastedTime += action.payload;
    },
    addStars(state, action: PayloadAction<State['stars']>) {
      state.stars += action.payload;
    },
    subtractStars(state, action: PayloadAction<State['stars']>) {
      state.stars -= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMissionsProgress.fulfilled, (state, action) => {
      const { missionsWeeks, wastedTime, stars } = action.payload;
      state.missionsWeeks = missionsWeeks;
      state.wastedTime = wastedTime;
      state.stars = stars;
    });

    builder.addCase(updateUserPoints.fulfilled, (state, action) => {
      if (!state.missionsWeeks) {
        return console.error('MissionsWeeks:', state.missionsWeeks);
      }

      const { mission, stars } = action.payload;

      const week = state.missionsWeeks.find(missionsWeek => missionsWeek.week === mission.week);
      if (!week) {
        return console.error(`Week ${mission.week} not found`);
      }

      const index = week.missions.findIndex(item => item.id === mission.id);
      if (index !== -1) {
        week.stars -= week.missions[index].stars;
        week.stars += mission.stars;

        week.completed = week.stars >= week.maxStars;
        if (week.completed) {
          week.stars = week.maxStars;
        }

        week.missions = [
          ...week.missions.slice(0, index),
          mission,
          ...week.missions.slice(index + 1)
        ];

        state.stars = stars;
      }
    });

    builder.addCase(completeWeekMissions.fulfilled, (state, action) => {
      if (!state.missionsWeeks) {
        return console.error('MissionsWeeks:', state.missionsWeeks);
      }

      const index = state.missionsWeeks.findIndex(missionsWeek => missionsWeek.week === action.payload.week);
      if (index !== -1) {
        state.stars -= state.missionsWeeks[index].stars;
        state.stars += action.payload.stars;

        state.missionsWeeks = [
          ...state.missionsWeeks.slice(0, index),
          action.payload,
          ...state.missionsWeeks.slice(index + 1)
        ];
      }
    });

    builder.addCase(clearCompletionOfWeekMissions.fulfilled, (state, action) => {
      if (!state.missionsWeeks) {
        return console.error('MissionsWeeks:', state.missionsWeeks);
      }

      const index = state.missionsWeeks.findIndex(missionsWeek => missionsWeek.week === action.payload.week);
      if (index !== -1) {
        state.stars -= state.missionsWeeks[index].stars;

        state.missionsWeeks = [
          ...state.missionsWeeks.slice(0, index),
          action.payload,
          ...state.missionsWeeks.slice(index + 1)
        ];
      }
    });
  },
});

export const {
  setLanguage,
  setMissionsWeeks,
  addStars,
  subtractStars,
  addWastedTime,
  updateMission,
  updateMissionsWeek,
} = progressSlice.actions;

export const selectMissionsWeeks = (state: RootState) => state.progress.missionsWeeks;
export const selectStars = (state: RootState) => state.progress.stars;
export const selectWastedTime = (state: RootState) => state.progress.wastedTime;
export const selectLanguage = (state: RootState) => state.progress.language;

export default progressSlice.reducer;
