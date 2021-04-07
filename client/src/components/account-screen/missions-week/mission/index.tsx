import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../../../hooks/redux';
import { toggleMissionCompletion } from '../../../../store/actions/progress';

import './css/mission.css';
import doneIcon from '../../../../assets/icons/done.svg';

import { IMission } from '../../../../interfaces';

type Props = {

} & IMission;

type Params = {
  login: string,
}

const Mission = ({ completed, description, stars, title, type, week, id }: Props) => {
  const dispatch = useAppDispatch();
  const { login } = useParams<Params>();

  const handleCompleteButtonClick = () => {
    dispatch(toggleMissionCompletion({ login, week, id, isCompleted: !completed }));
  };

  return (
    <article className="mission">
      <button
        className="mission__complete"
        type="button"
        onClick={handleCompleteButtonClick}
        style={{
          backgroundImage: `url("${completed ? doneIcon: ''}")`,
          borderColor: completed ? 'var(--color-green)' : 'var(--color-border)',
        }}
      >
        <span className="visually-hidden">Отметить {completed ? 'невыполненной' : 'выполненной'}</span>
      </button>
      <h3 className="mission__title">{title}</h3>
      <p className="mission__description">{description}</p>
      <div className="missions__progress">
        <span className="missions__progress-bar" style={{ backgroundColor: completed ? 'var(--color-green)': 'var(--color-blue)' }} />
        <p className="mission__stars">⭐ {stars}</p>
      </div>
    </article>
  );
};

export default Mission;
