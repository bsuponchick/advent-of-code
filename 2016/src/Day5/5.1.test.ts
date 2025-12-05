import { describe, expect, test } from '@jest/globals';
import { findPassword } from './5.1.logic';

describe('Day 5 - Part 1', () => {
    describe(`When the findPassword function is called...`, () => {
        test(`It should return 18f47a30 for the input abc`, () => {
            expect(findPassword('abc')).toBe('18f47a30');
        });
    });
});