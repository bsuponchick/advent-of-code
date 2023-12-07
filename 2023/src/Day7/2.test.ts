import { describe, expect, test } from '@jest/globals';
import { Type, determineType, HandComparator, Hand } from './2.logic';

describe('Day 7 - Part 2', () => {
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

        test(`should return FiveOfAKind when cards are AAAJJ`, () => {
            expect(determineType('AAAJJ')).toEqual(Type.FiveOfAKind);
        });

        test(`should return FourOfAKind when cards are AAAJK`, () => {
            expect(determineType('AAAJK')).toEqual(Type.FourOfAKind);
        });

        test(`should return FullHouse when cards are KKAAJ`, () => {
            expect(determineType('KKAAJ')).toEqual(Type.FullHouse);
        });

        test(`should return ThreeOfAKind when cards are AAJ23`, () => {
            expect(determineType('AAJ23')).toEqual(Type.ThreeOfAKind);
        });

        test(`should return OnePair when cards are AKQJT`, () => {
            expect(determineType('AKQJT')).toEqual(Type.OnePair);
        });

        test(`should return OnePair when cards are 32T3K`, () => {
            expect(determineType('32T3K')).toEqual(Type.OnePair);
        });
        
        test(`should return TwoPairs when cards are KK677`, () => {
            expect(determineType('KK677')).toEqual(Type.TwoPairs);
        });

        test(`should return FourOfAKind when cards are T55J5`, () => {
            expect(determineType('T55J5')).toEqual(Type.FourOfAKind);
        });

        test(`should return FourOfAKind when cards are KTJJT`, () => {
            expect(determineType('KTJJT')).toEqual(Type.FourOfAKind);
        });

        test(`should return FourOfAKind when cards are QQQJA`, () => {
            expect(determineType('QQQJA')).toEqual(Type.FourOfAKind);
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

        test(`should return 1 when a is AAAAA and b is KKKKK`, () => {
            expect(HandComparator(new Hand('AAAAA', 1), new Hand('KKKKK', 1))).toEqual(1);
        });

        test(`should return 1 when a is AAAAK and b is KKKKA`, () => {
            expect(HandComparator(new Hand('AAAAK', 1), new Hand('KKKKA', 1))).toEqual(1);
        });

        test(`should return -1 when a is KAAAA and b is AKKKK`, () => {
            expect(HandComparator(new Hand('KAAAA', 1), new Hand('AKKKK', 1))).toEqual(-1);
        });

        test(`should return 1 when a is AAAAJ and b is BBBBB`, () => {
            expect(HandComparator(new Hand('AAAAJ', 1), new Hand('BBBBB', 1))).toEqual(1);
        });

        test(`should return 1 when a is T55J5 and b is KK677`, () => {
            expect(HandComparator(new Hand('T55J5', 1), new Hand('KK677', 1))).toEqual(1);
        });

        test(`should return -1 when a is T55J5 and b is QQQJA`, () => {
            expect(HandComparator(new Hand('T55J5', 1), new Hand('QQQJA', 1))).toEqual(-1);
        });

        test(`should return -1 when a is T55J5 and b is QQQJA`, () => {
            expect(HandComparator(new Hand('QQQJA', 1), new Hand('KTJJT', 1))).toEqual(-1);
        });
    });
});