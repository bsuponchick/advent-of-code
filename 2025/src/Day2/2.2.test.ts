import { describe, expect, test } from '@jest/globals';
import { splitIntoEqualPartsOfLength, allPartsAreEqual, isInvalidProductId, getInvalidProductIdsFromRange } from './2.2.logic';

describe('Day 2 - Part 2', () => {
    describe(`When the allPartsAreEqual function is called...`, () => {
        test(`with ['12', '12', '12'], it should return true`, () => {
            expect(allPartsAreEqual(['12', '12', '12'])).toBe(true);
        });

        test(`with ['12', '13', '12'], it should return false`, () => {
            expect(allPartsAreEqual(['12', '13', '12'])).toBe(false);
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