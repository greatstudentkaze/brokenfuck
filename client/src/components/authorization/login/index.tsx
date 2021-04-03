import React, { FormEvent, useState } from 'react';

import { useAppDispatch } from '../../../hooks/redux';
import { login } from '../../../redux/actions/user';

import Input from '../../input';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <main>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Введите электронную почту:
          <Input type="email" value={email} setValue={setEmail} placeholder="broken@fuck.ru" autoComplete="username" required />
        </label>
        <label>
          Введите пароль:
          <Input type="password" value={password} setValue={setPassword} placeholder="brokenfuck" autoComplete="current-password" required />
        </label>
        <button type="submit">Войти</button>
      </form>
      <Link to="/registration">Зарегистрироваться</Link>
    </main>
  );
};

export default Login;
