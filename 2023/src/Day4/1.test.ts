import { describe, expect, test } from '@jest/globals';
import { Scratchcard } from './1.logic';

describe('Day 4 - Part 1', () => {
    describe(`Scratchcard`, () => {
        test(`calculatePoints should return 0 when no numbers match`, () => {
            const scratchcard = new Scratchcard([1, 2, 3], [4, 5, 6]);

            expect(scratchcard.calculatePoints()).toEqual(0);
        });

        test(`calculatePoints should return 1 when one number matches`, () => {
            const scratchcard = new Scratchcard([1, 2, 3], [1, 5, 6]);

            expect(scratchcard.calculatePoints()).toEqual(1);
        });

        test(`calculatePoints should return 2 when two numbers match`, () => {
            const scratchcard = new Scratchcard([1, 2, 3], [1, 2, 6]);

            expect(scratchcard.calculatePoints()).toEqual(2);
        });

        test(`calculatePoints should return 4 when three numbers match`, () => {
            const scratchcard = new Scratchcard([1, 2, 3], [1, 2, 3]);

            expect(scratchcard.calculatePoints()).toEqual(4);
        });
    });
});