import { describe, expect, test } from '@jest/globals';
import { parseInstruction, determineBoundingBox } from './2.logic';

describe('Day 18 - Part 2', () => {
    // describe(`Block`, () => {
        
    // });

    describe(`parseInstruction`, () => {
        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#70c710)';
            const expected = {
                direction: 'R',
                distance: 461937,
                color: 'nil'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });

        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#0dc571)';
            const expected = {
                direction: 'D',
                distance: 56407,
                color: 'nil'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });

        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#5713f0)';
            const expected = {
                direction: 'R',
                distance: 356671,
                color: 'nil'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });

        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#d2c081)';
            const expected = {
                direction: 'D',
                distance: 863240,
                color: 'nil'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });

        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#59c680)';
            const expected = {
                direction: 'R',
                distance: 367720,
                color: 'nil'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });

        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#411b91)';
            const expected = {
                direction: 'D',
                distance: 266681,
                color: 'nil'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });

        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#8ceee2)';
            const expected = {
                direction: 'L',
                distance: 577262,
                color: 'nil'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });

        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#caa173)';
            const expected = {
                direction: 'U',
                distance: 829975,
                color: 'nil'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });

        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#1b58a2)';
            const expected = {
                direction: 'L',
                distance: 112010,
                color: 'nil'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });

        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#caa171)';
            const expected = {
                direction: 'D',
                distance: 829975,
                color: 'nil'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });

        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#7807d2)';
            const expected = {
                direction: 'L',
                distance: 491645,
                color: 'nil'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });

        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#a77fa3)';
            const expected = {
                direction: 'U',
                distance: 686074,
                color: 'nil'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });

        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#015232)';
            const expected = {
                direction: 'L',
                distance: 5411,
                color: 'nil'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });

        test(`should return the correct instruction`, () => {
            const instruction = 'D 3 (#7a21e3)';
            const expected = {
                direction: 'U',
                distance: 500254,
                color: 'nil'
            };

            expect(parseInstruction(instruction)).toEqual(expected);
        });
    });
});