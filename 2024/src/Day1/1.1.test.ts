import { describe, expect, test } from '@jest/globals';
import { add, subtract, sortNumerics, calculateDistance } from './1.1.logic';

describe('Day 1 - Part 1', () => {
    describe(`When the add function is called...`, () => {
        test(`with 1 and 2, it should return 3`, () => {
            expect(add(1, 2)).toBe(3);
        });

        test(`with 2 and 3, it should return 5`, () => {
            expect(add(2, 3)).toBe(5);
        });

        test(`with 3 and 4, it should return 7`, () => {
            expect(add(3, 4)).toBe(7);
        });
    });

    describe(`When the subract function is called...`, () => {
        test(`with 2 and 1, it should return 1`, () => {
            expect(subtract(2, 1)).toBe(1);
        });

        test(`with 3 and 2, it should return 1`, () => {
            expect(subtract(3, 2)).toBe(1);
        });

        test(`with 4 and 3, it should return 1`, () => {
            expect(subtract(4, 3)).toBe(1);
        });
    });

    describe(`When the sort function is called...`, () => {
        test(`with 1 and 2, it should return -1`, () => {
            expect(sortNumerics(1, 2)).toBe(-1);
        });

        test(`with 2 and 1, it should return 1`, () => {
            expect(sortNumerics(2, 1)).toBe(1);
        });

        test(`with 1 and 1, it should return 0`, () => {
            expect(sortNumerics(1, 1)).toBe(0);
        });
    });

    describe(`When the calculateDistance function is called...`, () => {
        test(`with 1 and 2, it should return 1`, () => {
            expect(calculateDistance(1, 2)).toBe(1);
        });

        test(`with 9 and 1, it should return 8`, () => {
            expect(calculateDistance(9, 1)).toBe(8);
        });

        test(`with 1 and 1, it should return 0`, () => {
            expect(calculateDistance(1, 1)).toBe(0);
        });
    });
});