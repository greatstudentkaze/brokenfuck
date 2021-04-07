import React, { FormEvent, useState } from 'react';

import { useAppDispatch } from '../../hooks/redux';
import { createAccount } from '../../store/actions/accounts';

import Input from '../input';

import './css/popup.css';
import './css/form.css';
import closeIcon from '../../assets/icons/close.svg';

import { IAccount } from '../../interfaces';

type Props = {
  onClose: () => void,
  login?: IAccount['login'],
  prime?: IAccount['prime'],
  link?: IAccount['link'],
};

const Popup = ({ onClose, login: initialLogin, prime: initialPrime, link: initialLink }: Props) => {
  const [login, setLogin] = useState(initialLogin ?? '');
  const [prime, setPrime] = useState(initialPrime ?? false);
  const [link, setLink] = useState(initialLink ?? '');
  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!login.trim()) {
      return;
    }

    const accountData = {
      login,
      prime,
      link,
    };
    dispatch(createAccount(accountData));

    onClose();
  };

  return (
    <div className="overlay">
      <section className="popup">
        <header className="popup__header">
          <h2 className="popup__title">Аккаунт { initialLogin }</h2>
          <button className="popup__close" onClick={onClose} type="button" style={{ backgroundImage: `url("${closeIcon}")` }}>
            <span className="visually-hidden">Закрыть</span>
          </button>
        </header>
        <form className="popup__form form" onSubmit={handleSubmit} autoComplete="off">
          <label className="form__label" htmlFor="login-field">Логин</label>
          <Input className="form__input" type="text" id="login-field" placeholder="brokenfuckagent" value={login} setValue={setLogin} required />
          <label className="form__label" htmlFor="link-field">Ссылка</label>
          <Input className="form__input" type="text" id="link-field" placeholder="steamcommunity.com/id/brokenfuckagent" value={link} setValue={setLink} />
          <fieldset className="form__fieldset">
            <legend className="form__label">Прайм статус</legend>
            <label className="form__radio">
              <input type="radio" name="prime" checked={prime} onChange={() => setPrime(true)} />
              Есть
            </label>
            <label className="form__radio">
              <input type="radio" name="prime" checked={!prime} onChange={() => setPrime(false)} />
              Нет
            </label>
          </fieldset>
          <button className="button form__submit" type="submit">Добавить</button>
        </form>
      </section>
    </div>
  );
};

export default Popup;
