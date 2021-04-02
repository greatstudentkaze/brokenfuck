import { REDIRECT_TO_ROUTE } from './types/app';

import { Route } from '../../types';
import { IAction } from '../../namespaces/app';

export type ActionsType = IAction.RedirectToRoute;

export const redirectToRoute = (route: Route): IAction.RedirectToRoute => ({
  type: REDIRECT_TO_ROUTE,
  payload: route,
});
