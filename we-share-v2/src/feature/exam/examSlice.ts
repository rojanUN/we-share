import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    Question,
    QuestionStateType,
    CheckedQuestionType,
} from '../../types/question';

const initialState: QuestionStateType = {
    selectedQuestion: null,
    // questionNo: 0,
    activeQuesIndex: 0,
    questions: [],
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
            state.selectedQuestion = action.payload;
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
