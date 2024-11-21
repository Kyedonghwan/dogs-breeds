import style from './Input.module.scss';
import classNames from 'classnames/bind';

const Input = ({ placeholder, type, onChange, value }) => {
  return (
    <input className={style.wrap} onChange={onChange} type={type} placeholder={placeholder} value={value} />
  )
}

export default Input;