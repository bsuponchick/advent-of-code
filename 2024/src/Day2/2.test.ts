import { Report } from './2.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 2 - Part 2', () => {
    describe('Report', () => {
        describe(`When determineIfSafe is called`, () => {
            test(`It should return true when all levels are decreasing by between 1 and 3.`, () => {
                const report = new Report(0, [5, 4, 3, 2, 1]);

                expect(report.determineIfSafe()).toBe(true);
            });

            test(`It should return true when all levels are increasing by between 1 and 3.`, () => {
                const report = new Report(1, [1, 2, 3, 4, 5]);

                expect(report.determineIfSafe()).toBe(true);
            });

            test(`It should true false when two adjacent numbers are the same.`, () => {
                const report = new Report(2, [1, 2, 2, 4, 5]);

                expect(report.determineIfSafe()).toBe(true);
            });

            test(`It should true false when three adjacent numbers are the same.`, () => {
                const report = new Report(3, [1, 2, 2, 2, 4, 5]);

                expect(report.determineIfSafe()).toBe(false);
            });

            test(`It should return true when a single level is not safe.`, () => {  
                const report = new Report(4, [1, 2, 3, 7]);

                expect(report.determineIfSafe()).toBe(true);
            });

            test(`It should return true when a single level is not safe.`, () => {
                const report = new Report(5, [7, 3, 2, 1]);

                console.log(`Testing with first number being the one that needs removed.`);
                expect(report.determineIfSafe()).toBe(true);
            });

            test(`It should return true with the following test data.`, () => {
                const report = new Report(6, [6,4,7,8,10,11]);

                console.log(`Testing with first number being the one that needs removed.`);
                expect(report.determineIfSafe()).toBe(true);
            });

            test(`It should return false when two adjacent numbers are more than 3 apart.`, () => {
                const report = new Report(7, [1, 2, 6, 7, 8]);

                expect(report.determineIfSafe()).toBe(false);
            });

            test(`It should return false when two adjacent numbers are more than 3 apart.`, () => {
                const report = new Report(8, [8, 7, 6, 2, 1]);

                expect(report.determineIfSafe()).toBe(false);
            });
        });
    });
});