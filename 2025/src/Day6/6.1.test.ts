import { describe, expect, test } from '@jest/globals';
import { CephalopodCalculator } from './6.1.logic';

describe('Day 6 - Part 1', () => {
    describe(`When the add function is called...`, () => {
        test(`with 1 and 2, it should return 3`, () => {
            expect(CephalopodCalculator.add(1, 2)).toBe(3);
        });

        test(`with 1, 2 and 3, it should return 6`, () => {
            expect(CephalopodCalculator.add(1, 2, 3)).toBe(6);
        });
    });

    describe(`When the multiply function is called...`, () => {
        test(`with 1 and 2, it should return 2`, () => {
            expect(CephalopodCalculator.multiply(1, 2)).toBe(2);
        });

        test(`with 1, 2 and 3, it should return 6`, () => {
            expect(CephalopodCalculator.multiply(1, 2, 3)).toBe(6);
        });
    });
});