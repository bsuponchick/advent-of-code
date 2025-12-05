import { describe, expect, test } from '@jest/globals';
import { AbbaDetector, LineSegments } from './7.1.logic';

describe('Day 7 - Part 1', () => {
    describe(`AbbaDetector...`, () => {
        describe(`When isAbba is called...`, () => {
            test(`should return true if the input is an ABBA`, () => {
                expect(AbbaDetector.isAbba('abba')).toBe(true);
            });

            test(`should return false if the input is not an ABBA`, () => {
                expect(AbbaDetector.isAbba('abcd')).toBe(false);
            });

            test(`should return true if the line contains an ABBA`, () => {
                expect(AbbaDetector.isAbba('xxxabbayyy')).toBe(true);
            });

            test(`should return false if the input is all the same character`, () => {
                expect(AbbaDetector.isAbba('aaaa')).toBe(false);
            });
        });

        describe(`When parseLine is called...`, () => {
            test(`should parse the line correctly`, () => {
                const lineSegments = AbbaDetector.parseLine('abba[mnop]qrst');
                expect(lineSegments.hypernet).toEqual(['mnop']);
                expect(lineSegments.regular).toEqual(['abba', 'qrst']);
            });
        });

        describe(`When isTlsSupported is called...`, () => {
            test(`should return true if the line is supported`, () => {
                const lineSegments = AbbaDetector.parseLine('abba[mnop]qrst');
                expect(AbbaDetector.isTlsSupported(lineSegments)).toBe(true);
            });
        });

        test(`should return false if the line is not supported`, () => {
            const lineSegments = AbbaDetector.parseLine('abcd[bddb]xyyx');
            expect(AbbaDetector.isTlsSupported(lineSegments)).toBe(false);
        });
    });
});