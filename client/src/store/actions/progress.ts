import { createAsyncThunk } from '@reduxjs/toolkit';

import accountsAPI from '../../api/accounts';

import { IAccount } from '../../interfaces';

export const getMissionsProgress = createAsyncThunk(
  'progress/getMissionsProgress',
  async (login: IAccount['login']) => {
    return accountsAPI.getMissionsProgress(login)
  }
);
