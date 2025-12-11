import { describe, expect, test } from '@jest/globals';
import { Machine, Button } from './10.1.logic';

describe('Day 10 - Part 1', () => {
    describe(`Machine`, () => {
        describe(`Constructor`, () => {
            test(`should initialize the machine correctly`, () => {
                const machine = new Machine('.##', [new Button([1, 2, 3]), new Button([4]), new Button([5, 6])], [7, 8, 9]);
                expect(machine.initialState).toEqual('...');
                expect(machine.goalState).toEqual('.##');
                expect(machine.buttons.length).toBe(3);
                expect(machine.joltage.length).toBe(3);
            });
        });

        describe(`When pressButton is called...`, () => {
            test(`should return ##### when the button is [0,1,2,3,4]`, () => {
                const machine = new Machine('.##..', [new Button([0, 1, 2, 3, 4])], [1]);
                expect(machine.pressButton(machine.initialState, new Button([0, 1, 2, 3, 4]))).toEqual('#####');
            });

            test(`should return .#..# when the button is [1,4]`, () => {
                const machine = new Machine('.##..', [new Button([0, 1, 2, 3, 4])], [1]);
                expect(machine.pressButton(machine.initialState, new Button([1, 4]))).toEqual('.#..#');
            });
        });
    });
});