import { Middleware, MiddlewareAPI } from 'redux';
import browserHistory from '../../browser-history';

import { AppDispatch } from '../index';
import { REDIRECT_TO_ROUTE } from '../actions/types/app';

const redirect: Middleware = (_store: MiddlewareAPI) => (next: AppDispatch) => (action) => {
  if (action.type === REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload);
  }

  return next(action);
};

export default redirect;
