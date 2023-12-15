import { describe, expect, test } from '@jest/globals';
import { determineAscii, executeHashAlgorithm, Box } from './1.logic';

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

    describe(`Box`, () => {
        describe(`indexOfLensWithLabel()`, () => {
            test(`should return -1 for an empty box`, () => {
                const box = new Box(0);
                expect(box.indexOfLensWithLabel('ab 1')).toBe(-1);
            });

            test(`should return -1 for a box with a different label`, () => {
                const box = new Box(0);
                box.addLabel('ab 1');
                expect(box.indexOfLensWithLabel('cd 2')).toBe(-1);
            });

            test(`should return 0 for a box with a matching label`, () => {
                const box = new Box(0);
                box.addLabel('ab 1');
                expect(box.indexOfLensWithLabel('ab 1')).toBe(0);
            });

            test(`should return 0 for a box with a matching label but different focal length`, () => {
                const box = new Box(0);
                box.addLabel('ab 1');
                expect(box.indexOfLensWithLabel('ab 2')).toBe(0);
            });
        });

        describe(`containsLabel()`, () => {
            test(`should return false for an empty box`, () => {
                const box = new Box(0);
                expect(box.containsLabel('ab 1')).toBe(false);
            });

            test(`should return false for a box with a different label`, () => {
                const box = new Box(0);
                box.addLabel('ab 1');
                expect(box.containsLabel('cd 2')).toBe(false);
            });

            test(`should return true for a box with a matching label`, () => {
                const box = new Box(0);
                box.addLabel('ab 1');
                expect(box.containsLabel('ab 1')).toBe(true);
            });

            test(`should return true for a box with a matching label but different focal length`, () => {
                const box = new Box(0);
                box.addLabel('ab 1');
                expect(box.containsLabel('ab 2')).toBe(true);
            });
        });

        describe(`addLabel()`, () => {
            test(`should add a label to an empty box`, () => {
                const box = new Box(0);
                box.addLabel('ab 1');
                expect(box.indexOfLensWithLabel('ab 1')).toEqual(0);
            });

            test(`should add a label to a box with a different label`, () => {
                const box = new Box(0);
                box.addLabel('ab 1');
                box.addLabel('cd 2');
                expect(box.indexOfLensWithLabel('ab 1')).toEqual(0);
                expect(box.indexOfLensWithLabel('cd 2')).toEqual(1);
            });

            test(`should replace a label in a box with a matching label`, () => {
                const box = new Box(0);
                box.addLabel('ab 1');
                box.addLabel('ab 2');
                expect(box.indexOfLensWithLabel('ab 2')).toEqual(0);
                expect(box.lenses.length).toEqual(1);
            });

            test(`should add a label to a non-empty box`, () => {
                const box = new Box(0);
                box.addLabel('ab 1');
                box.addLabel('cd 2');
                box.addLabel('ef 3');
                expect(box.indexOfLensWithLabel('ab 1')).toEqual(0);
                expect(box.indexOfLensWithLabel('cd 2')).toEqual(1);
                expect(box.indexOfLensWithLabel('ef 3')).toEqual(2);
            });
        });

        describe(`removeLabel()`, () => {
            test(`should remove a label from an empty box`, () => {
                const box = new Box(0);
                box.removeLabel('ab 1');
                expect(box.indexOfLensWithLabel('ab 1')).toEqual(-1);
            });

            test(`should remove a label from a box with a different label`, () => {
                const box = new Box(0);
                box.addLabel('ab 1');
                box.removeLabel('cd 2');
                expect(box.indexOfLensWithLabel('ab 1')).toEqual(0);
                expect(box.indexOfLensWithLabel('cd 2')).toEqual(-1);
            });

            test(`should remove a label from a box with a matching label`, () => {
                const box = new Box(0);
                box.addLabel('ab 1');
                box.removeLabel('ab 1');
                expect(box.indexOfLensWithLabel('ab 1')).toEqual(-1);
            });

            test(`should remove a label from a box with a matching label but different focal length`, () => {
                const box = new Box(0);
                box.addLabel('ab 1');
                box.removeLabel('ab 2');
                expect(box.indexOfLensWithLabel('ab 2')).toEqual(-1);
            });

            test(`should remove a label from a non-empty box`, () => {
                const box = new Box(0);
                box.addLabel('ab 1');
                box.addLabel('cd 2');
                box.addLabel('ef 3');
                box.removeLabel('cd 2');
                expect(box.indexOfLensWithLabel('ab 1')).toEqual(0);
                expect(box.indexOfLensWithLabel('cd 2')).toEqual(-1);
                expect(box.indexOfLensWithLabel('ef 3')).toEqual(1);
            });
        });

        describe(`calculateFocusingPower()`, () => {
            test(`should return 5 for the first example`, () => {
                const box = new Box(0);
                box.addLabel('rn 1');
                box.addLabel('cm 2');
                expect(box.calculateFocusingPower()).toBe(5);    
            });

            test(`should return 140 for the second example`, () => {
                const box = new Box(3);
                box.addLabel('ot 7');
                box.addLabel('ab 5');
                box.addLabel('pc 6');
                expect(box.calculateFocusingPower()).toBe(140);    
            });
        });
    });
});