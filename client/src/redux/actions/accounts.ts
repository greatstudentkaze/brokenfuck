import accountsAPI from '../../api/accounts';

import * as ActionType from './types/accounts';

import { IAction, ThunkActionType } from '../../namespaces/accounts';
import { Accounts } from '../reducer/accounts';

export type ActionsType = IAction.SetAccounts;

export const setAccounts = (accounts: Accounts): IAction.SetAccounts => ({
  type: ActionType.SET_ACCOUNTS,
  payload: accounts,
});

export const getAllAccounts = (): ThunkActionType.Default =>
  async (dispatch) => {
    try {
      const accounts = await accountsAPI.getAllAccounts();
      dispatch(setAccounts(accounts));
    } catch (err) {
      localStorage.removeItem('token');
    }
  };
