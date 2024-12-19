import { describe, expect, test } from '@jest/globals';
import { calculateLCM } from '../math/lcm';

describe(`calculateLCM`, () => {
    test(`should return the correct LCM`, () => {
        const result = calculateLCM([12, 18]);
        expect(result).toBe(36);
    });
});