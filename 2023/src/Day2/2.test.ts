import { describe, expect, test } from '@jest/globals';
import { getMiniumCounts, calculatePower } from './2.utils';

describe('Day 2 - Part 2', () => {
    describe(`getMiniumCounts`, () => {
        test(`'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green' should return {red: 4, green: 2, blue: 6}`, () => {
            expect(getMiniumCounts('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toEqual({red: 4, green: 2, blue: 6});
        });

        test(`'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue' should return {red: 1, green: 3, blue: 4}`, () => {
            expect(getMiniumCounts('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue')).toEqual({red: 1, green: 3, blue: 4});
        });

        test(`'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red' should return {red: 20, green: 13, blue: 6}`, () => {
            expect(getMiniumCounts('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red')).toEqual({red: 20, green: 13, blue: 6});
        });

        test(`'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red' should return {red: 14, green: 3, blue: 15}`, () => {
            expect(getMiniumCounts('Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red')).toEqual({red: 14, green: 3, blue: 15});
        });

        test(`'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green' should return {red: 6, green: 3, blue: 2}`, () => {
            expect(getMiniumCounts('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green')).toEqual({red: 6, green: 3, blue: 2});
        });

        test(`'Game 5: 13 red' should return {red: 13, green: 0, blue: 0}`, () => {
            expect(getMiniumCounts('Game 5: 13 red')).toEqual({red: 13, green: 0, blue: 0});
        });

        test(`'Game 5: 14 green' should return {red: 0, green: 14, blue: 0}`, () => {
            expect(getMiniumCounts('Game 5: 14 green')).toEqual({red: 0, green: 14, blue: 0});
        });

        test(`'Game 5: 15 blue' should return {red: 0, green: 0, blue: 15}`, () => {
            expect(getMiniumCounts('Game 5: 15 blue')).toEqual({red: 0, green: 0, blue: 15});
        });
    });

    describe(`calculatePower`, () => {
        test(`{red: 4, green: 2, blue: 6} should return 48`, () => {
            expect(calculatePower({red: 4, green: 2, blue: 6})).toBe(48);
        });

        test(`{red: 1, green: 3, blue: 4} should return 12`, () => {
            expect(calculatePower({red: 1, green: 3, blue: 4})).toBe(12);
        });

        test(`{red: 20, green: 13, blue: 6} should return 1560`, () => {
            expect(calculatePower({red: 20, green: 13, blue: 6})).toBe(1560);
        });

        test(`{red: 14, green: 3, blue: 15} should return 630`, () => {
            expect(calculatePower({red: 14, green: 3, blue: 15})).toBe(630);
        });

        test(`{red: 6, green: 3, blue: 2} should return 36`, () => {
            expect(calculatePower({red: 6, green: 3, blue: 2})).toBe(36);
        });
    });
});