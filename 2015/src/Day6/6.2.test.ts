import { Instruction } from './6.1.logic';
import { LightGrid } from './6.2.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 6 - Part 2', () => {
    describe('LightGrid', () => {
        describe(`When constructor is called...`, () => {
            test(`It should return an object with the correct properties.`, () => {
                const lightGrid = new LightGrid(1000, 1000);

                expect(lightGrid.lights.length).toBe(1000);
                expect(lightGrid.lights[0].length).toBe(1000);
            });
        });

        describe(`When calculateBrightness is called...`, () => {
            test(`It should return zero when no instructions have been applied.`, () => {
                const lightGrid = new LightGrid(10, 10);

                expect(lightGrid.calculateBrightness()).toBe(0);
            });

            test(`It should return the correct number of lights that are on when applying an instruction to turn on all lights.`, () => {
                const lightGrid = new LightGrid(10, 10);
                const instruction = new Instruction('turn on 0,0 through 9,9');

                lightGrid.applyInstruction(instruction);

                expect(lightGrid.calculateBrightness()).toBe(100);
            });

            test(`It should return the correct number of lights that are on when applying instructions to turn on/off all lights.`, () => {
                const lightGrid = new LightGrid(10, 10);

                lightGrid.applyInstruction(new Instruction('turn on 0,0 through 9,9'));
                lightGrid.applyInstruction(new Instruction('turn off 0,0 through 9,9'));

                expect(lightGrid.calculateBrightness()).toBe(0);
            });

            test(`It should return the correct number of lights that are on when applying an instruction to toggle all lights.`, () => {
                const lightGrid = new LightGrid(10, 10);
                const instruction = new Instruction('toggle 0,0 through 9,9');

                lightGrid.applyInstruction(instruction);

                expect(lightGrid.calculateBrightness()).toBe(200);
            });

            test(`It should return the correct number of lights that are on when applying an instruction to toggle a few lights.`, () => {
                const lightGrid = new LightGrid(10, 10);
                const instruction = new Instruction('toggle 0,0 through 1,1');

                lightGrid.applyInstruction(instruction);

                expect(lightGrid.calculateBrightness()).toBe(8);
            });
        });
    });
});