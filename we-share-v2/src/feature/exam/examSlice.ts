import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question, QuestionStateType, CheckedQuestionType } from '../../types';

const initialState: QuestionStateType = {
    id: null,
    question: null,
    options: null,
    correctAnswer: null,
    // questionNo: 0,
    activeQuesIndex: 0,
    questions: null,
    checkedQuestions: [],
    showToast: false,
};

export const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        setShowToast: (state, action: PayloadAction<boolean>) => {
            state.showToast = action.payload;
        },
        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
        },
        setCheckedQuestions: (
            state,
            action: PayloadAction<CheckedQuestionType[]>
        ) => {
            state.checkedQuestions = action.payload;
        },
        setSelectedQuestion: (state, action: PayloadAction<Question>) => {
            (state.id = action.payload.id),
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
export const {
    setSelectedQuestion,
    setActiveQuesIndex,
    setQuestions,
    setCheckedQuestions,
    setShowToast,
} = examSlice.actions;
export default examSlice.reducer;
