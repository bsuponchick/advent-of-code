import { describe, expect, test } from '@jest/globals';
import { AbaDetector, LineSegments } from './7.2.logic';

describe('Day 7 - Part 2', () => {
    describe(`AbaDetector...`, () => {
        describe(`When getAbas is called...`, () => {
            test(`should return an array of ABA decisions if the input is an ABA`, () => {
                expect(AbaDetector.getAbas('aba')).toEqual([{ isAba: true, a: 'a', b: 'b' }]);
            });

            test(`should return an empty array if the input is not an ABA`, () => {
                expect(AbaDetector.getAbas('abd')).toEqual([]);
            });

            test(`should return an array of ABA decisions if the line contains an ABA`, () => {
                expect(AbaDetector.getAbas('xxxabayyy')).toEqual([{ isAba: true, a: 'a', b: 'b' }]);
            });

            test(`should return an empty array if the input is all the same character`, () => {
                expect(AbaDetector.getAbas('aaaa')).toEqual([]);
            });
        });

        describe(`When getBabs is called...`, () => {
            test(`should return true if the input is an BAB`, () => {
                expect(AbaDetector.getBabs('bab')).toEqual([{ isBab: true, a: 'a', b: 'b' }]);
            });

            test(`should return an empty array if the input is not a BAB`, () => {
                expect(AbaDetector.getBabs('bdab')).toEqual([]);
            });

            test(`should return an array of BAB decisions if the line contains an BAB`, () => {
                expect(AbaDetector.getBabs('xxxbabyyy')).toEqual([{ isBab: true, a: 'a', b: 'b' }]);
            });

            test(`should return an empty array if the input is all the same character`, () => {
                expect(AbaDetector.getBabs('aaaa')).toEqual([]);
            });
        });

        describe(`When parseLine is called...`, () => {
            test(`should parse the line correctly`, () => {
                const lineSegments = AbaDetector.parseLine('abba[mnop]qrst');
                expect(lineSegments.hypernet).toEqual(['mnop']);
                expect(lineSegments.supernet).toEqual(['abba', 'qrst']);
            });
        });

        describe(`When isSslSupported is called...`, () => {
            // test(`should return false if the line is not supported`, () => {
            //     const lineSegments = AbaDetector.parseLine('abba[mnop]qrst');
            //     expect(AbaDetector.isSslSupported(lineSegments)).toBe(false);
            // });

            // test(`should return true if the line is supported`, () => {
            //     const lineSegments = AbaDetector.parseLine('aba[bab]xyyx');
            //     expect(AbaDetector.isSslSupported(lineSegments)).toBe(true);
            // });

            // test(`should return true for aba[bab]xyz`, () => {
            //     const lineSegments = AbaDetector.parseLine('aba[bab]xyz');
            //     expect(AbaDetector.isSslSupported(lineSegments)).toBe(true);
            // });

            // test(`should return false for xyx[xyx]xyx`, () => {
            //     const lineSegments = AbaDetector.parseLine('xyx[xyx]xyx');
            //     expect(AbaDetector.isSslSupported(lineSegments)).toBe(false);
            // });

            // test(`should return true for aaa[kek]eke`, () => {
            //     const lineSegments = AbaDetector.parseLine('aaa[kek]eke');
            //     expect(AbaDetector.isSslSupported(lineSegments)).toBe(true);
            // });

            test(`should return true for zazbz[bzb]cdb`, () => {
                const lineSegments = AbaDetector.parseLine('zazbz[bzb]cdb');
                expect(AbaDetector.isSslSupported(lineSegments)).toBe(true);
            });
        });
    });
});