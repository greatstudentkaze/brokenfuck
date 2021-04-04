import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { getMissionsProgress } from '../../store/actions/progress';
import { selectMissionsWeeks, selectStars } from '../../store/slices/progress';
import MissionsWeek from './missions-week';

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
    <div>
      {login} <b>{stars} ⭐</b>
      {missionsWeeks && missionsWeeks.map(missionsWeek => <MissionsWeek key={missionsWeek.id} {...missionsWeek} />)}
    </div>
  );
};

export default AccountScreen;
