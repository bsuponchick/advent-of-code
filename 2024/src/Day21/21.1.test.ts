import { NumericKeyPad, DirectionalKeypad } from './21.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 21 - Part 1', () => {
    describe(`NumericKeyPad`, () => {
        describe(`constructor`, () => {
            test(`should set the current character to the action node`, () => {
                const numericKeyPad = new NumericKeyPad();
                expect(numericKeyPad.currentCharacter).toBe('A');
            });
        });

        describe(`determineShortestPathForSequence`, () => {
            test(`should return the proper path given the sample input`, () => {
                const numericKeyPad = new NumericKeyPad();
                const paths = numericKeyPad.determineShortestPathsForSequence('029A');
                expect(paths[0].length).toEqual(12);
            });
        });
    });

    describe(`DirectionalKeypad`, () => {
        describe(`constructor`, () => {
            test(`should set the current character to the action node`, () => {
                const directionalKeypad = new DirectionalKeypad();
                expect(directionalKeypad.currentCharacter).toBe('A');
            });
        });

        describe(`determineShortestPathForSequence`, () => {
            test(`should return the proper path given the sample input`, () => {
                const directionalKeypad = new DirectionalKeypad();
                const paths = directionalKeypad.determineShortestPathsForSequence('<A^A>^^AvvvA');
                expect(paths[0].length).toEqual(28);
            });

            test('should return the proper path for the larger sample input', () => {
                const directionalKeypad = new DirectionalKeypad();
                const paths = directionalKeypad.determineShortestPathsForSequence('v<<A>>^A<A>AvA<^AA>A<vAAA>^A');
                expect(paths[0].length).toEqual(64);
            });
        });
    });
});