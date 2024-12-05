import { Rule, PotentialUpdate, parseRule, parsePotentialUpdate } from './5.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 5 - Part 1', () => {
    describe('Rule', () => {
        test('should parse rule', () => {
            const rule = new Rule(1, 2);
            expect(rule.firstPageNumber).toBe(1);
            expect(rule.secondPageNumber).toBe(2);
        });
    });

    describe('PotentialUpdate', () => {
        describe(`When the constructor is called...`, () => {
            test('should parse potential update', () => {
                const potentialUpdate = new PotentialUpdate([1,2,3]);
                expect(potentialUpdate.pageNumbers).toEqual([1, 2, 3]);
            });
        });

        describe(`When getMiddlePageNumber is called...`, () => {
            test('should return the middle page number', () => {
                const potentialUpdate = parsePotentialUpdate('1,2,3');
                expect(potentialUpdate.getMiddlePageNumber()).toBe(2);
            });
        });

        describe(`When determineIfValid is called...`, () => {
            test('should return true when the potential update is valid', () => {
                const rules = [new Rule(1, 2)];
                const potentialUpdate = parsePotentialUpdate('1,2,3');
                expect(potentialUpdate.determineIfValid(rules)).toBe(true);
            });

            test('should return false when the potential update is invalid', () => {
                const rules = [new Rule(1, 2)];
                const potentialUpdate = parsePotentialUpdate('2,1,3');
                expect(potentialUpdate.determineIfValid(rules)).toBe(false);
            });

            test(`should return true when the potential update is valid with multiple rules`, () => {
                const rules = [new Rule(1, 2), new Rule(2, 3)];
                const potentialUpdate = parsePotentialUpdate('1,2,3');
                expect(potentialUpdate.determineIfValid(rules)).toBe(true);
            });

            test(`should return false when the potential update is invalid with multiple rules`, () => {
                const rules = [new Rule(1, 2), new Rule(2, 3)];
                const potentialUpdate = parsePotentialUpdate('1,3,2');
                expect(potentialUpdate.determineIfValid(rules)).toBe(false);
            });
        });
    });

    describe('parseRule', () => {
        test('should parse rule', () => {
            const rule = parseRule('1|2');
            expect(rule.firstPageNumber).toBe(1);
            expect(rule.secondPageNumber).toBe(2);
        });
    });

    describe('parsePotentialUpdate', () => {
        test('should parse potential update', () => {
            const potentialUpdate = parsePotentialUpdate('1,2,3');
            expect(potentialUpdate.pageNumbers).toEqual([1, 2, 3]);
        });
    });
});