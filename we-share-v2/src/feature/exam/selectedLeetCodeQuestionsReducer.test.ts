import { describe, expect, it } from 'vitest';
import reducer, {
    addSelectedQuestion,
    removeSelectedQuestion,
    setSelectedQuestions,
} from './selectedLeetCodeQuestionsReducer';

describe('selectedLeetCodeQuestionsSlice', () => {
    it('adds unique questions only', () => {
        let state = reducer(
            undefined,
            addSelectedQuestion({ uniqueId: 'a' })
        );
        state = reducer(state, addSelectedQuestion({ uniqueId: 'a' }));
        state = reducer(state, addSelectedQuestion({ uniqueId: 'b' }));
        expect(state.selectedQuestions).toEqual([
            { uniqueId: 'a' },
            { uniqueId: 'b' },
        ]);
    });

    it('removes by uniqueId and can replace the list', () => {
        let state = reducer(
            undefined,
            setSelectedQuestions([{ uniqueId: 'x' }, { uniqueId: 'y' }])
        );
        state = reducer(state, removeSelectedQuestion('x'));
        expect(state.selectedQuestions).toEqual([{ uniqueId: 'y' }]);
    });
});
