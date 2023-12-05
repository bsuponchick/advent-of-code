import { describe, expect, test } from '@jest/globals';
import { Range, getDestinationForSource } from './1.logic';

describe('Day 5 - Part 1', () => {
    describe(`Range`, () => {
        test(`getDestinationForSource should return the destination for the given source`, () => {
            const range = new Range(98, 50, 2);

            expect(range.getDestinationForSource(98)).toEqual(50);
            expect(range.getDestinationForSource(99)).toEqual(51);
        });

        test(`getDestinationForSource should throw an error when the source is not in the range`, () => {
            const range = new Range(98, 50, 2);

            expect(() => range.getDestinationForSource(97)).toThrowError();
            expect(() => range.getDestinationForSource(100)).toThrowError();
        });

        test(`isSourceInRange should return true when the source is in the range`, () => {
            const range = new Range(98, 50, 2);

            expect(range.isSourceInRange(98)).toEqual(true);
            expect(range.isSourceInRange(99)).toEqual(true);
        });

        test(`isSourceInRange should return false when the source is not in the range`, () => {
            const range = new Range(98, 50, 2);

            expect(range.isSourceInRange(97)).toEqual(false);
            expect(range.isSourceInRange(100)).toEqual(false);
        });

        test(`getSourceRangeEnd should return the end of the source range`, () => {
            const range = new Range(98, 50, 2);

            expect(range.getSourceRangeEnd()).toEqual(99);
        });

        test(`getDestinationRangeEnd should return the end of the destination range`, () => {
            const range = new Range(98, 50, 2);

            expect(range.getDestinationRangeEnd()).toEqual(51);
        });
    });

    describe(`getDestinationForSource`, () => {
        test(`should return the destination for the given source`, () => {
            const ranges = [
                new Range(98, 50, 2),
                new Range(50, 52, 48),
            ];

            expect(getDestinationForSource(ranges, 0)).toEqual(0);
            expect(getDestinationForSource(ranges, 1)).toEqual(1);
            expect(getDestinationForSource(ranges, 49)).toEqual(49);
            expect(getDestinationForSource(ranges, 50)).toEqual(52);
            expect(getDestinationForSource(ranges, 51)).toEqual(53);
            expect(getDestinationForSource(ranges, 97)).toEqual(99);
            expect(getDestinationForSource(ranges, 98)).toEqual(50);
            expect(getDestinationForSource(ranges, 99)).toEqual(51);
        });
    });
});