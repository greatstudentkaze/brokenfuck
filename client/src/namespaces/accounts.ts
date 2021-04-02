import { ThunkAction } from 'redux-thunk';

import * as ActionType from '../redux/actions/types/accounts';
import { RootState } from '../redux/store';
import { ActionsType } from '../redux/actions/accounts';
import { ActionsType as AppActionsType } from '../redux/actions/app';

import { Accounts } from '../redux/reducer/accounts';

export namespace IAction {
  export interface SetAccounts { type: typeof ActionType.SET_ACCOUNTS, payload: Accounts }
}

export namespace ThunkActionType {
  export type Default = ThunkAction<void, RootState, unknown, ActionsType>;

  export type withAppActions = ThunkAction<void, RootState, unknown, ActionsType | AppActionsType>;
}
