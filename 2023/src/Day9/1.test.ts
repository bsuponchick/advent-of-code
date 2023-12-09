import { describe, expect, test } from '@jest/globals';
import { generateNextSequence, determineNextValue, extrapolateNextValue } from './1.logic';

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

        test(`should return 1 when the sequence is [1,1,1] and the value is 0`, () => {
            const sequence = [1,1,1];
            const nextValue = determineNextValue(sequence, 0);
            expect(nextValue).toEqual(1);
        });

        test(`should return 7 when the sequence is [2,3,4,5,6] and the value is 1`, () => {
            const sequence = [2,3,4,5,6];
            const nextValue = determineNextValue(sequence, 1);
            expect(nextValue).toEqual(7);
        });

        test(`should return 28 when the sequence is [1,3,6,10,15,21] and the value is 7`, () => {
            const sequence = [1,3,6,10,15,21];
            const nextValue = determineNextValue(sequence, 7);
            expect(nextValue).toEqual(28);
        });
    });

    describe(`extrapolateNextValue`, () => {
        test(`should return 0 when the input is [0,0,0]`, () => {
            const sequence = [0,0,0];
            const nextValue = extrapolateNextValue(sequence);
            expect(nextValue).toEqual(0);
        });

        test(`should return 1 when the input is [1,1,1]`, () => {
            const sequence = [1,1,1];
            const nextValue = extrapolateNextValue(sequence);
            expect(nextValue).toEqual(1);
        });

        test(`should return 7 when the input is [2,3,4,5,6]`, () => {
            const sequence = [2,3,4,5,6];
            const nextValue = extrapolateNextValue(sequence);
            expect(nextValue).toEqual(7);
        });

        test(`should return 28 when the input is [1,3,6,10,15,21]`, () => {
            const sequence = [1,3,6,10,15,21];
            const nextValue = extrapolateNextValue(sequence);
            expect(nextValue).toEqual(28);
        });
    });
});