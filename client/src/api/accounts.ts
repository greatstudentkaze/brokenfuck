import axios, { AxiosInstance } from 'axios';

import { API_URL, APIRoute, ProgressUpdateType } from '../const';

import { Accounts, Message } from '../types';
import { IAccount, IMission, IMissionsWeek, IProgress } from '../interfaces';

export namespace ResponseType {
  export type GetAllAccounts = Accounts;
  export type CreateAccount = IAccount;
  export type GetMissionsProgress = IProgress;
  export type UpdateAccountProgress = Message;
  export type UpdateUserPoints = { message: Message, mission: IMission, stars: IProgress['stars'] };
  export type UpdateMissionsWeek = { message: Message, missionsWeek: IMissionsWeek };
}

type UpdateType = typeof ProgressUpdateType[keyof typeof ProgressUpdateType];

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

  async getMissionsProgress (login: IAccount['login']): Promise<IProgress> {
    try {
      const response = await this.instance.get<ResponseType.GetMissionsProgress>(`${login}/${APIRoute.PROGRESS}`);
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }

  async updateUserPoints (login: IAccount['login'], missionId: IMission['id'], userPoints: IMission['userPoints']): Promise<ResponseType.UpdateUserPoints> {
    try {
      const response = await this.instance.post<ResponseType.UpdateUserPoints>(`${login}/${APIRoute.PROGRESS}${APIRoute.MISSIONS}${missionId}/${APIRoute.USER_POINTS}`, { userPoints });
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }

  async completeWeekMissions (login: IAccount['login'], weekNumber: number): Promise<ResponseType.UpdateMissionsWeek> {
    try {
      const response = await this.instance.post<ResponseType.UpdateMissionsWeek>(`${login}/${APIRoute.PROGRESS}weeks/${weekNumber}/complete`);
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }

  async clearCompletionOfWeekMissions (login: IAccount['login'], weekNumber: number): Promise<ResponseType.UpdateMissionsWeek> {
    try {
      const response = await this.instance.post<ResponseType.UpdateMissionsWeek>(`${login}/${APIRoute.PROGRESS}weeks/${weekNumber}/clear`);
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
}

export default new AccountsAPI();
