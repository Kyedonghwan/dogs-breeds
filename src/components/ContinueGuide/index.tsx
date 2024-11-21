import CenterGuide from "../CenterGuide";
import { useState, useContext } from 'react';
import style from './ContinueGuide.module.scss';
import classNames from 'classnames';
import { QUESTION_LIST, FIRST_INDEX, LAST_INDEX } from "../../contstant/question";
import { answerNumberContext } from "../../context/answerNumberContext";

const cx = classNames.bind(style);

const ContinueGuide = () => {
  const [count, setCount] = useState(1);
  const [idx, setIndex] = useState(0);
  const { setAnswer, setStatus } = useContext(answerNumberContext);

  const handleCount = (direction: string) => {
    const answerAnimal = QUESTION_LIST[count - 1].name;
    const myCheckAnswerAnimal = QUESTION_LIST[count - 1].choice[idx].replace(/[0-9]. /g, '');
    
    if (count === FIRST_INDEX && direction === 'left') return;
    if (count === LAST_INDEX && direction === 'right') {
      const data = QUESTION_LIST.filter((v) => v.check === true).length;
      setAnswer(data);
      setStatus('finish');
      return;
    }
    
    if (direction === 'left') setCount(count - 1);
    else if (direction === 'right') {
      QUESTION_LIST[count - 1].check = answerAnimal === myCheckAnswerAnimal? true: false;
      setCount(count + 1);
      setIndex(0);
    }
  }

  const handleItem = (index: number) => {
    setIndex(index);
  }

  return (
    <CenterGuide>
      <div className={style.wrap}>
        <span>{count} / 10</span>
        <div className={style.content}>
          <div className={style.imageThumb}>
            <img src={QUESTION_LIST[count - 1].url} alt="" width="224" height="168" />
          </div>
          <button type="button" aria-label="이전" className={cx(style.icon, style.left)} onClick={() => handleCount('left')}></button>
          <button type="button" aria-label="다음" className={cx(style.icon, style.right)} onClick={() => handleCount('right')}></button>
        </div>
        <ul className={style.choice}>
          {QUESTION_LIST[count-1].choice.map((dog, index) => {
            return (
              <li key={`key-${index}`} className={style.item}>
                <button type="button" className={cx(style.button, idx === index? style.active: '')} onClick={() => handleItem(index)}>{dog}</button>
              </li>
            )
          })}
        </ul>
      </div>
    </CenterGuide>
  )
}

export default ContinueGuide;