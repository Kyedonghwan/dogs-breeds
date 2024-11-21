import style from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Button({text, onClick, customStyle}) {
  return (
    <button type="button" onClick={onClick} className={cx('wrap')} style={customStyle}>{text}</button>
  )
}

export default Button;