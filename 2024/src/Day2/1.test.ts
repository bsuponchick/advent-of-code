import { Report } from './1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 2 - Part 1', () => {
    describe('Report', () => {
        describe(`When determineIfSafe is called`, () => {
            test(`It should return true when all levels are decreasing by between 1 and 3.`, () => {
                const report = new Report([5, 4, 3, 2, 1]);

                expect(report.determineIfSafe()).toBe(true);
            });

            test(`It should return true when all levels are increasing by between 1 and 3.`, () => {
                const report = new Report([1, 2, 3, 4, 5]);

                expect(report.determineIfSafe()).toBe(true);
            });

            test(`It should return false when two adjacent numbers are the same.`, () => {
                const report = new Report([1, 2, 2, 4, 5]);

                expect(report.determineIfSafe()).toBe(false);
            });

            test(`It should return false when two adjacent numbers are more than 3 apart.`, () => {
                const report = new Report([1, 2, 6, 7, 8]);

                expect(report.determineIfSafe()).toBe(false);
            });

            test(`It should return false when two adjacent numbers are more than 3 apart.`, () => {
                const report = new Report([8, 7, 6, 2, 1]);

                expect(report.determineIfSafe()).toBe(false);
            });
        });
    });
});