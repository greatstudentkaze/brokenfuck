import * as ActionType from '../actions/types/accounts';
import { ActionsType } from '../actions/accounts';

import { IAccount } from '../../interfaces';

export type Accounts = IAccount[] | null;

const initialState = {
  items: null as Accounts,
  isAccountsFetched: false,
};

type State = typeof initialState;

const accountsReducer = (state = initialState, action: ActionsType): State => {
  switch (action.type) {
    case ActionType.SET_ACCOUNTS:
      return {
        ...state,
        items: action.payload,
        isAccountsFetched: true
      }
    default:
      return state;
  }
};

export default accountsReducer;
