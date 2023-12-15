import { describe, expect, test } from '@jest/globals';
import { determineAscii, executeHashAlgorithm } from './1.logic';

describe('Day 15 - Part 1', () => {
    describe(`determineAscii()`, () => {
        test(`should return 72 for H`, () => {
            expect(determineAscii('H')).toBe(72);
        });
    });

    describe(`executeHashAlgorithm()`, () => {
        test(`should return 52 for 'HASH'`, () => {
            expect(executeHashAlgorithm('HASH')).toBe(52);
        });

        test(`should return 30 for 'rn=1'`, () => {    
            expect(executeHashAlgorithm('rn=1')).toBe(30);
        });

        test(`should return 253 for 'cm-'`, () => {
            expect(executeHashAlgorithm('cm-')).toBe(253);
        });

        test(`should return 97 for 'qp=3'`, () => {
            expect(executeHashAlgorithm('qp=3')).toBe(97);
        });

        test(`should return 47 for 'cm=2'`, () => {
            expect(executeHashAlgorithm('cm=2')).toBe(47);
        });

        test(`should return 14 for 'qp-'`, () => {
            expect(executeHashAlgorithm('qp-')).toBe(14);
        });

        test(`should return 180 for 'pc=4'`, () => {
            expect(executeHashAlgorithm('pc=4')).toBe(180);
        });

        test(`should return 9 for 'ot=9`, () => {
            expect(executeHashAlgorithm('ot=9')).toBe(9);
        });

        test(`should return 197 for 'ab=5'`, () => {
            expect(executeHashAlgorithm('ab=5')).toBe(197);
        });

        test(`should return 48 for 'pc-'`, () => {
            expect(executeHashAlgorithm('pc-')).toBe(48);
        });

        test(`should return 214 for 'pc=6'`, () => {
            expect(executeHashAlgorithm('pc=6')).toBe(214);
        });

        test(`should return 231 for 'ot=7'`, () => {
            expect(executeHashAlgorithm('ot=7')).toBe(231);
        });
    });
});