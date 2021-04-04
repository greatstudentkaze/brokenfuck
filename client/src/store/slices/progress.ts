import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getMissionsProgress, toggleMissionCompletion, toggleWeekCompletion } from '../actions/progress';

import { RootState } from '../index';
import { IMission, IMissionsWeek, IProgress } from '../../interfaces';

interface State {
  missionsWeeks: IProgress['missionsWeeks'] | null,
  stars: IProgress['stars'],
  wastedTime: IProgress['wastedTime'],
}

const initialState: State = {
  missionsWeeks: null as State['missionsWeeks'],
  stars: 0,
  wastedTime: 0,
};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
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

    builder.addCase(toggleWeekCompletion.fulfilled, (state, action) => {
      const { message } = action.payload;
      console.log(message);
    });

    builder.addCase(toggleWeekCompletion.rejected, (state, action) => {
      console.error(action.payload);
    });

    builder.addCase(toggleMissionCompletion.fulfilled, (state, action) => {
      const { message } = action.payload;
      console.log(message);
    });
  },
});

export const {
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

export default progressSlice.reducer;
