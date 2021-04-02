import { combineReducers } from 'redux';

import app from './app';
import accounts from './accounts';
import user from './user';

const rootReducer = combineReducers({
  app,
  accounts,
  user,
});

export default rootReducer;
