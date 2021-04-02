import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { getAllAccounts } from '../../redux/actions/accounts';

const AccountsScreen = () => {
  const dispatch = useDispatch();
  const accounts = useSelector(({ accounts }: RootState) => accounts.items);

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
