import React, { useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { AppRoute } from '../../const';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { auth } from '../../store/actions/user';
import { selectUser } from '../../store/reducers/user';

import 'normalize.css';
import './css/visually-hidden.css';
import './css/index.css';
import './css/container.css';
import './css/button.css';
import './css/breadcrumbs.css';
import './css/tab-list.css';
import './css/table.css';

import PrivateRoute from '../private-route';
import Header from '../header';
import Login from '../authorization/login';
import Registration from '../authorization/registration';
import AccountsScreen from '../accounts-screen';
import AccountScreen from '../account-screen';

const Home = () => {
  return (
    <main className="container">
      <h1>Главная пока не сделана, переходи к <Link to={AppRoute.ACCOUNTS}>аккаунтам</Link> : - )</h1>
      <p>Сделать:</p>
      <ol>
        <li>Страница добавления миссии</li>
        <li>Изменить структуру миссии (несколько языков)</li>
        <li>Переключение языка на странице с миссиями</li>
        <li>Автоматическая авторизация после регистрации</li>
        <li>Выводить "Нет аккаунтов" на странице /accounts</li>
        <li>Исправить form.css, взять стили из формы авторизации</li>
      </ol>
    </main>
  )
};

const Profile = () => {
  const currentUser = useAppSelector(selectUser);

  return (
    <main className="container">
      <h1>{currentUser && currentUser.email}</h1>
    </main>
  )
};

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <PrivateRoute exact path={AppRoute.ROOT} component={Home} />
        <PrivateRoute exact path={AppRoute.ACCOUNTS} component={AccountsScreen} />
        <PrivateRoute exact path={AppRoute.ACCOUNT} component={AccountScreen} />
        <PrivateRoute exact path={AppRoute.PROFILE} component={Profile} />
        <Route exact path={AppRoute.LOGIN} component={Login} />
        <Route exact path={AppRoute.REGISTRATION} component={Registration} />
      </Switch>
    </>
  );
};

export default App;
