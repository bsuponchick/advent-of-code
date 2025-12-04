import { describe, expect, test } from '@jest/globals';
import { calculateGCD } from '../math/gcd';

describe(`calculateGCD`, () => {
    test(`should return the correct GCD`, () => {
        const result = calculateGCD([12, 18]);
        expect(result).toBe(6);
    });
});