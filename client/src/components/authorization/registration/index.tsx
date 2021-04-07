import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../hooks/redux';
import { register } from '../../../store/actions/user';

import '../css/authorization.css';

import Input from '../../input';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(register(email, password));
  };

  return (
    <main className="page-authorization">
      <section className="authorization">
        <h2 className="authorization__title">Регистрация</h2>
        <form className="authorization__form" onSubmit={handleSubmit}>
          <label className="authorization__label" htmlFor="login-field">Эл. почта</label>
          <Input className="authorization__input" type="email" id="login-field" value={email} setValue={setEmail} placeholder="broken@fuck.ru" autoComplete="username" required />
          <label className="authorization__label" htmlFor="password-field">Пароль</label>
          <Input className="authorization__input" type="password" id="password-field" value={password} setValue={setPassword} placeholder="brokenfuck" autoComplete="current-password" required />
          <button className="authorization__button button" type="submit">Зарегистрироваться</button>
          <Link to="/login" className="authorization__button authorization__button--after-or button button--green">Войти</Link>
        </form>
      </section>
    </main>
  );
};

export default Registration;
