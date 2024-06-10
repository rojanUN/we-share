import QuestionIndicator from './common/QuestionIndicator';
import { questions } from '../mock-data/questions';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setQuestions, setSelectedQuestion } from '../feature/exam/examSlice';

function QuestionNav() {
    const selectedQuestionIndex = useAppSelector(
        (state) => state.exam.activeQuesIndex
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setQuestions(questions));
        dispatch(setSelectedQuestion(questions[0]));
        // dispatch(setSelectedQuestion({ ...questions[0], questionNo: 0 }));
    }, [dispatch]);
    return (
        <div className="mt-4">
            <h2>Questions</h2>
            <div className="flex flex-wrap gap-[20px] mt-2.5">
                {questions.map((question, i) => {
                    return (
                        <QuestionIndicator
                            key={i}
                            index={i}
                            isActive={selectedQuestionIndex === i}
                            question={question}
                            // question={{ ...question, questionNo: i }}
                        >
                            {++i}
                        </QuestionIndicator>
                    );
                })}
            </div>
        </div>
    );
}

export default QuestionNav;
