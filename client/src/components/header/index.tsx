import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectUser, selectIsAuthorized } from '../../store/reducers/user';
import { AppRoute } from '../../const';
import { logout } from '../../store/actions/user';

import './css/logo.css';
import './css/site-list.css';
import './css/user-list.css';
import './css/main-nav.css';
import './css/page-header.css';
import defaultAvatar from '../../assets/user-avatar.png';

const Header = () => {
  const currentUser = useAppSelector(selectUser);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const dispatch = useAppDispatch();
  const avatar = (currentUser && currentUser.avatar) ?? defaultAvatar;

  const handleLogoutButtonClick = () => {
    dispatch(logout());
  };

  return (
    <header className="page-header">
      <div className="page-header__container container">
        <NavLink exact to={AppRoute.ROOT} className="page-header__logo logo" activeClassName="logo--active">
          brokenf***
        </NavLink>
        {
          isAuthorized && currentUser && <nav className="main-nav">
            <ul className="main-nav__list site-list">
              <li className="site-list__item">
                <NavLink to={AppRoute.ACCOUNTS} className="site-list__link" activeClassName="site-list__link--active">
                  Аккаунты
                </NavLink>
              </li>
            </ul>
            <ul className="main-nav__list user-list">
              <li className="user-list__item">
                <NavLink to={AppRoute.PROFILE} className="user-list__profile" activeClassName="user-list__profile--active" title="Перейти в профиль">
                  <img src={avatar} width="40" height="40" alt={`Аватар ${currentUser.name}`} />
                </NavLink>
              </li>
              <li className="user-list__item">
                <button type="button" onClick={handleLogoutButtonClick}>Выход</button>
              </li>
            </ul>
          </nav>
        }
      </div>
    </header>
  );
};

export default Header;
