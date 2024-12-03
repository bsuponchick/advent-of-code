import { findValidInstructions, extractNumbers } from './1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 3 - Part 1', () => {
    describe(`When findValidInstructions is called`, () => {
        test(`It should return an empty array when no valid instructions are found.`, () => {
            const instructions = 'add(1,2)';

            expect(findValidInstructions(instructions)).toEqual([]);
        });

        test(`It should return an array with a single valid instruction.`, () => {
            const instructions = 'mul(1,2)';

            expect(findValidInstructions(instructions)).toEqual(['mul(1,2)']);
        });

        test(`It should return an array with a single valid instruction.`, () => {
            const instructions = 'mul(1,2) add(1,2)';

            expect(findValidInstructions(instructions)).toEqual(['mul(1,2)']);
        });

        test(`It should return an array with multiple valid instructions.`, () => {
            const instructions = 'mul(123,234) add(1,2) mul(345,223)';

            expect(findValidInstructions(instructions)).toEqual(['mul(123,234)', 'mul(345,223)']);
        });
    });

    describe(`When extractNumbers is called`, () => {
        test(`It should return an array with two numbers.`, () => {
            const instruction = 'mul(1,2)';

            expect(extractNumbers(instruction)).toEqual([1, 2]);
        });

        test(`It should return an array with two numbers.`, () => {
            const instruction = 'mul(123,234)';

            expect(extractNumbers(instruction)).toEqual([123, 234]);
        });

        test(`It should return an array with two numbers.`, () => {
            const instruction = 'mul(345,223)';

            expect(extractNumbers(instruction)).toEqual([345, 223]);
        });
    });
});