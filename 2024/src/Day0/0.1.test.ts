import { describe, expect, test } from '@jest/globals';
import { add } from './0.1.logic';

describe('Day 0 - Part 1', () => {
    describe(`When the add function is called...`, () => {
        test(`with 1 and 2, it should return 3`, () => {
            expect(add(1, 2)).toBe(3);
        });

        test(`with 2 and 3, it should return 5`, () => {
            expect(add(2, 3)).toBe(5);
        });

        test(`with 3 and 4, it should return 7`, () => {
            expect(add(3, 4)).toBe(7);
        });
    });
});