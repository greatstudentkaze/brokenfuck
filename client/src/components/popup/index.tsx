import React, { FormEvent, useState } from 'react';

import { useAppDispatch } from '../../hooks/redux';
import { createAccount } from '../../store/actions/accounts';

import Input from '../input';

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

    const accountData = {
      login,
      prime,
      link,
    };
    dispatch(createAccount(accountData));
  };

  return (
    <div className="overlay">
      <section className="popup">
        <header className="popup__header">
          <h2 className="popup__title">Аккаунт { initialLogin }</h2>
          <button onClick={onClose} type="button">Закрыть</button>
        </header>
        <form onSubmit={handleSubmit}>
          <label htmlFor="login-field">Логин</label>
          <Input type="text" id="login-field" placeholder="brokenfuckagent" value={login} setValue={setLogin} required />
          <label htmlFor="link-field">Ссылка</label>
          <Input type="text" id="link-field" placeholder="steamcommunity.com/id/brokenfuckagent" value={link} setValue={setLink} />
          <fieldset>
            <legend>Прайм статус</legend>
            <label>
              <input type="radio" name="prime" checked={prime} onChange={() => setPrime(true)} />
              Есть
            </label>
            <label>
              <input type="radio" name="prime" checked={!prime} onChange={() => setPrime(false)} />
              Нет
            </label>
          </fieldset>
          <button type="submit">Добавить</button>
        </form>
      </section>
    </div>
  );
};

export default Popup;
