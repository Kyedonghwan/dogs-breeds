import { createContext } from 'react';

type TAnswerNumberContext = {
    answer: number;
    setAnswer: (answer: number) => void;
    setStatus: (state: string) => void;
}

export const answerNumberContext = createContext<TAnswerNumberContext>({
    answer: 0,
    setAnswer: () => {},
    setStatus: () => {},
});