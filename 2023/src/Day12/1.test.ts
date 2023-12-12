import { describe, expect, test } from '@jest/globals';
import { determinePossibleValidArrangements, determineValidity, determinePossibleConfigurations } from './1.logic';

describe('Day 12 - Part 1', () => {
    describe('determinePossibleValidArrangements', () => {
        test(`should return 1 for '???.### 1,1,3'`, () => {
            expect(determinePossibleValidArrangements('???.### 1,1,3')).toBe(1);
        });

        test(`test a thing`, () => {
            // const possibleConfigurations = determinePossibleConfigurations('??.????????????.????');
            const possibleValidArrangements = determinePossibleValidArrangements('??.????????????.???? 1,1,3,1,1,4');
        });
    });

    describe(`determineValidity`, () => {
        test(`should return true for '#.#.###' and [1,1,3]`, () => {
            expect(determineValidity('#.#.###', [1, 1, 3])).toBe(true);
        });

        test(`Should return true for '.#...#....###. and [1,1,3]`, () => {
            expect(determineValidity('.#...#....###.', [1,1,3])).toBe(true);
        });

        test(`should return true for '.#.###.#.######' and [1,3,1,6]`, () => {
            expect(determineValidity('.#.###.#.######', [1,3,1,6])).toBe(true);
        });

        test(`should return true for '####.#...#...' and [4,1,1]`, () => {
            expect(determineValidity('####.#...#...', [4,1,1])).toBe(true);
        });

        test(`should return true for '#....######..#####.' and [1,6,5]`, () => {
            expect(determineValidity('#....######..#####.', [1,6,5])).toBe(true);
        });

        test(`should return true for '.###.##....#' and [3,2,1]`, () => {
            expect(determineValidity('.###.##....#', [3,2,1])).toBe(true);
        });

        test(`should return false for '.....###' and [1,1,3]`, () => {
            expect(determineValidity('.....###', [1,1,3])).toBe(false);
        });

        test(`should return false for '.#...###' and [1,1,3]`, () => {
            expect(determineValidity('.#...###', [1,1,3])).toBe(false);
        });

        test(`should return false for '.##..###' and [1,1,3]`, () => {
            expect(determineValidity('.##..###', [1,1,3])).toBe(false);
        });

        test(`should return false for '#..#.###.#.#.#..####' and [1,1,3,1,1,4]`, () => {
            expect(determineValidity('#..#.###.#.#.#..####', [1,1,3,1,1,4])).toBe(false);
        });
    });

    describe(`determinePossibleConfigurations`, () => {
        test(`should return ['###'] for '###'`, () => {
            expect(determinePossibleConfigurations('###')).toEqual(['###']);
        });

        test(`should return ['###', '#.#'] for '#?#'`, () => {
            expect(determinePossibleConfigurations('#?#')).toEqual(expect.arrayContaining(['###', '#.#']));
        });

        test(`should return ["###.###", "##..###", "#.#.###", "#...###", ".##.###", ".#..###", "..#.###", "....###"] for '???.###'`, () => {
            const possibleConfigurations = determinePossibleConfigurations('???.###');
            expect(possibleConfigurations.length).toBe(8);
            expect(possibleConfigurations).toEqual(expect.arrayContaining(["###.###", "##..###", "#.#.###", "#...###", ".##.###", ".#..###", "..#.###", "....###"]));
        });
    });
});
