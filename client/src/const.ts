export const BACKEND_URL = 'http://localhost:8432/';
export const API_URL = `${BACKEND_URL}api/`;

export const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PROFILE: '/profile',
  ACCOUNTS: '/accounts',
} as const;

export const APIRoute = {
  LOGIN: 'auth/login',
  REGISTRATION: 'auth/registration',
}
