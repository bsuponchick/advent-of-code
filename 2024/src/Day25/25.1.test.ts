import { Lock, Key } from './25.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 25 - Part 1', () => {
    describe('Lock', () => {
        describe(`Constructor`, () => {
            test(`should create a lock with the correct heights`, () => {
                const lockLayout = [
                    '#####',
                    '.####',
                    '.####',
                    '.####',
                    '.#.#.',
                    '.#...',
                    '.....'
                ];
                const lock = new Lock(lockLayout);
                expect(lock.getHeights()).toEqual([0, 5, 3, 4, 3]);
            });
        });
    });

    describe(`Key`, () => {
        describe(`Constructor`, () => {
            test(`should create a key with the correct heights`, () => {
                const keyLayout = [
                    '.....',
                    '#....',
                    '#....',
                    '#...#',
                    '#.#.#',
                    '#.###',
                    '#####'
                ];

                const key = new Key(keyLayout);
                expect(key.getHeights()).toEqual([5, 0, 2, 1, 3]);
            });
        });

        describe(`fitsLock`, () => {
            test(`Should return false for the first two examples`, () => {
                const lockLayout = [
                    '#####',
                    '.####',
                    '.####',
                    '.####',
                    '.#.#.',
                    '.#...',
                    '.....'
                ];
                const lock = new Lock(lockLayout);

                const keyLayout = [
                    '.....',
                    '#....',
                    '#....',
                    '#...#',
                    '#.#.#',
                    '#.###',
                    '#####'
                ];

                const key = new Key(keyLayout);

                expect(key.fitsLock(lock)).toBe(false);
            });
        });
    });
});