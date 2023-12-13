import { describe, expect, test } from '@jest/globals';
import { determineHorizontalLineOfReflection, determineVerticalLineOfReflection, getColumnsAsRows, determineHorizontalLineOfReflectionIfSmudgeExists } from './2.logic';

describe('Day 13 - Part 2', () => {
    describe('determineHorizontalLineOfReflection', () => {
        test(`should return 4 for the horizontal sample pattern.`, () => {
            const pattern = [
                '#...##..#',
                '#....#..#',
                '..##..###',
                '#####.##.',
                '#####.##.',
                '..##..###',
                '#....#..#'
            ];

            const result = determineHorizontalLineOfReflection(pattern);
            expect(result).toEqual(4);
        });

        test(`should return -1 for the vertical sample pattern.`, () => {
            const pattern = [
                '#.##..##.',
                '..#.##.#.',
                '##......#',
                '##......#',
                '..#.##.#.',
                '..##..##.',
                '#.#.##.#.'
            ];

            const result = determineHorizontalLineOfReflection(pattern);
            expect(result).toEqual(-1);
        });
    });

    describe(`determineHorizontalLineOfReflectionIfSmudgeExists`, () => {
        test(`should return 3 for the horizontal sample pattern.`, () => {
            const pattern = [
                '#...##..#',
                '#....#..#',
                '..##..###',
                '#####.##.',
                '#####.##.',
                '..##..###',
                '#....#..#'
            ];

            const result = determineHorizontalLineOfReflectionIfSmudgeExists(pattern);
            expect(result).toEqual(1);
        });
    });

    describe('determineVerticalLineOfReflection', () => {
        test(`should return -1 for the horizontal sample pattern.`, () => {
            const pattern = [
                '#...##..#',
                '#....#..#',
                '..##..###',
                '#####.##.',
                '#####.##.',
                '..##..###',
                '#....#..#'
            ];

            const result = determineVerticalLineOfReflection(pattern);
            expect(result).toEqual(-1);
        });

        test(`should return 5 for the vertical sample pattern.`, () => {
            const pattern = [
                '#.##..##.',
                '..#.##.#.',
                '##......#',
                '##......#',
                '..#.##.#.',
                '..##..##.',
                '#.#.##.#.'
            ];

            const result = determineVerticalLineOfReflection(pattern);
            expect(result).toEqual(5);
        });

        test(`should return 1 for the vertical sample pattern.`, () => {
            const pattern = [
                '###....##....',
                '####..#..#..#',
                '..###.####.##',
                '..#..######..',
                '...#.######.#',
                '#####.#.##.##',
                '##.#..#..#..#',
                '##....####...',
                '....#......#.',
                '.....#.##.#..',
                '##...##..##..',
                '...##.#..#.##',
                '##..###..###.'
            ];

            const result = determineVerticalLineOfReflection(pattern);
            expect(result).toEqual(1);
        });
    });

    describe(`getColumnsAsRows`, () => {
        test(`should return the columns as rows for the sample pattern.`, () => {
            const pattern = [
                '#...##..#',
                '#....#..#',
                '..##..###',
                '#####.##.',
                '#####.##.',
                '..##..###',
                '#....#..#'
            ];

            const result = getColumnsAsRows(pattern);
            expect(result).toEqual([
                '##.##.#',
                '...##..',
                '..####.',
                '..####.',
                '#..##..',
                '##....#',
                '..####.',
                '..####.',
                '###..##'
            ]);
        });
    });
});
