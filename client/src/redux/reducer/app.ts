import { REDIRECT_TO_ROUTE } from '../actions/types/app';
import { ActionsType } from '../actions/app';

import { Route } from '../../types';

const initialState = {
  redirectRoute: '/' as Route,
};

type State = typeof initialState;

const userReducer = (state = initialState, action: ActionsType): State => {
  switch (action.type) {
    case REDIRECT_TO_ROUTE:
      return {
        ...state,
        redirectRoute: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;
