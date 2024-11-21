import ContinueGuide from "../components/ContinueGuide";
import StartGuide from "../components/StartGuide";
import EndGuide from "../components/EndGuide";
import {  useState } from 'react';
import { answerNumberContext } from "../context/answerNumberContext";

const Quiz = () => {
    const [quizStatus, setStatus] = useState('before');
    const [answer, setAnswer] = useState(0);

    const handleStatus = (status: string) => {
      setStatus(status);
    }

    return (
      <answerNumberContext.Provider value={{answer, setAnswer, setStatus}}>
        {quizStatus === 'before' && <StartGuide onClick={() => handleStatus('continue')} /> }
        {quizStatus === 'continue' && <ContinueGuide />}
        {quizStatus === 'finish' && <EndGuide />}
      </answerNumberContext.Provider>
    )

}

export default Quiz;