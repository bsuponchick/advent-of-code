import { describe, expect, test } from '@jest/globals';
import { Decompressor } from './9.2.logic';

describe('Day 9 - Part 1', () => {
    describe(`Decompressor...`, () => {
        describe(`When decompress is called...`, () => {
            test(`with "(3x3)XYZ", it should return 9`, () => {
                expect(Decompressor.decompress('(3x3)XYZ')).toBe(9);
            });

            test(`with "X(8x2)(3x3)ABCY", it should return 20`, () => {
                expect(Decompressor.decompress('X(8x2)(3x3)ABCY')).toBe(20);
            });

            test(`with "(27x12)(20x12)(13x14)(7x10)(1x12)A", it should return 241920`, () => {
                expect(Decompressor.decompress('(27x12)(20x12)(13x14)(7x10)(1x12)A')).toBe(241920);
            });

            test(`with "(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN", it should return 445`, () => {
                expect(Decompressor.decompress('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN')).toBe(445);
            });
        });
    });
});