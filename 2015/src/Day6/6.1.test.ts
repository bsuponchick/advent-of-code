import { Instruction, LightGrid } from './6.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 6 - Part 1', () => {
    describe(`Instruction`, () => {
        test(`It should return an object with the correct properties.`, () => {
            const instruction = new Instruction('turn on 0,0 through 999,999');

            expect(instruction.type).toBe('on');
            expect(instruction.start).toEqual({ x: 0, y: 0 });
            expect(instruction.end).toEqual({ x: 999, y: 999 });
        });

        test(`It should return an object with the correct properties.`, () => {
            const instruction = new Instruction('turn off 499,499 through 500,500');

            expect(instruction.type).toBe('off');
            expect(instruction.start).toEqual({ x: 499, y: 499 });
            expect(instruction.end).toEqual({ x: 500, y: 500 });
        });

        test(`It should return an object with the correct properties.`, () => {
            const instruction = new Instruction('toggle 0,0 through 999,0');

            expect(instruction.type).toBe('toggle');
            expect(instruction.start).toEqual({ x: 0, y: 0 });
            expect(instruction.end).toEqual({ x: 999, y: 0 });
        });
    });

    describe('LightGrid', () => {
        describe(`When constructor is called...`, () => {
            test(`It should return an object with the correct properties.`, () => {
                const lightGrid = new LightGrid(1000, 1000);

                expect(lightGrid.lights.length).toBe(1000);
                expect(lightGrid.lights[0].length).toBe(1000);
            });
        });

        describe(`When countLightsThatAreOn is called...`, () => {
            test(`It should return zero when no instructions have been applied.`, () => {
                const lightGrid = new LightGrid(10, 10);

                expect(lightGrid.countLightsThatAreOn()).toBe(0);
            });

            test(`It should return the correct number of lights that are on when applying an instruction to turn on all lights.`, () => {
                const lightGrid = new LightGrid(10, 10);
                const instruction = new Instruction('turn on 0,0 through 9,9');

                lightGrid.applyInstruction(instruction);

                expect(lightGrid.countLightsThatAreOn()).toBe(100);
            });

            test(`It should return the correct number of lights that are on when applying instructions to turn on/off all lights.`, () => {
                const lightGrid = new LightGrid(10, 10);

                lightGrid.applyInstruction(new Instruction('turn on 0,0 through 9,9'));
                lightGrid.applyInstruction(new Instruction('turn off 0,0 through 9,9'));

                expect(lightGrid.countLightsThatAreOn()).toBe(0);
            });

            test(`It should return the correct number of lights that are on when applying an instruction to toggle all lights.`, () => {
                const lightGrid = new LightGrid(10, 10);
                const instruction = new Instruction('toggle 0,0 through 9,9');

                lightGrid.applyInstruction(instruction);

                expect(lightGrid.countLightsThatAreOn()).toBe(100);
            });

            test(`It should return the correct number of lights that are on when applying an instruction to toggle a few lights.`, () => {
                const lightGrid = new LightGrid(10, 10);
                const instruction = new Instruction('toggle 0,0 through 1,1');

                lightGrid.applyInstruction(instruction);

                expect(lightGrid.countLightsThatAreOn()).toBe(4);
            });
        });
    });
});