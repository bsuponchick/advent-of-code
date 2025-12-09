import { describe, expect, test } from '@jest/globals';
import { calculateAreaBetweenCoordinates } from './9.1.logic';

describe('Day 9 - Part 1', () => {
    describe(`When the calculateAreaBetweenCoordinates function is called...`, () => {
        test(`Should return 6 with { x: 7, y: 3} and { x: 2, y: 3}`, () => {
            expect(calculateAreaBetweenCoordinates({ x: 7, y: 3 }, { x: 2, y: 3 })).toBe(6);
        });

        test(`Should return 24 with { x: 2, y: 5} and { x: 9, y: 7}`, () => {
            expect(calculateAreaBetweenCoordinates({ x: 2, y: 5 }, { x: 9, y: 7 })).toBe(24);
        });

        test(`Should return 35 with { x: 7, y: 1 } and { x: 11, y: 7} `, () => {
            expect(calculateAreaBetweenCoordinates({ x: 7, y: 1 }, { x: 11, y: 7 })).toBe(35);
        });

        test(`Should return 50 with { x: 2, y: 5 } and { x: 11, y: 1 } `, () => {
            expect(calculateAreaBetweenCoordinates({ x: 2, y: 5 }, { x: 11, y: 1 })).toBe(50);
        });
    });
});