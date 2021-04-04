import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../../hooks/redux';
import { toggleWeekCompletion } from '../../../store/actions/progress';

import Mission from './mission';

import { IMission, IProgress } from '../../../interfaces';


type Props = {
  week: IMission['week'],
  missions: IMission[],
  maxStars: number,
  stars: IProgress['stars'],
  completed: boolean,
};

type Params = {
  login: string,
}

const MissionsWeek = ({ week, missions, maxStars, stars, completed }: Props) => {
  const dispatch = useAppDispatch();
  const { login } = useParams<Params>();

  const handleCompletionButtonClick = () => {
    dispatch(toggleWeekCompletion({ login, week, isCompleted: !completed }));
  };

  return (
    <div>
      <header>
        <h3>Неделя {week} {completed && '✔️'}</h3>
        <p>⭐ {stars}/{maxStars}</p>
      </header>
      <button type="button" onClick={handleCompletionButtonClick}>Отметить {completed ? 'невыполненной' : 'выполненной'}</button>
      <ul>
        {
          missions.map(mission => <li key={mission.id}>
            <Mission {...mission} />
          </li>)
        }
      </ul>
    </div>
  );
};

export default MissionsWeek;
