import { describe, expect, test } from '@jest/globals';
import { determinePossibleValidArrangements, determineValidity, determinePossibleConfigurations, parseSprings } from './2.logic';

describe('Day 12 - Part 2', () => {
    describe('determinePossibleValidArrangements', () => {
        test(`should return 1 for '???.### 1,1,3'`, () => {
            expect(determinePossibleValidArrangements('???.### 1,1,3')).toBe(1);
        });

        test(`should return 16384 for '.??..??...?##. 1,1,3'`, () => {
            expect(determinePossibleValidArrangements('.??..??...?##. 1,1,3')).toBe(16384);
        });

        // test(`should return 1 for '?#?#?#?#?#?#?#? 1,3,1,6'`, () => {
        //     expect(determinePossibleValidArrangements('?#?#?#?#?#?#?#? 1,3,1,6')).toBe(1);
        // });

        // test(`should return 16 for '????.#...#... 4,1,1'`, () => {
        //     expect(determinePossibleValidArrangements('????.#...#... 4,1,1')).toBe(16);
        // });

        // test(`should return 2500 for '????.######..#####. 1,6,5'`, () => {
        //     expect(determinePossibleValidArrangements('????.######..#####. 1,6,5')).toBe(2500);
        // });

        // test(`should return 506250 for '?###???????? 3,2,1'`, () => {
        //     expect(determinePossibleValidArrangements('?###???????? 3,2,1')).toBe(506250);
        // });
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

    describe(`parseSprings`, () => {
        test(`should return { springs: '###############', arrangements: [3, 3, 3, 3, 3] } for '### 3'`, () => {
            expect(parseSprings('### 3')).toEqual({ springs: '###?###?###?###?###', arrangements: [3, 3, 3, 3, 3] });
        });
    });
});
