import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

import './css/progress.css';
import star from '../../../../../assets/star.svg';

type Props = {
  points: number[],
  userPoints: number,
  maxPoints: number,
  setUserPoints: Dispatch<SetStateAction<number>>,
};

const Progress = ({ points, userPoints, maxPoints, setUserPoints }: Props) => {
  const handleRangeChange = (evt: ChangeEvent<HTMLInputElement>) => setUserPoints(Number(evt.target.value));

  const additional = userPoints / maxPoints > 0.5 ? `${-7.5 * (userPoints / maxPoints)}px` : `${5 * (1 - userPoints / maxPoints)}px`;

  return (
    <div className="missions__progress progress">
      <div className="progress__tooltip" style={{ left: `calc(${userPoints * 100 / maxPoints}% + ${additional})` }}>
        <span>{userPoints}</span>
      </div>
      <input className="progress__range" type="range" value={userPoints} min="0" max={maxPoints} onChange={handleRangeChange} />
      {
        points.map((point) =>
          <span
            key={point}
            className="progress__star"
            style={{
              left: `calc(${point / maxPoints * 100}% - ${(7 + 8 * point / maxPoints)}px)`,
              backgroundImage: `url("${star}")`,
            }}
            onClick={() => setUserPoints(point)}
          >{point}</span>)
      }
    </div>
  );
};

export default Progress;
