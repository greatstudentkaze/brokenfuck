import React, { ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectLanguage, setLanguage } from '../../../store/slices/progress';

import './css/language.css';

const Language = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);

  const handleLanguageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const language = evt.target.value;

    if (language !== 'en' && language !== 'ru') {
      return console.error('Bad language value');
    }

    dispatch(setLanguage(language));
  }

  return (
    <fieldset className="language">
      <legend className="visually-hidden">Язык</legend>
      <input
        className="language__radio visually-hidden"
        type="radio"
        id="language-ru"
        name="language"
        checked={language === 'ru'}
        value="ru"
        onChange={handleLanguageChange}
      />
      <label className="language__label" htmlFor="language-ru">Русский</label>
      <input
        className="language__radio visually-hidden"
        type="radio"
        id="language-en"
        name="language"
        checked={language === 'en'}
        value="en"
        onChange={handleLanguageChange}
      />
      <label className="language__label" htmlFor="language-en">Английский</label>
    </fieldset>
  );
};

export default Language;
