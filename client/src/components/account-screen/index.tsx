import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { AppRoute } from '../../const';

import { getMissionsProgress } from '../../store/actions/progress';
import { selectMissionsWeeks, selectStars } from '../../store/slices/progress';

import './css/page-account.css';
import './css/missions.css';

import MissionsWeek from './missions-week';
import Language from './language';

type Params = {
  login: string,
}

const AccountScreen = () => {
  const { login } = useParams<Params>();
  const dispatch = useAppDispatch();
  const missionsWeeks = useAppSelector(selectMissionsWeeks);
  const stars = useAppSelector(selectStars);

  useEffect(() => {
    dispatch(getMissionsProgress(login));
  }, []);

  console.log(missionsWeeks)

  return (
    <main className="page-account container">
      <nav className="breadcrumbs">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link to={AppRoute.ACCOUNTS}>Аккаунты</Link>
          </li>
          <li className="breadcrumbs__item">
            {login}
          </li>
        </ul>
      </nav>
      <h1 className="page-account__title">{login} <span>{stars} ⭐</span></h1>
      <div className="missions">
        <Language />
        {missionsWeeks && missionsWeeks.map(missionsWeek => <MissionsWeek key={missionsWeek.id} {...missionsWeek} />)}
      </div>
    </main>
  );
};

export default AccountScreen;
