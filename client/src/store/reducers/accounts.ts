import { createReducer } from '@reduxjs/toolkit';

import { RootState } from '../index';
import { Accounts } from '../../types';
import { createAccount, getAllAccounts } from '../actions/accounts';

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

    builder.addCase(createAccount.fulfilled, (state, action) => {
      if (state.items) {
        state.items.push(action.payload);
      } else {
        state.items = [action.payload];
      }
    });
  },
);

export const selectAccounts = (state: RootState) => state.accounts.items;

export default accounts;

