import axios, { AxiosInstance } from 'axios';

import { API_URL, APIRoute } from '../const';

import { Accounts } from '../types';

export namespace ResponseType {
  export type GetAllAccounts = Accounts;
}

class AccountsAPI {
  private instance: AxiosInstance;

  constructor () {
    this.instance = axios.create({
      baseURL: `${API_URL}${APIRoute.ACCOUNTS}`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
  }

  async getAllAccounts (): Promise<Accounts> {
    try {
      const response = await this.instance.get<ResponseType.GetAllAccounts>('');
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
}

export default new AccountsAPI();
