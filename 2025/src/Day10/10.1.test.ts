import { describe, expect, test } from '@jest/globals';
import { Machine, Button } from './10.1.logic';

describe('Day 10 - Part 1', () => {
    describe(`Machine`, () => {
        describe(`Constructor`, () => {
            test(`should initialize the machine correctly`, () => {
                const machine = new Machine('.##', [new Button([1, 2, 3]), new Button([4]), new Button([5, 6])], [7, 8, 9]);
                expect(machine.currentState).toEqual('...');
                expect(machine.goalState).toEqual('.##');
                expect(machine.buttons.length).toBe(3);
                expect(machine.joltage.length).toBe(3);
            });
        });
    });
});