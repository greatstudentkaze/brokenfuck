import { createAction } from '@reduxjs/toolkit';

import { AppRoute } from '../../const';
import authAPI from '../../api/auth';

import * as ActionType from './types/user';
import { redirectToRoute } from './app';

import { AppThunk } from '../store';
import { IUser } from '../../interfaces';
import { CurrentUser } from '../reducers/user';

export const setUser = createAction<CurrentUser>(ActionType.SET_USER);

export const logout = createAction(ActionType.LOGOUT);

export const auth = (): AppThunk =>
  async (dispatch) => {
    try {
      const { token, user } = await authAPI.auth();

      localStorage.setItem('token', token);
      dispatch(setUser(user));
      dispatch(redirectToRoute(AppRoute.ROOT));
    } catch (err) {
      localStorage.removeItem('token');
    }
  };

export const login = (email: IUser['email'], password: IUser['password']): AppThunk =>
  async (dispatch) => {
    try {
      const { token, user } = await authAPI.login(email, password);

      localStorage.setItem('token', token);
      dispatch(setUser(user));
      dispatch(redirectToRoute(AppRoute.ROOT));
    } catch (err) {
      alert(err.message);
    }
  };

export const register = (email: IUser['email'], password: IUser['password']): AppThunk =>
  async (dispatch) => {
    try {
      const { message } = await authAPI.register(email, password);

      alert(message);
      dispatch(redirectToRoute(AppRoute.LOGIN));
    } catch (err) {
      alert(err.message);
    }
  };
