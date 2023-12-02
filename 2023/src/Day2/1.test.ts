import { describe, expect, test } from '@jest/globals';
import { isValid } from './1.utils';

describe('Day 2 - Part 1', () => {
    describe(`isValid`, () => {
        test(`'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green' should return true`, () => {
            expect(isValid('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toBe(true);
        });

        test(`'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue' should return true`, () => {
            expect(isValid('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue')).toBe(true);
        });

        test(`'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red' should return false`, () => {
            expect(isValid('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red')).toBe(false);
        });

        test(`'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red' should return false`, () => {
            expect(isValid('Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red')).toBe(false);
        });

        test(`'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green' should return true`, () => {
            expect(isValid('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green')).toBe(true);
        });

        test(`'Game 5: 12 red' should return true`, () => {
            expect(isValid('Game 5: 12 red')).toBe(true);
        });

        test(`'Game 5: 13 red' should return false`, () => {
            expect(isValid('Game 5: 13 red')).toBe(false);
        });

        test(`'Game 5: 13 green' should return true`, () => {
            expect(isValid('Game 5: 13 green')).toBe(true);
        });

        test(`'Game 5: 14 green' should return false`, () => {
            expect(isValid('Game 5: 14 green')).toBe(false);
        });

        test(`'Game 5: 14 blue' should return true`, () => {
            expect(isValid('Game 5: 14 blue')).toBe(true);
        });

        test(`'Game 5: 15 blue' should return false`, () => {
            expect(isValid('Game 5: 15 blue')).toBe(false);
        });
    });
});