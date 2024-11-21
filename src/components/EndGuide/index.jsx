import CenterGuide from "../CenterGuide";
import style from './EndGuide.module.scss';
import Button from '../Button';
import { useContext } from 'react';
import { answerNumberContext } from "../../context/answerNumberContext";

const EndGuide = ({onClick}) => {
  const {answer} = useContext(answerNumberContext);

  return (
    <CenterGuide>
      <strong className={style.title}>Result</strong>
      <p className={style.description}>{answer} / 10</p>
      <Button text="Again" customStyle={{marginTop: '27px'}} onClick={onClick}/>
    </CenterGuide>
  );
}

export default EndGuide;