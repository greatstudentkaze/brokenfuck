import { createAsyncThunk } from '@reduxjs/toolkit';

import accountsAPI from '../../api/accounts';

import { Accounts } from '../../types';
import { IAccount } from '../../interfaces';

export const getAllAccounts = createAsyncThunk(
  'accounts/getAll',
  async () => {
    const accounts = await accountsAPI.getAllAccounts();
    return accounts as Accounts;
  }
);

interface ICreateAccountData {
  login: IAccount['login'],
  prime: IAccount['prime'],
  link?: IAccount['link'],
  avatar?: IAccount['avatar']
}

export const createAccount = createAsyncThunk(
  'accounts/createAccount',
  async ({ login, prime, link, avatar }: ICreateAccountData) => {
    const account = await accountsAPI.createAccount(login, prime, link, avatar);
    return account as IAccount;
  }
);
