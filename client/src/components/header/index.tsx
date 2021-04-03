import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectUser, selectIsAuthorized } from '../../redux/reducers/user';
import { AppRoute } from '../../const';
import { logout } from '../../redux/actions/user';

const Header = () => {
  const currentUser = useAppSelector(selectUser);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const dispatch = useAppDispatch();

  const handleLogoutButtonClick = () => {
    dispatch(logout());
  };

  return (
    <header className="page-header">
      <NavLink className="page-header__logo" to={AppRoute.ROOT} >
        brokenfuck
      </NavLink>
      {
        isAuthorized && currentUser && <nav className="main-nav">
          <ul className="main-nav__list site-list">
            <li className="site-list__item">
              <NavLink to={AppRoute.ACCOUNTS}>
                Аккаунты
              </NavLink>
            </li>
          </ul>
          <ul className="main-nav__list user-list">
            <li className="user-list__item">
              <NavLink to={AppRoute.PROFILE}>
                Профиль {currentUser.name}
              </NavLink>
            </li>
            <li className="user-list__item">
              <button type="button" onClick={handleLogoutButtonClick}>Выход</button>
            </li>
          </ul>
        </nav>
      }
    </header>
  );
};

export default Header;
