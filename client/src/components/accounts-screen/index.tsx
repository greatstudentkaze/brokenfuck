import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

import { getAllAccounts } from '../../store/actions/accounts';
import { selectAccounts } from '../../store/reducers/accounts';

import Popup from '../popup';

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
      <main>
        <button type="button" onClick={handleAddAccountClick}>Добавить аккаунт</button>
        <ul>
          {
            accounts && accounts.map(account => <li key={account._id}>
              <Link to={`${AppRoute.ACCOUNTS}/${account.login}`}>
                {account.login} [{account.prime && 'есть прайм'}]
              </Link>
            </li>)
          }
        </ul>
      </main>
      {isShowPopup && <Popup onClose={handleClosePopup} />}
    </>
  );
};

export default AccountsScreen;
