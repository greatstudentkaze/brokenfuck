import React from 'react';
import { Switch, Route } from 'react-router-dom'

import { AppRoute } from '../../const';

import Login from '../authorization/login';
import Registration from '../authorization/registration';
import PrivateRoute from '../private-route';

const Home = () => {
  return (
    <div>authorized</div>
  )
};

const App = () => {
  return (
    <Switch>
      <PrivateRoute exact path={AppRoute.ROOT} component={Home} />
      <Route exact path={AppRoute.LOGIN} component={Login} />
      <Route exact path={AppRoute.REGISTRATION} component={Registration} />
    </Switch>
  );
};

export default App;
