import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../../const';

import './css/account-table.css';

import { IAccount } from '../../../interfaces';

type Props = {
  accounts: IAccount[],
};

const Table = ({ accounts }: Props) => {
  return (
    <table className="table account-table">
      <thead className="table__head">
      <tr className="table__row">
        <td>Логин</td>
        <td className="account-table__prime">Прайм</td>
      </tr>
      </thead>
      <tbody aria-labelledby="tab-1" id="list-1">{
        accounts.map(account => <tr className="table__row" key={account._id}>
          <td>
            <Link to={`${AppRoute.ACCOUNTS}/${account.login}`}>
              {account.login}
            </Link>
          </td>
          <td className="account-table__prime">
            {account.prime ? '✔️' : '❌'}
          </td>
        </tr>)
      }</tbody>
    </table>
  );
};

export default Table;
