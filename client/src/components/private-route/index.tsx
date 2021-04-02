import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { AppRoute } from '../../const';

type Props = {
  component: any
} & RouteProps;

const PrivateRoute = ({ component: Component, exact, path, ...rest }: Props) => {
  const isAuthorized = useSelector(({ user }: RootState) => user.isAuthorized);

  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={routeProps =>
        isAuthorized
          ? <Component {...routeProps} />
          : <Redirect to={AppRoute.LOGIN} />
      }
    />
  );
};

export default PrivateRoute;
