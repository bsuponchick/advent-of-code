import { describe, expect, test } from '@jest/globals';
import { isPossiblyValid, identifyTriangles } from './3.2.logic';

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

    describe(`When the identifyTriangles function is called...`, () => {
        test(`with ['1 2 3', '4 5 6', '7 8 9'], it should return ['1 4 7', '2 5 8', '3 6 9']`, () => {
            expect(identifyTriangles(['1 2 3', '4 5 6', '7 8 9'])).toEqual(['1 4 7', '2 5 8', '3 6 9']);
        });
    });
});