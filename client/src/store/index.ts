import { configureStore } from '@reduxjs/toolkit';
import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import redirect from './middlewares/redirect';

import app from './reducers/app';
import accounts from './reducers/accounts';
import progress from './slices/progress';
import user from './reducers/user';

const index = configureStore({
  reducer: {
    app,
    accounts,
    progress,
    user,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(redirect),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof index.getState>;
export type AppDispatch = typeof index.dispatch;
export type AppThunk<
  ActionType extends Action = AnyAction,
  ReturnType = void
  > = ThunkAction<ReturnType, RootState, unknown, ActionType>;

export default index;
