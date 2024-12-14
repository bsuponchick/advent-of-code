import { ClawMachine } from './13.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 13 - Part 1', () => {
    describe(`ClawMachine`, () => {
        describe(`Constructor`, () => {
            test(`should set the goal and current coordinates`, () => {
                const goal = { x: 5, y: 5 };
                const aButtonPress = { x: 1, y: 0 };
                const bButtonPress = { x: 0, y: 1 };
                const clawMachine = new ClawMachine(goal, aButtonPress, bButtonPress);
                expect(clawMachine.goal).toEqual(goal);
            });
        });

        describe(`When calculateCheapestPathToGoal is called...`, () => {
            test(`should return the lowest score to reach the goal`, () => {
                const clawMachine = new ClawMachine({ x: 5, y: 5 }, { x: 1, y: 0 }, { x: 0, y: 1 });
                const score = clawMachine.calculateCheapestPathToGoal();
                expect(score).toEqual(20);
            });

            test(`should return 280 for the first sample input`, () => {
                const clawMachine = new ClawMachine({ x: 8400, y: 5400 }, { x: 94, y: 34}, { x: 22, y: 67});
                const score = clawMachine.calculateCheapestPathToGoal();
                expect(score).toEqual(280);
            });
        });
    });
});