import { describe, expect, test } from '@jest/globals';
import { findPassword } from './5.2.logic';

describe('Day 5 - Part 1', () => {
    describe(`When the findPassword function is called...`, () => {
        test(`It should return 05ace8e3 for the input abc`, () => {
            expect(findPassword('abc')).toBe('05ace8e3');
        });
    });
});