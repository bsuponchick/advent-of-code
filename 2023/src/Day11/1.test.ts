import { describe, expect, test } from '@jest/globals';
import { expandMap } from './1.logic';

describe('Day 11 - Part 1', () => {
    describe(`expandMap`, () => {
        test(`should expand the map`, () => {
            const map = [
                '...#......',
                '.......#..',
                '#.........',
                '..........',
                '......#...',
                '.#........',
                '.........#',
                '..........',
                '.......#..',
                '#...#.....',
            ];

            const expandedMap = expandMap(map);
            expect(expandedMap.length).toBe(12);
            expect(expandedMap[0]).toBe('....#........');
            expect(expandedMap[1]).toBe('.........#...');
            expect(expandedMap[2]).toBe('#............');
            expect(expandedMap[3]).toBe('.............');
            expect(expandedMap[4]).toBe('.............');
            expect(expandedMap[5]).toBe('........#....');
            expect(expandedMap[6]).toBe('.#...........');
            expect(expandedMap[7]).toBe('............#');
            expect(expandedMap[8]).toBe('.............');
            expect(expandedMap[9]).toBe('.............');
            expect(expandedMap[10]).toBe('.........#...');
            expect(expandedMap[11]).toBe('#....#.......');
        });
    });
});
