import { createAction } from '@reduxjs/toolkit';

import { REDIRECT_TO_ROUTE } from './types/app';

import { Route } from '../../types';

export const redirectToRoute = createAction<Route>(REDIRECT_TO_ROUTE);
