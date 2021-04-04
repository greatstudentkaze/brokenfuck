import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

import './css/input.css';

type Props = {
  type: 'text' | 'email' | 'password',
  placeholder: string,
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  autoComplete?: string,
  className?: string,
  required?: boolean,
  id?: string,
};

const Input = ({ type, placeholder, value, setValue, ...rest }: Props) => {
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => setValue(evt.target.value);

  return (
    <input {...rest} className={`input ${rest.className ?? ''}`} type={type} placeholder={placeholder} value={value} onChange={handleChange} />
  );
};

export default Input;
