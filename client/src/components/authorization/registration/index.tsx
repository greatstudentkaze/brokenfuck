import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { register } from '../../../redux/actions/user';

import Input from '../../input';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(register(email, password));
  };

  return (
    <main>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Введите электронную почту:
          <Input type="email" value={email} setValue={setEmail} placeholder="broken@fuck.ru" autoComplete="username" required />
        </label>
        <label>
          Введите пароль:
          <Input type="password" value={password} setValue={setPassword} placeholder="brokenfuck" autoComplete="current-password" required />
        </label>
        <button type="submit">Зарегистрироваться</button>
      </form>
      <Link to="/login">Войти</Link>
    </main>
  );
};

export default Registration;
