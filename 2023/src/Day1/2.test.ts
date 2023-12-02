import { describe, expect, test } from '@jest/globals';
import { getDigitsFromString } from './2.utils';

describe('Day 1 - Part 2', () => {
    describe(`getDigitsFromString`, () => {
        test(`'1' should return 11`, () => {
            expect(getDigitsFromString('1')).toBe(11);
        });

        test(`'oneone' should return 11`, () => {
            expect(getDigitsFromString('oneone')).toBe(11);
        });

        test(`'1one' should return 11`, () => {
            expect(getDigitsFromString('1one')).toBe(11);
        });

        test(`'two1nine' should return 29`, () => {
            expect(getDigitsFromString('two1nine')).toBe(29);
        });
        
        test(`'eightwothree' should return 83`, () => {
            expect(getDigitsFromString('eightwothree')).toBe(83);
        });

        test(`'abcone2threexyz' should return 13`, () => {
            expect(getDigitsFromString('abcone2threexyz')).toBe(13);
        });

        test(`'xtwone3four' should return 24`, () => {
            expect(getDigitsFromString('xtwone3four')).toBe(24);
        });

        test(`'4nineeightseven2' should return 42`, () => {
            expect(getDigitsFromString('4nineeightseven2')).toBe(42);
        });

        test(`'zoneight234' should return 14`, () => {
            expect(getDigitsFromString('zoneight234')).toBe(14);
        });

        test(`'7pqrstsixteen' should return 76`, () => {
            expect(getDigitsFromString('7pqrstsixteen')).toBe(76);
        });

        test(`'fivetczxxvjrrqfive1sevennvj6one3' should return 53`, () => {
            expect(getDigitsFromString('fivetczxxvjrrqfive1sevennvj6one3')).toBe(53);
        });

        test(`'bmjhkkn4pgf' should return 44`, () => {
            expect(getDigitsFromString('bmjhkkn4pgf')).toBe(44);
        });

        test(`'tfrrjmcvtbmktnxtxkkrcctmc33four5gfqpcjreight' should return 38`, () => {
            expect(getDigitsFromString('tfrrjmcvtbmktnxtxkkrcctmc33four5gfqpcjreight')).toBe(38);
        });

        test(`'6sixzvdsprdqlftwonine' should return 69`, () => {
            expect(getDigitsFromString('6sixzvdsprdqlftwonine')).toBe(69);
        });

        test(`'6qmgkbkmlxfourprhxrxrdseight' should return 68`, () => {
            expect(getDigitsFromString('6qmgkbkmlxfourprhxrxrdseight')).toBe(68);
        });

        test(`'248twofbkfpxtheightwovng' should return 22`, () => {
            expect(getDigitsFromString('248twofbkfpxtheightwovng')).toBe(22);
        });
    });
});