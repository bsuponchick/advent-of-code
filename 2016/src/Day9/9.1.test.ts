import { describe, expect, test } from '@jest/globals';
import { Decompressor } from './9.1.logic';

describe('Day 9 - Part 1', () => {
    describe(`Decompressor...`, () => {
        describe(`When decompress is called...`, () => {
            test(`with "ADVENT", it should return "ADVENT"`, () => {
                expect(Decompressor.decompress('ADVENT')).toBe('ADVENT');
            });

            test(`with "A(1x5)BC", it should return "ABBBBBC"`, () => {
                expect(Decompressor.decompress('A(1x5)BC')).toBe('ABBBBBC');
            });

            test(`with "(3x3)XYZ", it should return "XYZXYZXYZ"`, () => {
                expect(Decompressor.decompress('(3x3)XYZ')).toBe('XYZXYZXYZ');
            });

            test(`with "A(2x2)BCD(2x2)EFG", it should return "ABCBCDEFEFG"`, () => {
                expect(Decompressor.decompress('A(2x2)BCD(2x2)EFG')).toBe('ABCBCDEFEFG');
            });

            test(`with "(6x1)(1x3)A", it should return "(1x3)A"`, () => {
                expect(Decompressor.decompress('(6x1)(1x3)A')).toBe('(1x3)A');
            });

            test(`with "X(8x2)(3x3)ABCY", it should return "X(3x3)ABC(3x3)ABCY"`, () => {
                expect(Decompressor.decompress('X(8x2)(3x3)ABCY')).toBe('X(3x3)ABC(3x3)ABCY');
            });
        });
    });
});