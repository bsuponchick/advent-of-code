import { describe, expect, test } from '@jest/globals';
import { determineWaysToWin, determineMinumumTime, determineMaximumTime } from './2.logic';

describe('Day 6 - Part 2', () => {
    describe(`determineMinumumTime`, () => {
        test(`should return 0 when distanceNeeded is 0 and limit is 0`, () => {
            expect(determineMinumumTime(0, 0)).toEqual(0);
        });

        test(`should return 0 when distanceNeeded is 0 and limit is 100`, () => {
            expect(determineMinumumTime(0, 100)).toEqual(0);
        });

        test(`should return 1 when distanceNeeded is 1 and limit is 100`, () => {
            expect(determineMinumumTime(1, 100)).toEqual(1);
        });

        test(`should return 14 when distanceNeeded is 940200 and limit is 71530`, () => {
            expect(determineMinumumTime(940200, 71530)).toEqual(14);
        });
    });

    describe(`determineMaximumTime`, () => {
        test(`should return 0 when distanceNeeded is 0 and limit is 0`, () => {
            expect(determineMaximumTime(0, 0)).toEqual(0);
        });

        test(`should return 100 when distanceNeeded is 0 and limit is 100`, () => {
            expect(determineMaximumTime(0, 100)).toEqual(100);
        });

        test(`should return 99 when distanceNeeded is 1 and limit is 100`, () => {
            expect(determineMaximumTime(1, 100)).toEqual(99);
        });

        test(`should return 71516 when distanceNeeded is 940200 and limit is 71530`, () => {
            expect(determineMaximumTime(940200, 71530)).toEqual(71516);
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

        test(`Should return 71503 when time is 71530 and distanceNeeded is 940200`, () => {
            expect(determineWaysToWin(71530, 940200)).toEqual(71503);
        });
    });
});