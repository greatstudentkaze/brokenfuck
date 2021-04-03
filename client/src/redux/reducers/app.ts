import { createReducer } from '@reduxjs/toolkit';

import { redirectToRoute } from '../actions/app';

import { Route } from '../../types';

interface State {
  redirectRoute: Route,
}

const initialState: State = {
  redirectRoute: '/',
};

const app = createReducer(
  initialState,
  (builder) => {
    builder.addCase(redirectToRoute, (state, action) => {
      state.redirectRoute = action.payload;
    });
  },
);

export default app;

