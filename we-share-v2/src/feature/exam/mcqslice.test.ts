import { describe, expect, it } from 'vitest';
import reducer, {
    addQuestion,
    removeQuestion,
    setQuestions,
    updateQuestion,
} from './mcqslice';

const q1 = {
    question: 'Q1',
    options: [{ text: 'a' }, { text: 'b' }],
    correctOptionIndex: 0,
};

const q2 = {
    question: 'Q2',
    options: [{ text: 'c' }],
    correctOptionIndex: null,
};

describe('mcqQuestionsSlice', () => {
    it('sets replaces and mutates questions', () => {
        let state = reducer(undefined, setQuestions([q1]));
        expect(state.questions).toEqual([q1]);

        state = reducer(state, addQuestion(q2));
        expect(state.questions).toHaveLength(2);

        state = reducer(
            state,
            updateQuestion({
                index: 0,
                question: { ...q1, question: 'Updated' },
            })
        );
        expect(state.questions[0].question).toBe('Updated');

        state = reducer(state, removeQuestion(1));
        expect(state.questions).toHaveLength(1);
        expect(state.questions[0].question).toBe('Updated');
    });
});
