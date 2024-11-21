import style from './CenterGuide.module.scss';

type TProps = {
  children: React.ReactNode
}

const CenterGuide = ({children}:TProps) => {
  return (
    <div className={style.wrap}>
      {children}
    </div>
  )
}

export default CenterGuide;