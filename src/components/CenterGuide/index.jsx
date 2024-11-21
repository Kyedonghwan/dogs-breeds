import style from './CenterGuide.module.scss';
import classNames from "classnames";

const cx = classNames.bind(style);

const CenterGuide = ({children}) => {
  return (
    <div className={style.wrap}>
      {children}
    </div>
  )
}

export default CenterGuide;