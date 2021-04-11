import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectLanguage } from '../../../../store/slices/progress';
import { updateUserPoints } from '../../../../store/actions/progress';

import Progress from './progress';

import './css/mission.css';
import doneIcon from '../../../../assets/icons/done.svg';

import { IMission } from '../../../../interfaces';

type Props = {
  hideSaveButton: () => void,
  showSaveButton: () => void,
} & IMission;

type Params = {
  login: string,
}

// const UPDATE_TIMEOUT = 500;

const Mission = ({ completed, description, points, maxPoints, userPoints, title, operationalPoints, type, week, id }: Props) => {
  const dispatch = useAppDispatch();
  const { login } = useParams<Params>();
  const language = useAppSelector(selectLanguage);
  const [tempUserPoints, setTempUserPoints] = useState(userPoints);
  const didMountRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (didMountRef.current) {
      /*timeoutRef.current = setTimeout(() => {
        dispatch(updateUserPoints({ login, id, userPoints: tempUserPoints }));
      }, UPDATE_TIMEOUT);*/
      dispatch(updateUserPoints({ login, id, userPoints: tempUserPoints }));
    } else {
      didMountRef.current = true;
    }
  }, [tempUserPoints]);

  const handleCompleteButtonClick = () => {
    completed ? setTempUserPoints(0) : setTempUserPoints(maxPoints);
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
      <h3 className="mission__title">{title[language]}</h3>
      <p className="mission__description">{description[language]}</p>
      <Progress points={points} operationalPoints={operationalPoints} userPoints={userPoints} maxPoints={maxPoints} setUserPoints={setTempUserPoints} />
    </article>
  );
};

export default Mission;
