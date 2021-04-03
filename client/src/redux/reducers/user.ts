import { createReducer } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { logout, setUser } from '../actions/user';

import { IUserData } from '../../interfaces';

export type CurrentUser = IUserData | null;

interface State {
  currentUser: CurrentUser,
  isAuthorized: boolean,
}

const initialState: State = {
  currentUser: null,
  isAuthorized: false,
};

const user = createReducer(
  initialState,
  (builder) => {
    builder.addCase(setUser, (state, action) => {
      state.currentUser = action.payload;
      state.isAuthorized = true;
    });

    builder.addCase(logout, (state) => {
      localStorage.removeItem('token');
      state.currentUser = null;
      state.isAuthorized = false;
    });
  },
);

export const selectUser = (state: RootState) => state.user.currentUser;
export const selectIsAuthorized = (state: RootState) => state.user.isAuthorized;

export default user;

