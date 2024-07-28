import axios from 'axios';
import { questionEndPoints } from '../helper/endpont';

interface Option {
    text: string;
}

interface Question {
    question: string;
    options: Option[];
    correctOptionIndex: number | null;
}

interface CodeQuestion {
    question: string;
    difficulty: string;
    category: string;
}

export const submitMCQQuestions = async (questions: Question[]) => {
    const formattedQuestions = questions.map(
        ({ question, options, correctOptionIndex }) => ({
            question,
            options: options.map((option) => option.text),
            correctAnswer: correctOptionIndex! + 1,
            category: 'mcq',
        })
    );

    const response = await axios.post(questionEndPoints.addMCQQuestion, {
        questions: formattedQuestions,
    });
    if (response.data.message === 'MCQ questions added successfully')
        return true;

};

export const submitCodeQuestions = async (questions: CodeQuestion[]) => {

    const response = await axios.post(questionEndPoints.addCodeQuestion, {
        questions,
    });
    if (response.data.message === "Code questions added successfully")
        return true;

};