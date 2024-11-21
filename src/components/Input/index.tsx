import style from './Input.module.scss';
import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

type TInput = {
  placeholder: string;
  type: HTMLInputTypeAttribute;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input = ({ placeholder, type, onChange, value }: TInput) => {
  return (
    <input className={style.wrap} onChange={onChange} type={type} placeholder={placeholder} value={value} />
  )
}

export default Input;