import { describe, expect, test } from '@jest/globals';
import { findHighestDigitWithNDigitsToRight, calculateJoltage } from './3.2.logic';

describe('Day 3 - Part 2', () => {
    describe(`When the findHighestDigitWithNDigitsToRight function is called...`, () => {
        test(`with [9,8,7,6,5,4,3,2,1,1,1,1,1,1,1], it should return { digit: 9, index: 0 }`, () => {
            expect(findHighestDigitWithNDigitsToRight([9,8,7,6,5,4,3,2,1,1,1,1,1,1,1], 12)).toEqual({ digit: 9, index: 0 });
        });

        test(`with [2,3,4,2,3,4,2,3,4,2,3,4,2,7,8], it should return { digit: 4, position: 2 }`, () => {
            expect(findHighestDigitWithNDigitsToRight([2,3,4,2,3,4,2,3,4,2,3,4,2,7,8], 12)).toEqual({ digit: 4, index: 2 });
        });
    });

    describe(`When the calculateJoltage function is called...`, () => {
        test(`with '987654321111111', it should return 987654321111`, () => {
            expect(calculateJoltage('987654321111111')).toEqual(987654321111);
        });

        test(`with '811111111111119', it should return 811111111119`, () => {
            expect(calculateJoltage('811111111111119')).toEqual(811111111119);
        });

        test(`with '234234234234278', it should return 434234234278`, () => {
            expect(calculateJoltage('234234234234278')).toEqual(434234234278);
        });

        test(`with '818181911112111', it should return 888911112111`, () => {
            expect(calculateJoltage('818181911112111')).toEqual(888911112111);
        });
    });
});