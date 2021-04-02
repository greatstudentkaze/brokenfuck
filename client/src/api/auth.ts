import axios, { AxiosInstance } from 'axios';

import { API_URL, APIRoute } from '../const';

import { IUser, IUserData } from '../interfaces';

type TokenAndUserData = {
  user: IUserData,
  token: string,
};

type Message = {
  message: string,
};

export namespace ResponseType {
  export type Login = TokenAndUserData;

  export type Register = Message;
}

class AuthAPI {
  private instance: AxiosInstance;

  constructor () {
    this.instance = axios.create({
      baseURL: `${API_URL}${APIRoute.AUTH}`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
  }

  async auth (): Promise<TokenAndUserData> {
    try {
      const response = await this.instance.get<ResponseType.Login>('');
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }

  async login (email: IUser['email'], password: IUser['password']): Promise<TokenAndUserData> {
    try {
      const response = await this.instance.post<ResponseType.Login>(APIRoute.LOGIN, { email, password });
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }

  async register (email: IUser['email'], password: IUser['password']): Promise<Message> {
    try {
      const response = await this.instance.post<ResponseType.Register>(APIRoute.REGISTRATION, { email, password });
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
}

export default new AuthAPI();
