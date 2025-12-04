import { describe, expect, test } from '@jest/globals';
import { isPossiblyValid } from './3.1.logic';

describe('Day 3 - Part 1', () => {
    describe(`When the isPossiblyValid function is called...`, () => {
        test(`with '5 10 25', it should return false`, () => {
            expect(isPossiblyValid('5 10 25')).toBe(false);
        });

        test(`with '3 4 5', it should return true`, () => {
            expect(isPossiblyValid('3 4 5')).toBe(true);
        });

        test(`with '10 20 30', it should return false`, () => {
            expect(isPossiblyValid('10 20 30')).toBe(false);
        });
    });
});