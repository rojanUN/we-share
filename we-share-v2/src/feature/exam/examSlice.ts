import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question, QuestionStateType } from '../../types';

const initialState: QuestionStateType = {
    question: null,
    options: null,
    correctAnswer: null,
    // questionNo: 0,
    activeQuesIndex: 0,
    questions: null,
};

export const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
        },
        setSelectedQuestion: (state, action: PayloadAction<Question>) => {
            (state.question = action.payload.question),
                (state.options = action.payload.options),
                // (state.questionNo = (action.payload.questionNo ?? 0) + 1),
                (state.correctAnswer = action.payload.correctAnswer);
        },
        setActiveQuesIndex: (state, action: PayloadAction<number>) => {
            state.activeQuesIndex = action.payload;
        },
    },
});
export const { setSelectedQuestion, setActiveQuesIndex, setQuestions } =
    examSlice.actions;
export default examSlice.reducer;
