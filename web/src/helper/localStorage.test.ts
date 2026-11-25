import { beforeEach, describe, expect, it } from 'vitest';
import { LocalStorage } from './localStorage';

describe('LocalStorage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('stores and reads JSON values', () => {
        LocalStorage.setLocalItem('user', { id: 1, name: 'Ada' });
        expect(LocalStorage.getLocalItem('user')).toEqual({
            id: 1,
            name: 'Ada',
        });
    });

    it('returns null for missing keys', () => {
        expect(LocalStorage.getLocalItem('missing')).toBeNull();
    });

    it('removes a single key', () => {
        LocalStorage.setLocalItem('a', 1);
        LocalStorage.setLocalItem('b', 2);
        LocalStorage.removeLocalItem('a');
        expect(LocalStorage.getLocalItem('a')).toBeNull();
        expect(LocalStorage.getLocalItem('b')).toBe(2);
    });

    it('clears all keys', () => {
        LocalStorage.setLocalItem('a', 1);
        LocalStorage.removeAllLocal();
        expect(LocalStorage.getLocalItem('a')).toBeNull();
    });
});
