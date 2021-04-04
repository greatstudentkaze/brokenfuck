import React from 'react';

import { IMission, IProgress } from '../../../interfaces';

import Mission from './mission';

type Props = {
  week: IMission['week'],
  missions: IMission[],
  maxStars: number,
  stars: IProgress['stars'],
  completed: boolean,
};

const MissionsWeek = ({ week, missions, maxStars, stars, completed }: Props) => {
  return (
    <div>
      <header>
        <h3>Неделя {week}</h3>
        <p>⭐ {stars}/{maxStars}</p>
      </header>
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
