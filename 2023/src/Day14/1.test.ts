import { describe, expect, test } from '@jest/globals';
import { tiltNorth, parseMap, generateMapString, calculateLoad } from './1.logic';

describe('Day 13 - Part 1', () => {
    describe(`tiltNorth`, () => {
        test(`should return ['O', '.', '.', '.'] when given ['.', '.', '.', 'O']`, ( ) => {
            const input = ['O', '.', '.', '.'];
            const map = parseMap(input);
            tiltNorth(map);
            
            expect(generateMapString(map)).toEqual(`O\n.\n.\n.\n`);
        });

        test(`should return the correct result when given the example input`, () => {
            const input = [
                'O....#....',
                'O.OO#....#',
                '.....##...',
                'OO.#O....O',
                '.O.....O#.',
                'O.#..O.#.#',
                '..O..#O..O',
                '.......O..',
                '#....###..',
                '#OO..#....'
            ];

            const expectation = [
                'OOOO.#.O..',
                'OO..#....#',
                'OO..O##..O',
                'O..#.OO...',
                '........#.',
                '..#....#.#',
                '..O..#.O.O',
                '..O.......',
                '#....###..',
                '#....#....'
            ].join('\n').concat('\n');

            const map = parseMap(input);
            tiltNorth(map);

            expect(generateMapString(map)).toEqual(expectation);
        });
    });

    describe(`calculateLoad`, () => {
        test(`should return 0 when given an empty map`, () => {
            const input = [
                '.....'
            ];

            const map = parseMap(input);
            const result = calculateLoad(map);

            expect(result).toEqual(0);
        });

        test(`should return 1 when given a map with one round tile`, () => {
            const input = [
                'O....'
            ];

            const map = parseMap(input);
            const result = calculateLoad(map);

            expect(result).toEqual(1);
        });

        test(`should return 136 for the example input`, () => {
            const input = [
                'OOOO.#.O..',
                'OO..#....#',
                'OO..O##..O',
                'O..#.OO...',
                '........#.',
                '..#....#.#',
                '..O..#.O.O',
                '..O.......',
                '#....###..',
                '#....#....'
            ];

            const map = parseMap(input);
            const result = calculateLoad(map);

            expect(result).toEqual(136);
        });
    });
});
