import style from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

type TProps = {
  text: string,
  onClick: (e: React.MouseEvent) => void,
  customStyle?: {marginTop: string},
}

function Button({text, onClick, customStyle}: TProps) {
  return (
    <button type="button" onClick={onClick} className={cx('wrap')} style={customStyle}>{text}</button>
  )
}

export default Button;