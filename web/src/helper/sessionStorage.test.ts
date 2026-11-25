import { beforeEach, describe, expect, it } from 'vitest';
import { SessionStorage } from './sessionStorage';

describe('SessionStorage', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it('stores and reads JSON values', () => {
        SessionStorage.setSessionItem('timer', 120);
        expect(SessionStorage.getSessionItem('timer')).toBe(120);
    });

    it('returns null for missing keys', () => {
        expect(SessionStorage.getSessionItem('missing')).toBeNull();
    });

    it('removes a single key', () => {
        SessionStorage.setSessionItem('a', 'x');
        SessionStorage.setSessionItem('b', 'y');
        SessionStorage.removeSessionItem('a');
        expect(SessionStorage.getSessionItem('a')).toBeNull();
        expect(SessionStorage.getSessionItem('b')).toBe('y');
    });

    it('clears all session keys', () => {
        SessionStorage.setSessionItem('a', 1);
        SessionStorage.removeAllSession();
        expect(SessionStorage.getSessionItem('a')).toBeNull();
    });
});
