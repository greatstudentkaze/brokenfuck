import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

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
              {account.login}
              {account.prime && 'есть прайм'}
            </li>)
          }
        </ul>
      </main>
      {isShowPopup && <Popup onClose={handleClosePopup} />}
    </>
  );
};

export default AccountsScreen;
