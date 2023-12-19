import { describe, expect, test } from '@jest/globals';
import { parseInstruction, determineBoundingBox } from './1.logic';

describe('Day 18 - Part 1', () => {
    // describe(`Block`, () => {
        
    // });

    describe(`parseInstruction`, () => {
        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#ff0000)';
            const expected = {
                direction: 'D',
                distance: 3,
                color: '#ff0000'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });
    });

    describe(`determineBoundingBox`, () => {
        test(`should return the correct min/max extents for a 4x4 box`, () => {
            const instructions = [
                'U 3 (#ff0000)',
                'R 3 (#ff0000)',
                'D 3 (#ff0000)',
                'L 3 (#ff0000)'
            ];

            const expected = {
                height: 4,
                width: 4,
                minX: 0,
                maxX: 3,
                minY: 0,
                maxY: 3,
                startingPoint: {
                    x: 0,
                    y: 0
                }
            };

            expect(determineBoundingBox(instructions)).toEqual(expected);
        });

        test(`should return the correct min/max extents for a 6x6 box with negatives`, () => {
            const instructions = [
                'U 3 (#ff0000)',
                'R 3 (#ff0000)',
                'D 6 (#ff0000)',
                'L 6 (#ff0000)',
                'U 3 (#ff0000)',
                'R 3 (#ff0000)',
            ];

            const expected = {
                height: 7,
                width: 7,
                minX: -3,
                maxX: 3,
                minY: -3,
                maxY: 3,
                startingPoint: {
                    x: 3,
                    y: 3
                }
            };

            expect(determineBoundingBox(instructions)).toEqual(expected);
        });

        test(`should result in the correct min/max extents for the sample input`, () => {
            const input = [
                'R 6 (#70c710)',
                'D 5 (#0dc571)',
                'L 2 (#5713f0)',
                'D 2 (#d2c081)',
                'R 2 (#59c680)',
                'D 2 (#411b91)',
                'L 5 (#8ceee2)',
                'U 2 (#caa173)',
                'L 1 (#1b58a2)',
                'U 2 (#caa171)',
                'R 2 (#7807d2)',
                'U 3 (#a77fa3)',
                'L 2 (#015232)',
                'U 2 (#7a21e3)'
            ];

            const expected = {
                width: 7,
                height: 10,
                minX: 0,
                maxX: 6,
                minY: -9,
                maxY: 0,
                startingPoint: {
                    x: 0,
                    y: 0
                }
            };

            expect(determineBoundingBox(input)).toEqual(expected);
        });
    });
});