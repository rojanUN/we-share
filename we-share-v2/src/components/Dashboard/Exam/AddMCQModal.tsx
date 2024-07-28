import React, { useState } from 'react';
import QuizInfo from './QuizInfo';
import MCQQuestionsAdd from './QuizQuestionAdd';
import LeetCodeProblemsTable from './LeetCodeProblemsTable';

interface AddMCQModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddMCQModal: React.FC<AddMCQModalProps> = ({ isOpen, onClose }) => {
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [quizMarks, setQuizMarks] = useState('');

    const [step, setStep] = useState(1);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="relative bg-white p-6 w-full max-w-2xl h-full max-h-full overflow-y-auto">
                <button
                    onClick={onClose}
                    className="text-[1.5rem] absolute top-4 right-4 text-gray-700 hover:text-gray-900"
                >
                    &times;
                </button>
                <div>
                    {step === 1 && (
                        <QuizInfo
                            quizTitle={quizTitle}
                            setQuizTitle={setQuizTitle}
                            quizDescription={quizDescription}
                            setQuizDescription={setQuizDescription}
                            quizMarks={quizMarks}
                            setQuizMarks={setQuizMarks}
                            nextStep={nextStep}
                        />
                    )}
                    {step === 2 && (
                        <MCQQuestionsAdd
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}

                    {step === 3 && (
                        <LeetCodeProblemsTable
                            prevStep={prevStep}
                            onClose={onClose}
                            limit={10}
                        />)}

                </div>
            </div>
        </div>
    );
};

export default AddMCQModal;
