import { describe, expect, test } from '@jest/globals';
import { determineHorizontalLineOfReflection, getColumnsAsRows } from './1.logic';

describe('Day 13 - Part 1', () => {
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
