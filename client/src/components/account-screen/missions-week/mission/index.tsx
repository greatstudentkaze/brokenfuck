import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../../../hooks/redux';
import { toggleMissionCompletion } from '../../../../store/actions/progress';

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
    <div>
      <button type="button" onClick={handleCompleteButtonClick}>Отметить {completed ? 'невыполненной' : 'выполненной'}</button>
      <h4>{title} {completed && '✔️'}</h4>
      <p>{description}</p>
      <p>⭐ {stars}</p>
    </div>
  );
};

export default Mission;
