import { configureStore } from '@reduxjs/toolkit';
import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import redirect from './middlewares/redirect';

import app from './reducers/app';
import accounts from './reducers/accounts';
import user from './reducers/user';

const store = configureStore({
  reducer: {
    app,
    accounts,
    user,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(redirect),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<
  ActionType extends Action = AnyAction,
  ReturnType = void
  > = ThunkAction<ReturnType, RootState, unknown, ActionType>;

export default store;
