import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { getAllAccounts } from '../../store/actions/accounts';
import { selectAccounts } from '../../store/reducers/accounts';

import './css/page-accounts.css';

import Popup from '../popup';
import Table from './table';

const AccountsScreen = () => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(selectAccounts);
  const [isShowPopup, setIsShowPopup] = useState(false);

  useEffect(() => {
    dispatch(getAllAccounts());
  }, []);

  const handleAddAccountClick = () => setIsShowPopup(true);

  const handleClosePopup = () => setIsShowPopup(false);

  return (
    <>
      <main className="page-accounts container">
        <nav className="breadcrumbs">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">Аккаунты</li>
          </ul>
        </nav>
        <div className="page-accounts__content">
          <header className="page-accounts__header">
            <ul className="page-accounts__tabs tab-list" role="tablist">
              <li className="tab-list__item tab-list__item--selected" role="tab" aria-selected="true" aria-controls="list-1" id="tab-1">
                <button type="button">Активные</button>
              </li>
              <li className="tab-list__item" role="tab" aria-selected="true" aria-controls="list-2" id="tab-2">
                <button type="button" disabled>Архив</button>
              </li>
            </ul>
            <button className="page-accounts__add-button button" type="button" onClick={handleAddAccountClick}>Добавить аккаунт</button>
          </header>
          { accounts && <Table accounts={accounts} /> }
        </div>
      </main>
      {isShowPopup && <Popup onClose={handleClosePopup} />}
    </>
  );
};

export default AccountsScreen;
