import { describe, expect, test } from '@jest/globals';
import { turnLeft, turnRight } from './1.2.logic';

describe('Day 1 - Part 2', () => {
    describe(`When the turnLeft function is called...`, () => {
        test(`It should return position 1, goals 0 when the start is 50 and the amount is less than 50`, () => {
            expect(turnLeft({ start: 50, amount: 49 })).toEqual({ position: 1, goals: 0 });
        });

        test(`It should return position 0, goals 1 when the start is 50 and the amount is 50`, () => {
            expect(turnLeft({ start: 50, amount: 50 })).toEqual({ position: 0, goals: 1 });
        });

        test(`It should return position 99, goals 1 when the start is 50 and the amount is 51`, () => {
            expect(turnLeft({ start: 50, amount: 51 })).toEqual({ position: 99, goals: 1 });
        });

        test(`It should return position 98, goals 1 when the start is 50 and the amount is 52`, () => {
            expect(turnLeft({ start: 50, amount: 52 })).toEqual({ position: 98, goals: 1 });
        });

        test(`It should return position 50, goals 1 when the start is 50 and the amount is 100`, () => {
            expect(turnLeft({ start: 50, amount: 100 })).toEqual({ position: 50, goals: 1 });
        });

        test(`It should return position 99, goals 1 when the start is 50 and the amount is 101`, () => {
            expect(turnLeft({ start: 50, amount: 101 })).toEqual({ position: 49, goals: 1 });
        });

        test(`It should return position 50, goals 10 when the start is 50 and the amount is 1000`, () => {
            expect(turnLeft({ start: 50, amount: 1000 })).toEqual({ position: 50, goals: 10 });
        });
    });

    describe(`When the turnRight function is called...`, () => {
        test(`It should return position 51, goals 0 when the start is 50 and the amount is less than 50`, () => {
            expect(turnRight({ start: 50, amount: 1 })).toEqual({ position: 51, goals: 0 });
        });

        test(`It should return position 99, goals 0 when the start is 50 and the amount is 49`, () => {
            expect(turnRight({ start: 50, amount: 49 })).toEqual({ position: 99, goals: 0 });
        });

        test(`It should return position 0, goals 1 when the start is 50 and the amount is 50`, () => {
            expect(turnRight({ start: 50, amount: 50 })).toEqual({ position: 0, goals: 1 });
        });

        test(`It should return position 1, goals 1 when the start is 50 and the amount is 51`, () => {
            expect(turnRight({ start: 50, amount: 51 })).toEqual({ position: 1, goals: 1 });
        });

        test(`It should return position 51, goals 1 when the start is 50 and the amount is 101`, () => {
            expect(turnRight({ start: 50, amount: 101 })).toEqual({ position: 51, goals: 1 });
        });

        test(`It should return position 50, goals 10 when the start is 50 and the amount is 1000`, () => {
            expect(turnRight({ start: 50, amount: 1000 })).toEqual({ position: 50, goals: 10 });
        });
    });

    describe(`When the test input is evaluated...`, () => {
        test(`It should return position 82, goals 1 when the start is 50 and the amount is 68`, () => {
            expect(turnLeft({ start: 50, amount: 68 })).toEqual({ position: 82, goals: 1 });
        });

        test(`It should return position 52, goals 0 when the start is 82 and the amount is 30`, () => {
            expect(turnLeft({ start: 82, amount: 30 })).toEqual({ position: 52, goals: 0 });
        });

        test(`It should return position 0, goals 1 when the start is 52 and the amount is 48`, () => {
            expect(turnRight({ start: 52, amount: 48 })).toEqual({ position: 0, goals: 1 });
        });

        test(`It should return position 95, goals 0 when the start is 0 and the amount is 5`, () => {
            expect(turnLeft({ start: 0, amount: 5 })).toEqual({ position: 95, goals: 0 });
        });

        test(`It should return position 55, goals 1 when the start is 95 and the amount is 60`, () => {
            expect(turnRight({ start: 95, amount: 60 })).toEqual({ position: 55, goals: 1 });
        });

        test(`It should return position 0, goals 1 when the start is 55 and the amount is 55`, () => {
            expect(turnLeft({ start: 55, amount: 55 })).toEqual({ position: 0, goals: 1 });
        });

        test(`It should return position 99, goals 0 when the start is 0 and the amount is 1`, () => {
            expect(turnLeft({ start: 0, amount: 1 })).toEqual({ position: 99, goals: 0 });
        });

        test(`It should return position 0, goals 1 when the start is 99 and the amount is 99`, () => {
            expect(turnLeft({ start: 99, amount: 99 })).toEqual({ position: 0, goals: 1 });
        });

        test(`It should return position 14, goals 0 when the start is 0 and the amount is 14`, () =>  {
            expect(turnRight({ start: 0, amount: 14 })).toEqual({ position: 14, goals: 0 });
        });

        test(`It should return position 32, goals 1 when the start is 14 and the amount is 82`, () => {
            expect(turnLeft({ start: 14, amount: 82 })).toEqual({ position: 32, goals: 1 });
        });
    });
});