import { createReducer } from '@reduxjs/toolkit';

import { RootState } from '../index';
import { Accounts } from '../../types';
import { getAllAccounts } from '../actions/accounts';

interface State {
  items: Accounts,
  isAccountsFetched: boolean,
}

const initialState: State = {
  items: null,
  isAccountsFetched: false,
};

export const accounts = createReducer(
  initialState,
  (builder) => {
    builder.addCase(getAllAccounts.pending, (state) => {
      state.isAccountsFetched = false;
    });

    builder.addCase(getAllAccounts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isAccountsFetched = true;
    });
  },
);

export const selectAccounts = (state: RootState) => state.accounts.items;

export default accounts;

