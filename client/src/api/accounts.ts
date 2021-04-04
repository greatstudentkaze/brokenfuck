import axios, { AxiosInstance } from 'axios';

import { API_URL, APIRoute } from '../const';

import { Accounts } from '../types';
import { IAccount } from '../interfaces';

export namespace ResponseType {
  export type GetAllAccounts = Accounts;
  export type CreateAccount = IAccount;
}

class AccountsAPI {
  private instance: AxiosInstance;

  constructor () {
    this.instance = axios.create({
      baseURL: `${API_URL}${APIRoute.ACCOUNTS}`,
    });
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  async getAllAccounts (): Promise<Accounts> {
    try {
      const response = await this.instance.get<ResponseType.GetAllAccounts>('');
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }

  async createAccount (login: IAccount['login'], prime: IAccount['prime'], link?: IAccount['link'], avatar?: IAccount['avatar']): Promise<IAccount> {
    try {
      const response = await this.instance.post<ResponseType.CreateAccount>(APIRoute.CREATE_ACCOUNT, {
        login, prime, link, avatar
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
}

export default new AccountsAPI();
