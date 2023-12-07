import { describe, expect, test } from '@jest/globals';
import { Type, determineType, HandComparator, Hand } from './1.logic';

describe('Day 7 - Part 1', () => {
    describe(`determineType`, () => {
        test(`should return FiveOfAKind when cards are 22222`, () => {
            expect(determineType('22222')).toEqual(Type.FiveOfAKind);
        });

        test(`should return FourOfAKind when cards are 22223`, () => {
            expect(determineType('22223')).toEqual(Type.FourOfAKind);
        });

        test(`should return FullHouse when cards are 22233`, () => {
            expect(determineType('22233')).toEqual(Type.FullHouse);
        });

        test(`should return ThreeOfAKind when cards are 22234`, () => {
            expect(determineType('22234')).toEqual(Type.ThreeOfAKind);
        });

        test(`should return TwoPairs when cards are 22334`, () => {
            expect(determineType('22334')).toEqual(Type.TwoPairs);
        });

        test(`should return OnePair when cards are 22345`, () => {
            expect(determineType('22345')).toEqual(Type.OnePair);
        });

        test(`should return HighCard when cards are 23456`, () => {
            expect(determineType('23456')).toEqual(Type.HighCard);
        });
    });

    describe(`HandComparator`, () => {
        test(`should return 1 when a is 22222 and b is 22223`, () => {
            expect(HandComparator(new Hand('22222', 1), new Hand('22223', 1))).toEqual(1);
        });

        test(`should return 1 when a is 22223 and b is 22233`, () => {
            expect(HandComparator(new Hand('22223', 1), new Hand('22233', 1))).toEqual(1);
        });

        test(`should return 1 when a is 22233 and b is 22334`, () => {
            expect(HandComparator(new Hand('22233', 1), new Hand('22334', 1))).toEqual(1);
        });

        test(`should return 1 when a is 22334 and b is 22345`, () => {
            expect(HandComparator(new Hand('22334', 1), new Hand('22345', 1))).toEqual(1);
        });

        test(`should return 1 when a is 22345 and b is 23456`, () => {
            expect(HandComparator(new Hand('22345', 1), new Hand('23456', 1))).toEqual(1);
        });

        test(`should return -1 when a is 22223 and b is 22222`, () => {
            expect(HandComparator(new Hand('22223', 1), new Hand('22222', 1))).toEqual(-1);
        });

        test(`should return -1 when a is 22233 and b is 22223`, () => {
            expect(HandComparator(new Hand('22233', 1), new Hand('22223', 1))).toEqual(-1);
        });

        test(`should return -1 when a is 22334 and b is 22233`, () => {
            expect(HandComparator(new Hand('22334', 1), new Hand('22233', 1))).toEqual(-1);
        });

        test(`should return -1 when a is 22345 and b is 22334`, () => {
            expect(HandComparator(new Hand('22345', 1), new Hand('22334', 1))).toEqual(-1);
        });

        test(`should return -1 when a is 23456 and b is 34567`, () => {
            expect(HandComparator(new Hand('23456', 1), new Hand('34567', 1))).toEqual(-1);
        });

        test(`should return 1 when a is AAAAA and b is BBBBB`, () => {
            expect(HandComparator(new Hand('AAAAA', 1), new Hand('BBBBB', 1))).toEqual(1);
        });

        test(`should return 1 when a is AAAAB and b is BBBBC`, () => {
            expect(HandComparator(new Hand('AAAAB', 1), new Hand('BBBBC', 1))).toEqual(1);
        });

        test(`should return -1 when a is BAAAA and b is ACCCC`, () => {
            expect(HandComparator(new Hand('BAAAA', 1), new Hand('ACCCC', 1))).toEqual(-1);
        });
    });
});