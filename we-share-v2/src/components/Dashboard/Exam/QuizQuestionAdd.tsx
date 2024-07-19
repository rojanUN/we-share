import React, { useState } from 'react';
import Button from '../../common/Button';

interface Option {
    text: string;
}

interface Question {
    question: string;
    options: Option[];
    correctOptionIndex: number | null;
}

const MCQQuestionsAdd: React.FC<{ prevStep: () => void; onSubmit: (e: React.FormEvent) => void }> = ({ prevStep, onSubmit }) => {

    const initialQuestionOptionsLength = 4;
    const [questions, setQuestions] = useState<Question[]>([
        { question: '', options: Array.from({ length: initialQuestionOptionsLength }, () => ({ text: '' })), correctOptionIndex: null }
    ]);

    const addNewMCQQuestion = (e: React.FormEvent) => {
        e.preventDefault();
        const newOptions = Array.from({ length: initialQuestionOptionsLength }, () => ({ text: '' }));
        setQuestions([...questions, { question: '', options: newOptions, correctOptionIndex: null }]);
    };

    const handleQuestionChange = (index: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex].text = value;
        setQuestions(newQuestions);
    };

    const addNewOption = (questionIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.push({ text: '' });
        setQuestions(newQuestions);
    };

    const removeOption = (questionIndex: number, optionIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.splice(optionIndex, 1);
        if (newQuestions[questionIndex].correctOptionIndex === optionIndex) {
            newQuestions[questionIndex].correctOptionIndex = null;
        }
        setQuestions(newQuestions);
    };

    const markAsCorrect = (questionIndex: number, optionIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].correctOptionIndex = optionIndex;
        setQuestions(newQuestions);
    };

    const removeMCQQuestion = (questionIndex: number) => {
        const newQuestions = [...questions];
        newQuestions.splice(questionIndex, 1);
        setQuestions(newQuestions);
    };

    return (
        <div>
            <h2 className="text-2xl mb-4">Quiz Questions</h2>
            {questions.map((item, index) => (
                <div key={index} className="mb-4 relative">
                    <label className="block mb-2">Question {index + 1}</label>
                    <input
                        type="text"
                        placeholder={`Enter Question Title`}
                        value={item.question}
                        onChange={(e) => handleQuestionChange(index, e.target.value)}
                        className="w-full p-2 border"
                    />
                    <Button
                        variant="danger"
                        handleBtnClick={() => removeMCQQuestion(index)}
                        className="absolute top-[-12px] right-0"
                    >
                        X
                    </Button>
                    {item.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex mt-2 items-center">
                            <input
                                type="text"
                                placeholder={`Option ${optionIndex + 1}`}
                                value={option.text}
                                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                className="w-full p-2 border mr-2"
                            />
                            <Button
                                variant="danger"
                                handleBtnClick={() => removeOption(index, optionIndex)}
                                className="mr-2"
                            >
                                -
                            </Button>
                            <Button
                                variant={item.correctOptionIndex === optionIndex ? 'primary' : 'secondary'}
                                handleBtnClick={() => markAsCorrect(index, optionIndex)}
                                className="w-[16rem]"
                            >
                                {item.correctOptionIndex === optionIndex ? 'Correct' : 'Set as Correct'}
                            </Button>
                        </div>
                    ))}
                    <Button
                        variant="primary"
                        handleBtnClick={() => addNewOption(index)}
                        className="mt-4 mb-4"
                    >
                        Add Option
                    </Button>
                </div>
            ))}
            <div className='flex justify-around gap-5'>
                <Button
                    variant="primary"
                    outline
                    handleBtnClick={addNewMCQQuestion}
                >
                    Add a New MCQ Type Question
                </Button>
                <Button
                    variant="primary"
                    outline
                    handleBtnClick={addNewMCQQuestion}
                >
                    Add a New Code Type Question
                </Button>
            </div>
            <div className="mt-4 flex justify-between">
                <Button
                    variant="secondary"
                    handleBtnClick={prevStep}
                >
                    Previous
                </Button>
                <Button
                    variant="primary"
                    handleBtnClick={onSubmit}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default MCQQuestionsAdd;
