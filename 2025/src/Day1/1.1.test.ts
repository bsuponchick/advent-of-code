import { describe, expect, test } from '@jest/globals';
import { Lock } from './1.1.logic';

describe('Day 0 - Part 1', () => {
    describe(`Lock`, () => {
        describe(`Constructor`, () => {
            test(`should create a lock with the correct position, min, and max`, () => {
                const lock = new Lock({
                    position: 1,
                    min: 0,
                    max: 10,
                    goal: 0,
                });

                expect(lock.position).toBe(1);
                expect(lock.min).toBe(0);
                expect(lock.max).toBe(10);
            });
        });
    });

    describe(`turnLeft`, () => {
        test(`should turn the lock left by the given amount`, () => {
            const lock = new Lock({
                position: 1,
                min: 0,
                max: 10,
                goal: 0,
            });
            lock.turnLeft(2);
            expect(lock.position).toBe(10);
        });
    });

    describe(`turnRight`, () => {
        test(`should turn the lock right by the given amount`, () => {
            const lock = new Lock({
                position: 1,
                min: 0,
                max: 10,
                goal: 0,
            });
            lock.turnRight(2);
            expect(lock.position).toBe(3);
        });

        test(`should wrap around the lock if the position is greater than the max`, () => {
            const lock = new Lock({
                position: 10,
                min: 0,
                max: 10,
                goal: 0,
            });
            lock.turnRight(2);
            expect(lock.position).toBe(1);
        });

        test(`should wrap around the lock if the position is less than the min`, () => {
            const lock = new Lock({
                position: 0,
                min: 0,
                max: 10,
                goal: 0,
            });
            lock.turnLeft(2);
            expect(lock.position).toBe(9);
        });

        test(`should not wrap around the lock if the resulting position is equal to the min`, () => {
            const lock = new Lock({
                position: 2,
                min: 0,
                max: 10,
                goal: 0,
            });
            lock.turnLeft(2);
            expect(lock.position).toBe(0);
        });

        test(`should not wrap around the lock if the resulting position is equal to the max`, () => {
            const lock = new Lock({
                position: 8,
                min: 0,
                max: 10,
                goal: 0,
            });
            lock.turnRight(2);
            expect(lock.position).toBe(10);
        });

        test(`should not wrap around the lock if the position is between the min and max`, () => {
            const lock = new Lock({
                position: 5,
                min: 0,
                max: 10,
                goal: 0,
            });
            lock.turnLeft(2);
            expect(lock.position).toBe(3);
        });
    });

    describe(`isGoal`, () => {
        test(`should return true when the position is equal to the goal`, () => {
            const lock = new Lock({
                position: 0,
                min: 0,
                max: 10,
                goal: 0,
            });
            expect(lock.isGoal()).toBe(true);
        });
    });
});