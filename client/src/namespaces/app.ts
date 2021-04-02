import * as ActionType from '../redux/actions/types/app';

import { Route } from '../types';

export namespace IAction {
  export interface RedirectToRoute { type: typeof ActionType.REDIRECT_TO_ROUTE, payload: Route }
}
