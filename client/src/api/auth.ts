import axios from 'axios';

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
  async auth (): Promise<TokenAndUserData> {
    try {
      const response = await axios.get<ResponseType.Login>(`${API_URL}${APIRoute.AUTH}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }

  async login (email: IUser['email'], password: IUser['password']): Promise<TokenAndUserData> {
    try {
      const response = await axios.post<ResponseType.Login>(`${API_URL}${APIRoute.LOGIN}`, { email, password });
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }

  async register (email: IUser['email'], password: IUser['password']): Promise<Message> {
    try {
      const response = await axios.post<ResponseType.Register>(`${API_URL}${APIRoute.REGISTRATION}`, { email, password });
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
}

export default new AuthAPI();
