import React from 'react';
import Button from '../../common/Button';

interface QuizInfoProps {
    quizTitle: string;
    setQuizTitle: (value: string) => void;
    quizDescription: string;
    setQuizDescription: (value: string) => void;
    quizMarks: string;
    setQuizMarks: (value: string) => void;
    quizClass: string;
    setQuizClass: (value: string) => void;
    quizCourse: string;
    setQuizCourse: (value: string) => void;
    nextStep: () => void;
}

const QuizInfo: React.FC<QuizInfoProps> = ({
    quizTitle,
    setQuizTitle,
    quizDescription,
    setQuizDescription,
    quizMarks,
    setQuizMarks,
    quizClass,
    setQuizClass,
    quizCourse,
    setQuizCourse,
    nextStep
}) => {
    return (
        <div>
            <h2 className="text-2xl mb-4">Quiz Information</h2>
            <div className="mb-4">
                <label className="block mb-2">Quiz Title</label>
                <input
                    type="text"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="w-full p-2 border"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Quiz Description</label>
                <textarea
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    className="w-full p-2 border"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Quiz Marks</label>
                <input
                    type="number"
                    value={quizMarks}
                    onChange={(e) => setQuizMarks(e.target.value)}
                    className="w-full p-2 border"
                />
            </div>
            <div className="mb-4 flex">
                <div className="w-1/2 mr-2">
                    <label className="block mb-2">Quiz Class</label>
                    <select
                        value={quizClass}
                        onChange={(e) => setQuizClass(e.target.value)}
                        className="w-full p-2 border"
                    >
                        <option value="">Choose Class</option>
                    </select>
                </div>
                <div className="w-1/2 ml-2">
                    <label className="block mb-2">Quiz Course</label>
                    <select
                        value={quizCourse}
                        onChange={(e) => setQuizCourse(e.target.value)}
                        className="w-full p-2 border"
                    >
                        <option value="">Choose Course</option>
                    </select>
                </div>
            </div>
            <Button variant='primary' handleBtnClick={nextStep} >Next</Button>
        </div>
    );
};

export default QuizInfo;
