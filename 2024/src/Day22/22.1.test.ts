import { mix, prune } from './22.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 22 - Part 1', () => {
    describe(`mix()`, () => {
        test(`Should return 37 when the secret is 42 and the value is 15`, () => {
            expect(mix(15, 42)).toBe(37);
        });
    });

    describe(`prune()`, () => {
        test(`Should return 16113920 when the secret is 100000000`, () => {
            expect(prune(100000000)).toBe(16113920);
        });
    });
});