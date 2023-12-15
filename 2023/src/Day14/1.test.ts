import { describe, expect, test } from '@jest/globals';
import { tiltNorth, tiltSouth, tiltEast, tiltWest, executeSpinCycle, parseMap, generateMapString, calculateLoad } from './1.logic';

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

    describe(`tiltSouth`, () => {
        test(`should return ['.', '.', '.', 'O'] when given ['O', '.', '.', '.']`, ( ) => {
            const input = ['.', '.', '.', 'O'];
            const map = parseMap(input);
            tiltSouth(map);
            
            expect(generateMapString(map)).toEqual(`.\n.\n.\nO\n`);
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
                '.....#....',
                '....#....#',
                '...O.##...',
                '...#......',
                'O.O....O#O',
                'O.#..O.#.#',
                'O....#....',
                'OO....OO..',
                '#OO..###..',
                '#OO.O#...O'
            ].join('\n').concat('\n');

            const map = parseMap(input);
            tiltSouth(map);

            expect(generateMapString(map)).toEqual(expectation);
        });
    });

    describe(`tiltEast`, () => {
        test(`should return ['....O'] when given ['O....']`, ( ) => {
            const input = ['O....'];
            const map = parseMap(input);
            tiltEast(map);
            
            expect(generateMapString(map)).toEqual(`....O\n`);
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
                '....O#....',
                '.OOO#....#',
                '.....##...',
                '.OO#....OO',
                '......OO#.',
                '.O#...O#.#',
                '....O#..OO',
                '.........O',
                '#....###..',
                '#..OO#....'
            ].join('\n').concat('\n');

            const map = parseMap(input);
            tiltEast(map);
            
            expect(generateMapString(map)).toEqual(expectation);
        });
    });

    describe(`tiltWest`, () => {
        test(`should return ['O....'] when given ['....O']`, ( ) => {
            const input = ['....O'];
            const map = parseMap(input);
            tiltWest(map);
            
            expect(generateMapString(map)).toEqual(`O....\n`);
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
                'O....#....',
                'OOO.#....#',
                '.....##...',
                'OO.#OO....',
                'OO......#.',
                'O.#O...#.#',
                'O....#OO..',
                'O.........',
                '#....###..',
                '#OO..#....'
            ].join('\n').concat('\n');

            const map = parseMap(input);
            tiltWest(map);
            
            expect(generateMapString(map)).toEqual(expectation);
        });
    });

    describe(`executeSpinCycle`, () => {
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
                '.....#....',
                '....#...O#',
                '...OO##...',
                '.OO#......',
                '.....OOO#.',
                '.O#...O#.#',
                '....O#....',
                '......OOOO',
                '#...O###..',
                '#..OO#....'
            ];

            const map = parseMap(input);
            executeSpinCycle(map);

            expect(generateMapString(map)).toEqual(expectation.join('\n').concat('\n'));
        });

        test(`should return the correct result after 2 spin cycles when given the example input`, () => {
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
                '.....#....',
                '....#...O#',
                '.....##...',
                '..O#......',
                '.....OOO#.',
                '.O#...O#.#',
                '....O#...O',
                '.......OOO',
                '#..OO###..',
                '#.OOO#...O'
            ];

            const map = parseMap(input);
            executeSpinCycle(map);
            executeSpinCycle(map);

            expect(generateMapString(map)).toEqual(expectation.join('\n').concat('\n'));
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
