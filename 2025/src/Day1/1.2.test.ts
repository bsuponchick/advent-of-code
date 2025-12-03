import { describe, expect, test } from '@jest/globals';
import { Lock } from './1.2.logic';

describe('Day 0 - Part 2', () => {
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
            const goals = lock.turnLeft(2);
            expect(lock.position).toBe(10);
            expect(goals).toBe(1);
        });

        test(`should wrap around the lock if the position is less than the min`, () => {
            const lock = new Lock({
                position: 0,
                min: 0,
                max: 10,
                goal: 0,
            });
            let goals = lock.turnLeft(2);
            expect(lock.position).toBe(9);
            expect(goals).toBe(0);
        });

        test(`should not wrap around the lock if the resulting position is equal to the min`, () => {
            const lock = new Lock({
                position: 2,
                min: 0,
                max: 10,
                goal: 0,
            });
            let goals = lock.turnLeft(2);
            expect(lock.position).toBe(0);
            expect(goals).toBe(1);
        });

        test(`should not wrap around the lock if the position is between the min and max`, () => {
            const lock = new Lock({
                position: 5,
                min: 0,
                max: 10,
                goal: 0,
            });
            let goals = lock.turnLeft(2);
            expect(lock.position).toBe(3);
            expect(goals).toBe(0);
        });

        test(`should return the number of times the lock reached the goal while wrapping around`, () => {
            const lock = new Lock({
                position: 0,
                min: 0,
                max: 10,
                goal: 0,
            });
            expect(lock.turnLeft(2)).toBe(0);
        });
        
        test(`should return the number of times the lock reached the goal while wrapping around more than once`, () => {
            const lock = new Lock({
                position: 0,
                min: 0,
                max: 10,
                goal: 0,
            });
            expect(lock.turnLeft(22)).toBe(2);
        });

        test(`should return 0 if the lock did not reach the goal while wrapping around`, () => {
            const lock = new Lock({
                position: 3,
                min: 0,
                max: 10,
                goal: 0,
            });
            expect(lock.turnLeft(2)).toBe(0);
        });

        test(`should return 10 if the lock starts at 50 and gets L1000`, () => {
            const lock = new Lock({
                position: 50,
                min: 0,
                max: 99,
                goal: 0,
            });
            expect(lock.turnLeft(1000)).toBe(10);
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
            let goals = lock.turnRight(2);
            expect(lock.position).toBe(3);
            expect(goals).toBe(0);
        });

        test(`should wrap around the lock if the position is greater than the max`, () => {
            const lock = new Lock({
                position: 10,
                min: 0,
                max: 10,
                goal: 0,
            });
            let goals =lock.turnRight(2);
            expect(lock.position).toBe(1);
            expect(goals).toBe(1);
        });

        test(`should not wrap around the lock if the resulting position is equal to the max`, () => {
            const lock = new Lock({
                position: 8,
                min: 0,
                max: 10,
                goal: 0,
            });
            let goals = lock.turnRight(2);
            expect(lock.position).toBe(10);
            expect(goals).toBe(0);
        });

        test(`should return the number of times the lock reached the goal while wrapping around`, () => {
            const lock = new Lock({
                position: 10,
                min: 0,
                max: 10,
                goal: 0,
            });
            expect(lock.turnRight(2)).toBe(1);
        });

        test(`should return the number of times the lock reached the goal while wrapping around more than once`, () => {
            const lock = new Lock({
                position: 0,
                min: 0,
                max: 10,
                goal: 0,
            });
            expect(lock.turnRight(22)).toBe(2);
        });

        test(`should return 0 if the lock did not reach the goal while wrapping around`, () => {
            const lock = new Lock({
                position: 1,
                min: 0,
                max: 10,
                goal: 0,
            });
            expect(lock.turnRight(2)).toBe(0);
        });

        test(`should return 10 if the lock starts at 50 and gets R1000`, () => {
            const lock = new Lock({
                position: 50,
                min: 0,
                max: 99,
                goal: 0,
            });
            expect(lock.turnRight(1000)).toBe(10);
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