import { createAsyncThunk } from '@reduxjs/toolkit';

import accountsAPI from '../../api/accounts';

import { Accounts } from '../../types';

export const getAllAccounts = createAsyncThunk(
  'accounts/getAll',
  async () => {
    const accounts = await accountsAPI.getAllAccounts();
    return accounts as Accounts;
  }
);
