import { afterEach, describe, expect, it, vi } from 'vitest';
import {
    asyncHandler,
    enterFullscreen,
    exitFullscreen,
    findLanguageCode,
    formatCountDownTimer,
    isOptionSelected,
    languageMimeTypeMap,
} from './helper';
import { CheckedQuestionType } from '../types/question';

describe('formatCountDownTimer', () => {
    it('formats hours minutes and seconds with padding', () => {
        expect(formatCountDownTimer(3661)).toBe('01 : 01 : 01');
        expect(formatCountDownTimer(0)).toBe('00 : 00 : 00');
        expect(formatCountDownTimer(59)).toBe('00 : 00 : 59');
    });
});

describe('isOptionSelected', () => {
    const checked: CheckedQuestionType[] = [
        {
            id: 1,
            selectedOption: 'A',
            selectedOptionIndex: 0,
            correctAnswer: 1,
            category: 'mcq',
            isSolved: true,
        },
    ];

    it('returns true when the option matches', () => {
        expect(isOptionSelected(1, 'A', checked)).toBe(true);
    });

    it('returns false for a different option or missing question', () => {
        expect(isOptionSelected(1, 'B', checked)).toBe(false);
        expect(isOptionSelected(99, 'A', checked)).toBe(false);
    });
});

describe('findLanguageCode', () => {
    it('returns matching snippet code', () => {
        const snippets = [
            { lang: 'Python', code: 'print(1)' },
            { lang: 'JavaScript', code: 'console.log(1)' },
        ];
        expect(findLanguageCode(snippets, 'Python')).toBe('print(1)');
    });

    it('falls back to placeholder when language is missing', () => {
        expect(findLanguageCode([], 'Rust')).toBe('// Write your code here');
    });
});

describe('languageMimeTypeMap', () => {
    it('includes common languages', () => {
        expect(languageMimeTypeMap.javascript).toBe('text/javascript');
        expect(languageMimeTypeMap.python).toBe('text/x-python');
    });
});

describe('asyncHandler', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('returns the wrapped function result', async () => {
        const wrapped = asyncHandler(async (n: number) => n * 2);
        await expect(wrapped(3)).resolves.toBe(6);
    });

    it('runs error and finally callbacks then rethrows', async () => {
        const error = new Error('nope');
        const errorCallback = vi.fn();
        const finallyCallback = vi.fn();
        vi.spyOn(console, 'log').mockImplementation(() => undefined);

        const wrapped = asyncHandler(
            async () => {
                throw error;
            },
            finallyCallback,
            errorCallback
        );

        await expect(wrapped()).rejects.toThrow('nope');
        expect(errorCallback).toHaveBeenCalledWith(error);
        expect(finallyCallback).toHaveBeenCalledOnce();
    });
});

describe('fullscreen helpers', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('calls requestFullscreen when available', () => {
        const requestFullscreen = vi.fn();
        Object.defineProperty(document.documentElement, 'requestFullscreen', {
            configurable: true,
            value: requestFullscreen,
        });
        enterFullscreen();
        expect(requestFullscreen).toHaveBeenCalledOnce();
    });

    it('calls exitFullscreen when available', () => {
        const exit = vi.fn();
        Object.defineProperty(document, 'exitFullscreen', {
            configurable: true,
            value: exit,
        });
        exitFullscreen();
        expect(exit).toHaveBeenCalledOnce();
    });
});
