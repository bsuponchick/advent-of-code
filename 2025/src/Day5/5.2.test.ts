import { describe, expect, test } from '@jest/globals';
import { SetUnionizer } from './5.2.logic';

describe('Day 5 - Part 2', () => {
    describe(`SetUnionizer....`, () => {
        describe(`When filterOutContainedRanges is called...`, () => {
            test(`should return the ranges that are not contained in any other range`, () => {
                expect(SetUnionizer.filterOutContainedRanges([{ start: 1, end: 10 }, { start: 11, end: 20 }])).toEqual([{ start: 1, end: 10 }, { start: 11, end: 20 }]);
            });

            test(`should not return ranges that are fully contained in another range`, () => {
                expect(SetUnionizer.filterOutContainedRanges([{ start: 1, end: 10 }, { start: 5, end: 15 }])).toEqual([{ start: 1, end: 10 }, { start: 5, end: 15}]);
            });
        });

        describe(`When reduceRanges is called...`, () => {
            test(`should return the ranges that are reduced to the smallest possible range`, () => {
                expect(SetUnionizer.reduceRanges([{ start: 1, end: 10 }, { start: 5, end: 15 }])).toEqual([{ start: 1, end: 15 }]);
            });

            test(`should reduce the ranges that result in overlaps after one sweep`, () => {
                expect(SetUnionizer.reduceRanges([{ start: 1, end: 10 }, { start: 15, end: 20 }, { start: 5, end: 15 }, { start: 11, end: 20 }])).toEqual([{ start: 1, end: 20 }]);
            });
        });

        describe(`When countUniqueItemsInRanges is called...`, () => {
            test(`should return the number of unique items in the ranges`, () => {
                expect(SetUnionizer.countUniqueItemsInRanges([{ start: 1, end: 10 }, { start: 11, end: 20 }])).toBe(20);
            });

            test(`should return the number of unique items in the ranges that are not contained in any other range`, () => {
                expect(SetUnionizer.countUniqueItemsInRanges([{ start: 1, end: 10 }, { start: 11, end: 20 }, { start: 5, end: 15 }])).toBe(20);
            });
        });
    });
});