import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { getAllAccounts } from '../../store/actions/accounts';
import { selectAccounts } from '../../store/reducers/accounts';

const AccountsScreen = () => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(selectAccounts);

  useEffect(() => {
    dispatch(getAllAccounts());
  }, []);

  return (
    <main>
      <ul>
        {
          accounts && accounts.map(account => <li key={account._id}>
            {account.login}
            {account.prime && 'есть прайм'}
          </li>)
        }
      </ul>
    </main>
  );
};

export default AccountsScreen;
