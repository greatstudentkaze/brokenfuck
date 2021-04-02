import { ThunkAction } from 'redux-thunk';

import * as ActionType from '../redux/actions/types/user';
import { RootState } from '../redux/store';
import { ActionsType } from '../redux/actions/user';
import { ActionsType as AppActionsType } from '../redux/actions/app';

import { IUserData } from '../interfaces';

export namespace IAction {
  export interface SetUser { type: typeof ActionType.SET_USER, payload: IUserData }
}

export namespace ThunkActionType {
  export type Default = ThunkAction<void, RootState, unknown, ActionsType>;

  export type withAppActions = ThunkAction<void, RootState, unknown, ActionsType | AppActionsType>;
}
