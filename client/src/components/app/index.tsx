import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { AppRoute } from '../../const';
import { auth } from '../../redux/actions/user';

import PrivateRoute from '../private-route';
import Header from '../header';
import Login from '../authorization/login';
import Registration from '../authorization/registration';
import AccountsScreen from '../accounts-screen';

const Home = () => {
  return (
    <>
      <h1>authorized</h1>
    </>
  )
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <PrivateRoute exact path={AppRoute.ROOT} component={Home} />
        <PrivateRoute exact path={AppRoute.ACCOUNTS} component={AccountsScreen} />
        <Route exact path={AppRoute.LOGIN} component={Login} />
        <Route exact path={AppRoute.REGISTRATION} component={Registration} />
      </Switch>
    </>
  );
};

export default App;
