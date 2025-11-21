import { describe, expect, test } from '@jest/globals';
import { subtract } from './4.2.logic';

describe('Day  - Part 2', () => {
    describe(`When the subtract function is called...`, () => {
        test(`with 1 and 2, it should return -1`, () => {
            expect(subtract(1, 2)).toBe(-1);
        });

        test(`with 2 and 3, it should return -1`, () => {
            expect(subtract(2, 3)).toBe(-1);
        });

        test(`with 3 and 4, it should return -1`, () => {
            expect(subtract(3, 4)).toBe(-1);
        });
    });
});