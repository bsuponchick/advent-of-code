import { describe, expect, test } from '@jest/globals';
import { calculateJoltage, findHighestDigitWithDigitsToRight } from './3.1.logic';

describe('Day 3 - Part 1', () => {
    describe(`When the calculateJoltage function is called...`, () => {
        test(`with '12345', it should return 45`, () => {
            expect(calculateJoltage('12345')).toEqual(45);
        });

        test(`with '987654321111111', it should return 98`, () => {
            expect(calculateJoltage('987654321111111')).toEqual(98);
        });

        test(`with '811111111111119', it should return 89`, () => {
            expect(calculateJoltage('811111111111119')).toEqual(89);
        });

        test(`with '234234234234278', it should return 78`, () => {
            expect(calculateJoltage('234234234234278')).toEqual(78);
        });

        test(`with '818181911112111', it should return 92`, () => {
            expect(calculateJoltage('818181911112111')).toEqual(92);
        });
    });

    describe(`When the findHighestDigitWithDigitsToRight function is called...`, () => {
        test(`with [1, 2, 3, 4, 5], it should return { digit: 4, index: 3 }`, () => {
            expect(findHighestDigitWithDigitsToRight([1, 2, 3, 4, 5])).toEqual({ digit: 4, index: 3 });
        });

        test(`with [9,8,7,6,5,4,3,21111111], it should return { digit: 9, index: 0 }`, () => {
            expect(findHighestDigitWithDigitsToRight([9,8,7,6,5,4,3,2,1,1,1,1,1,1,1])).toEqual({ digit: 9, index: 0 });
        });
    });
});