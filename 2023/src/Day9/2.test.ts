import { describe, expect, test } from '@jest/globals';
import { generateNextSequence, determineNextValue, extrapolateNextValue } from './2.logic';

describe('Day 9 - Part 1', () => {
    describe(`generateNextSequence`, () => {
        test(`should return null if all numbers are 0`, () => {
            const sequence = [0, 0, 0, 0];
            const nextSequence = generateNextSequence(sequence);
            expect(nextSequence).toBeNull();
        });

        test(`should return [3, 3, 3, 3, 3] when the input is [0, 3, 6, 9, 12, 15]`, () => {
            const sequence = [0, 3, 6, 9, 12, 15];
            const nextSequence = generateNextSequence(sequence);
            expect(nextSequence).toEqual([3, 3, 3, 3, 3]);
        });

        test(`should return [2, 3, 4, 5, 6] when the input is [1,3,6,10,15,21]`, () => {
            const sequence = [1,3,6,10,15,21];
            const nextSequence = generateNextSequence(sequence);
            expect(nextSequence).toEqual([2, 3, 4, 5, 6]);
        });

        test(`should return [1,1,1,1] when the input is [2,3,4,5,6]`, () => {
            const sequence = [2, 3, 4, 5, 6];
            const nextSequence = generateNextSequence(sequence);
            expect(nextSequence).toEqual([1,1,1,1]);
        });
    });

    describe(`determineNextValue`, () => {
        test(`should return 0 when the sequence is [0,0,0] and the value is 0`, () => {
            const sequence = [0,0,0];
            const nextValue = determineNextValue(sequence, 0);
            expect(nextValue).toEqual(0);
        });

        test(`should return 2 when the sequence is [2,2,2] and the value is 0`, () => {
            const sequence = [2,2,2];
            const nextValue = determineNextValue(sequence, 0);
            expect(nextValue).toEqual(2);
        });

        test(`should return -2 when the sequence is [0,2,4,6] and the value is 2`, () => {
            const sequence = [0,2,4,6];
            const nextValue = determineNextValue(sequence, 2);
            expect(nextValue).toEqual(-2);
        });

        test(`should return 5 when the sequence is [3,3,5,9,15] and the value is -2`, () => {
            const sequence = [3,5,5,9,15];
            const nextValue = determineNextValue(sequence, -2);
            expect(nextValue).toEqual(5);
        });

        test(`should return 5 when the sequence is [10,13,16,21,30,45] and the value is 5`, () => {
            const sequence = [10,13,16,21,30,45];
            const nextValue = determineNextValue(sequence, 5);
            expect(nextValue).toEqual(5);
        });
    });

    describe(`extrapolateNextValue`, () => {
        // test(`should return 0 when the input is [0,0]`, () => {
        //     const sequence = [0,0];
        //     const nextValue = extrapolateNextValue(sequence);
        //     expect(nextValue).toEqual(0);
        // });

        // test(`should return 2 when the input is [2,2,2]`, () => {
        //     const sequence = [2,2,2];
        //     const nextValue = extrapolateNextValue(sequence);
        //     expect(nextValue).toEqual(2);
        // });

        // test(`should return -2 when the input is [0,2,4,6]`, () => {
        //     const sequence = [0,2,4,6];
        //     const nextValue = extrapolateNextValue(sequence);
        //     expect(nextValue).toEqual(-2);
        // });

        test(`should return 5 when the input is [3,3,5,9,15]`, () => {
            const sequence = [3,3,5,9,15];
            const nextValue = extrapolateNextValue(sequence);
            expect(nextValue).toEqual(5);
        });

        // test(`should return 5 when the input is [10,13,16,21,30,45]`, () => {
        //     const sequence = [10,13,16,21,30,45];
        //     const nextValue = extrapolateNextValue(sequence);
        //     expect(nextValue).toEqual(5);
        // });
    });
});