import { describe, expect, test } from '@jest/globals';
import { calculateDistance, determineWaysToWin } from './1.logic';

describe('Day 6 - Part 1', () => {
    describe(`calculateDistance`, () => {
        test(`should return 0 when timeCharging is 0`, () => {
            expect(calculateDistance(0, 100)).toEqual(0);
        });

        test(`should return 0 when maxTime is 0`, () => {
            expect(calculateDistance(100, 0)).toEqual(0);
        });

        test(`should return 0 when timeCharging is equal to maxTime`, () => {
            expect(calculateDistance(100, 100)).toEqual(0);
        });

        test(`should return 1 when timeCharging is 1 and maxTime is 2`, () => {
            expect(calculateDistance(1, 2)).toEqual(1);
        });

        test(`should return 6 when timeCharging is 1 and maxTime is 7`, () => {
            expect(calculateDistance(1, 7)).toEqual(6);
        });

        test(`should return 10 when timeCharging is 2 and maxTime is 7`, () => {
            expect(calculateDistance(2, 7)).toEqual(10);
        });

        test(`should return 12 when timeCharging is 3 and maxTime is 7`, () => {
            expect(calculateDistance(3, 7)).toEqual(12);
        });

        test(`should return 12 when timeCharging is 4 and maxTime is 7`, () => {
            expect(calculateDistance(4, 7)).toEqual(12);
        });

        test(`should return 10 when timeCharging is 5 and maxTime is 7`, () => {
            expect(calculateDistance(5, 7)).toEqual(10);
        });

        test(`should return 6 when timeCharging is 6 and maxTime is 7`, () => {
            expect(calculateDistance(6, 7)).toEqual(6);
        });
    });

    describe(`determineWaysToWin`, () => {
        test(`should return 4 when time is 7 and distanceNeeded is 9`, () => {
            expect(determineWaysToWin(7, 9)).toEqual(4);
        });

        test(`should return 8 when time is 15 and distanceNeeded is 40`, () => {
            expect(determineWaysToWin(15, 40)).toEqual(8);
        });

        test(`should return 9 when time is 30 and distanceNeeded is 200`, () => {
            expect(determineWaysToWin(30, 200)).toEqual(9);
        });
    });
});