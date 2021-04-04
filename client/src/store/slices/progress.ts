import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getMissionsProgress } from '../actions/progress';

import { RootState } from '../index';
import { IProgress } from '../../interfaces';

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
    setMissions(state, action: PayloadAction<State['missionsWeeks']>) {
      state.missionsWeeks = action.payload;
    },
    addWastedTime(state, action: PayloadAction<State['wastedTime']>) {
      state.wastedTime += action.payload;
    },
    addStars(state, action: PayloadAction<State['stars']>) {
      state.stars += action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMissionsProgress.fulfilled, (state, action) => {
      const { missionsWeeks, wastedTime, stars } = action.payload;
      state.missionsWeeks = missionsWeeks;
      state.wastedTime = wastedTime;
      state.stars = stars;
    });
  },
});

export const { setMissions, addStars, addWastedTime } = progressSlice.actions;

export const selectMissionsWeeks = (state: RootState) => state.progress.missionsWeeks;
export const selectStars = (state: RootState) => state.progress.stars;
export const selectWastedTime = (state: RootState) => state.progress.wastedTime;

export default progressSlice.reducer;
