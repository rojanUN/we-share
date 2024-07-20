import axios from 'axios';
import { questionEndPoints } from '../helper/endpont';
import { Toast } from '../helper/toast';


interface Option {
    text: string;
}

interface Question {
    question: string;
    options: Option[];
    correctOptionIndex: number | null;
}

export const submitMCQQuestions = async (questions: Question[]) => {
    const formattedQuestions = questions.map(({ question, options, correctOptionIndex }) => ({
        question,
        options: options.map(option => option.text),
        correctAnswer: correctOptionIndex! + 1,
        category: 'mcq',
    }));
    try {
        const response = await axios.post(questionEndPoints.addMCQQuestion, { questions: formattedQuestions });
        Toast.Success(response.data.message);
    } catch (error) {
        Toast.Error("Error adding MCQ questions");
        throw error;
    }
};
