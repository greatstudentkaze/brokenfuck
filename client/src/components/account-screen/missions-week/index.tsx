import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../../hooks/redux';
import { toggleWeekCompletion } from '../../../store/actions/progress';

import './css/missions-week.css';
import expandIcon from '../../../assets/icons/expand.svg';

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
  const [isOpened, setIsOpened] = useState(!completed);

  const handleCompletionButtonClick = () => {
    dispatch(toggleWeekCompletion({ login, week, isCompleted: !completed }));
  };

  const handleOpenButtonClick = () => {
    setIsOpened(prevState => !prevState);
  };

  return (
    <section className={`missions-week ${isOpened ? 'missions-week--active' : ''}`}>
      <header className="missions-week__header">
        <h2 className="missions-week__title">Неделя {week} {completed && '✔️'}</h2>
        <p className="missions-week__stars">⭐ {stars}/{maxStars}</p>
        <button
          className="missions-week__expand"
          type="button"
          onClick={handleOpenButtonClick}
          style={{ backgroundImage: `url("${expandIcon}")` }}
          title={isOpened ? 'Скрыть миссии' : 'Показать миссии'}
        >
          <span className="visually-hidden">{isOpened ? 'Скрыть миссии' : 'Показать миссии'}</span>
        </button>
      </header>
      <div className="missions-week__content">
        <button className="missions-week__complete button button--with-icon" type="button" onClick={handleCompletionButtonClick}>
          {
            completed
              ? <svg width="24px" height="24px" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              </svg>
              : <svg width="18px" height="18px" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
          }
          <span>Отметить {completed ? 'невыполненной' : 'выполненной'}</span>
        </button>
        <ul className="missions-week__list">{
          missions.map(mission => <li key={mission.id}>
            <Mission {...mission} />
          </li>)
        }</ul>
      </div>
    </section>
  );
};

export default MissionsWeek;
