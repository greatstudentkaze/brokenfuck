export const BACKEND_URL = 'http://localhost:8432/';
export const API_URL = `${BACKEND_URL}api/`;

export const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PROFILE: '/profile',
  ACCOUNTS: '/accounts',
  ACCOUNT: '/accounts/:login',
} as const;

export const APIRoute = {
  AUTH: 'auth/',
  ACCOUNTS: 'accounts/',
  LOGIN: 'login/',
  REGISTRATION: 'registration/',
  CREATE_ACCOUNT: 'create/',
  PROGRESS: 'progress/',
}

export const ProgressUpdateType = {
  UPGRADE: 'UPGRADE',
  DEGRAGE: 'DEGRADE',
} as const;
