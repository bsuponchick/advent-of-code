import { describe, expect, test } from '@jest/globals';
import { getCountsOfDigitsInProductId, hasOnlyOneRepeatedDigit, noCountsAreGreaterThanOne, splitIntoEqualPartsOfLength, getLowestNonZeroCount, isInvalidProductId, getInvalidProductIdsFromRange } from './2.2.logic';

describe('Day 2 - Part 2', () => {
    describe(`When the getCountsOfDigitsInProductId function is called...`, () => {
        test(`with 1234567890, it should return [1,1,1,1,1,1,1,1,1,1]`, () => {
            expect(getCountsOfDigitsInProductId(1234567890)).toEqual([1,1,1,1,1,1,1,1,1,1]);
        });

        test(`with 1111111111, it should return [0,10,0,0,0,0,0,0,0,0]`, () => {
            expect(getCountsOfDigitsInProductId(1111111111)).toEqual([0,10,0,0,0,0,0,0,0,0]);
        });

        test(`with 9999999999, it should return [0,0,0,0,0,0,0,0,0,10]`, () => {
            expect(getCountsOfDigitsInProductId(9999999999)).toEqual([0,0,0,0,0,0,0,0,0,10]);
        });
    });

    describe(`When the hasOnlyOneRepeatedDigit function is called...`, () => {
        test(`with [1,1,1,1,1,1,1,1,1,1], it should return false`, () => {
            expect(hasOnlyOneRepeatedDigit([1,1,1,1,1,1,1,1,1,1])).toBe(false);
        });

        test(`with [0,10,0,0,0,0,0,0,0,0], it should return true`, () => {
            expect(hasOnlyOneRepeatedDigit([0,10,0,0,0,0,0,0,0,0])).toBe(true);
        });

        test(`with [1,2,0,0,0,0,0,0,0,0], it should return false`, () => {
            expect(hasOnlyOneRepeatedDigit([1,2,0,0,0,0,0,0,0,0])).toBe(false);
        });
    });

    describe(`When the getLowestNonZeroCount function is called...`, () => {
        test(`with [1,1,1,1,1,1,1,1,1,1], it should return 1`, () => {
            expect(getLowestNonZeroCount([1,1,1,1,1,1,1,1,1,1])).toBe(1);
        });

        test(`with [0,10,0,0,0,0,0,0,0,0], it should return 10`, () => {
            expect(getLowestNonZeroCount([0,10,0,0,0,0,0,0,0,0])).toBe(10);
        });

        test(`with [1,2,3,4,5,6,7,8,9,10], it should return 1`, () => {
            expect(getLowestNonZeroCount([1,2,3,4,5,6,7,8,9,10])).toBe(1);
        });
    });


    describe(`When the noCountsAreGreaterThanOne function is called...`, () => {
        test(`with [1,1,1,1,1,1,1,1,1,1], it should return true`, () => {
            expect(noCountsAreGreaterThanOne([1,1,1,1,1,1,1,1,1,1])).toBe(true);
        });

        test(`with [0,10,0,0,0,0,0,0,0,0], it should return false`, () => {
            expect(noCountsAreGreaterThanOne([0,10,0,0,0,0,0,0,0,0])).toBe(false);
        });
    });

    describe(`When the splitIntoEqualPartsOfLength function is called...`, () => {
        test(`with 1234567890, 2, it should return ['12', '34', '56', '78', '910']`, () => {
            expect(splitIntoEqualPartsOfLength(1234567890, 2)).toEqual(['12', '34', '56', '78', '90']);
        });

        test(`with 1234567890, 3, it should throw an error`, () => {
            expect(() => splitIntoEqualPartsOfLength(1234567890, 3)).toThrow();
        });

        test(`with 1400140, 4, it should throw an error`, () => {
            expect(() => splitIntoEqualPartsOfLength(1400140, 4)).toThrow();
        });
    });

    describe(`When the isInvalidProductId function is called...`, () => {
        test(`with 1234567890, it should return false`, () => {
            expect(isInvalidProductId(1234567890)).toBe(false);
        });

        test(`with 11, it should return true`, () => {
            expect(isInvalidProductId(11)).toBe(true);
        });

        test(`with 22, it should return true`, () => {
            expect(isInvalidProductId(22)).toBe(true);
        });

        test(`wit 1188511885, it should return true`, () => {
            expect(isInvalidProductId(1188511885)).toBe(true);
        });

        test(`with 222222, it should return true`, () => {
            expect(isInvalidProductId(222222)).toBe(true);
        });

        test(`with 446446, it should return true`, () => {
            expect(isInvalidProductId(446446)).toBe(true);
        });

        test(`with 38593859, it should return true`, () => {
            expect(isInvalidProductId(38593859)).toBe(true);
        });

        test(`with 565656, it should return true`, () => {
            expect(isInvalidProductId(565656)).toBe(true);
        });

        test(`with 824824824, it should return true`, () => {
            expect(isInvalidProductId(824824824)).toBe(true);
        });

        test(`with 2121212121, it should return true`, () => {
            expect(isInvalidProductId(2121212121)).toBe(true);
        });

        test(`with 100, it should return false`, () => {
            expect(isInvalidProductId(100)).toBe(false);
        });

        test(`with 1400140, should return false`, () => {
            expect(isInvalidProductId(1400140)).toBe(false);
        });
    });

    describe(`When the getInvalidProductIdsFromRange function is called...`, () => {
        test(`with 11-22, it should return [11, 22]`, () => {
            expect(getInvalidProductIdsFromRange('11-22')).toEqual([11, 22]);
        });
    });
});