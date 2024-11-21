import Button from '../Button';
import CenterGuide from '../CenterGuide';
import style from './StartGuide.module.scss';

type TStartGuid = {
  onClick : (e:React.MouseEvent) => void;
}

const StartGuide = ({onClick}: TStartGuid) => {
  return (
    <CenterGuide>
      <strong className={style.title}>Quiz를 풀어보세요!</strong>
      <p className={style.description}>10개의 퀴즈를 통해서 지식을 넓혀가세요</p>
      <Button text="Start" customStyle={{marginTop: '27px'}} onClick={onClick}/>
    </CenterGuide>
  )
}

export default StartGuide;