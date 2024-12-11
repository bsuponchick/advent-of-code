import { Stone } from './11.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 11 - Part 1', () => {
    describe(`Stone`, () => {
        describe(`Constructor`, () => {
            test(`should set engraving`, () => {
                const stone = new Stone(2024);
                expect(stone.engraving).toBe(2024);
            });
        });

        describe(`When the transform function is called...`, () => {
            test(`should return a new Stone with engraving 1 when engraving is 0`, () => {
                const stone = new Stone(0);
                const result = stone.transform();
                expect(result.length).toBe(1);
                expect(result[0].engraving).toBe(1);
            });

            test(`should return two new Stones with engraving 20 and 24 when engraving is 2024`, () => {
                const stone = new Stone(2024);
                const result = stone.transform();
                expect(result.length).toBe(2);
                expect(result[0].engraving).toBe(20);
                expect(result[1].engraving).toBe(24);
            });

            test(`should return two new Stones with engraving 1 and 7 when engraving is 17`, () => {
                const stone = new Stone(17);
                const result = stone.transform();
                expect(result.length).toBe(2);
                expect(result[0].engraving).toBe(1);
                expect(result[1].engraving).toBe(7);
            });

            test(`should return a new Stone with engraving 2024 when engraving is 1`, () => {
                const stone = new Stone(1);
                const result = stone.transform();
                expect(result.length).toBe(1);
                expect(result[0].engraving).toBe(2024);
            });

            test(`should return a new Stone with engraving 253000 when engraving is 125`, () => {
                const stone = new Stone(125);
                const result = stone.transform();
                expect(result.length).toBe(1);
                expect(result[0].engraving).toBe(253000);
            });
        });
    });
});