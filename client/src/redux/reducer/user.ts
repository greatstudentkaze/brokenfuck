import { SET_USER } from '../actions/types/user';
import { ActionsType } from '../actions/user';

import { IUserData } from '../../interfaces';

type CurrentUser = IUserData | null;

const initialState = {
  currentUser: null as CurrentUser,
  isAuthorized: false,
};

type State = typeof initialState;

const userReducer = (state = initialState, action: ActionsType): State => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthorized: true
      }
    default:
      return state;
  }
};

export default userReducer;
