import { describe, expect, it } from 'vitest';
import reducer, {
    setActiveQuesIndex,
    setCheckedQuestions,
    setOutOfViewCount,
    setQuestions,
    setSelectedQuestion,
    setShowToast,
} from './examSlice';
import { Question } from '../../types/question';

const sampleQuestion = {
    id: 1,
    question: '2+2?',
    options: ['3', '4'],
    correctAnswer: 2,
    category: 'mcq',
} as Question;

describe('examSlice', () => {
    it('starts with empty exam state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual({
            selectedQuestion: null,
            activeQuesIndex: 0,
            questions: [],
            checkedQuestions: [],
            showToast: false,
            outOfViewCount: 0,
        });
    });

    it('updates questions and selection', () => {
        let state = reducer(undefined, setQuestions([sampleQuestion]));
        expect(state.questions).toHaveLength(1);

        state = reducer(state, setSelectedQuestion(sampleQuestion));
        expect(state.selectedQuestion).toEqual(sampleQuestion);

        state = reducer(state, setActiveQuesIndex(2));
        expect(state.activeQuesIndex).toBe(2);
    });

    it('tracks checked answers toast and out of view count', () => {
        let state = reducer(
            undefined,
            setCheckedQuestions([
                {
                    id: 1,
                    selectedOption: '4',
                    selectedOptionIndex: 1,
                    correctAnswer: 2,
                    category: 'mcq',
                    isSolved: true,
                },
            ])
        );
        expect(state.checkedQuestions).toHaveLength(1);

        state = reducer(state, setShowToast(true));
        expect(state.showToast).toBe(true);

        state = reducer(state, setOutOfViewCount(3));
        expect(state.outOfViewCount).toBe(3);
    });
});
