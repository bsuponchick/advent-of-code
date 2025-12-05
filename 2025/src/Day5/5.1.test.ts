import { describe, expect, test } from '@jest/globals';
import { FreshnessDetector } from './5.1.logic';

describe('Day 5 - Part 1', () => {
    describe(`FreshnessDetector...`, () => {
        describe(`When isFresh is called...`, () => {
            test(`should return true if the value is in the range`, () => {
                expect(FreshnessDetector.isFresh(1, [{ start: 1, end: 10 }])).toBe(true);
            });

            test(`should return false if the value is not in the range`, () => {
                expect(FreshnessDetector.isFresh(11, [{ start: 1, end: 10 }])).toBe(false);
            });

            test(`should return true if the value is in a range that isn't the first range`, () => {
                expect(FreshnessDetector.isFresh(12, [{ start: 1, end: 10 }, { start: 11, end: 20 }])).toBe(true);
            });
        });
    });
});