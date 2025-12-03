import { describe, expect, test } from '@jest/globals';
import { getInvalidProductIdsFromRange, isInvalidProductId, getNextLargestPotentialInvalidId, getNextSmallestPotentialInvalidId } from './2.1.logic';

describe('Day 2 - Part 1', () => {
    describe(`When the getInvalidProductIdsFromRange function is called...`, () => {
        test(`with 11-22, it should return [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]`, () => {
            expect(getInvalidProductIdsFromRange('11-22')).toEqual([11, 22]);
        });

        test(`with 95-115, it should return [99]`, () => {
            expect(getInvalidProductIdsFromRange('95-115')).toEqual([99]);
        });

        test(`with 998-1012, it should return [1010]`, () => {
            expect(getInvalidProductIdsFromRange('998-1012')).toEqual([1010]);
        });
    });
    
    describe(`When the isInvalidProductId function is called...`, () => {
        test(`with 1122, it should return false`, () => {
            expect(isInvalidProductId(1122)).toBe(false);
        });

        test(`with 1111, it should return true`, () => {
            expect(isInvalidProductId(1111)).toBe(true);
        });
    });

    describe(`When the getNextLargestPotentialInvalidId function is called...`, () => {
        test(`with 1122, it should return 1122`, () => {
            expect(getNextLargestPotentialInvalidId(1122)).toBe(1123);
        });

        test(`with 111, it should return 1000`, () => {
            expect(getNextLargestPotentialInvalidId(111)).toBe(1000);
        });
    });
    
    describe(`When the getNextSmallestPotentialInvalidId function is called...`, () => {
        test(`with 1122, it should return 1122`, () => {
            expect(getNextSmallestPotentialInvalidId(1122)).toBe(1122);
        });

        test(`with 111, it should return 10`, () => {
            expect(getNextSmallestPotentialInvalidId(111)).toBe(10);
        });
    });
});