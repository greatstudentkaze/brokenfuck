import { AppRoute } from '../../const';
import authAPI from '../../api/auth';

import * as ActionType from './types/user';
import { redirectToRoute } from './app';

import { IUser, IUserData } from '../../interfaces';
import { IAction, ThunkActionType } from '../../namespaces/user';

export type ActionsType = IAction.SetUser;

export const setUser = (user: IUserData): IAction.SetUser => ({
  type: ActionType.SET_USER,
  payload: user,
});

export const login = (email: IUser['email'], password: IUser['password']): ThunkActionType.withAppActions =>
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

export const register = (email: IUser['email'], password: IUser['password']): ThunkActionType.withAppActions =>
  async (dispatch) => {
    try {
      const { message } = await authAPI.register(email, password);

      alert(message);
      dispatch(redirectToRoute(AppRoute.LOGIN));
    } catch (err) {
      alert(err.message);
    }
  };
