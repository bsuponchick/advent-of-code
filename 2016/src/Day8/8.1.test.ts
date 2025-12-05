import { describe, expect, test } from '@jest/globals';
import { Screen } from './8.1.logic';

describe('Day 8 - Part 1', () => {
    describe(`Screen...`, () => {
        describe(`Constructor...`, () => {
            test(`should create a new Screen`, () => {
                const screen = new Screen(3, 2);
                expect(screen.pixels).toEqual([[false, false, false], [false, false, false]]);
            });
        });

        describe(`When rect is called...`, () => {
            test(`should set the pixels to true for teh given width and height`, () => {
                const screen = new Screen(3, 2);
                screen.rect(2, 1);
                expect(screen.pixels).toEqual([[true, true, false], [false, false, false]]);
            });

            test(`should set the pixels to true for the given width and height`, () => {
                const screen = new Screen(7, 3);
                screen.rect(3, 2);
                expect(screen.pixels).toEqual([[true, true, true, false, false, false, false], [true, true, true, false, false, false, false], [false, false, false, false, false, false, false]]);
            });
        });

        describe(`When rotateRow is called...`, () => {
            test(`should rotate the row to the right by the given amount`, () => {
                const screen = new Screen(5, 3);
                screen.rect(3, 2);
                screen.rotateRow(0, 1);
                expect(screen.pixels).toEqual([[false, true, true, true, false], [true, true, true, false, false], [false, false, false, false, false]]);
            });

            test(`should handle overflow correctly`, () => {
                const screen = new Screen(5, 3);
                screen.rect(3, 2);
                screen.rotateRow(0, 3);
                expect(screen.pixels).toEqual([[true, false, false, true, true], [true, true, true, false, false], [false, false, false, false, false]]);
            });
        });

        describe(`When rotateColumn is called...`, () => {
            test(`should rotate the column to the right by the given amount`, () => {
                const screen = new Screen(5, 3);
                screen.rect(3, 2);
                screen.rotateColumn(0, 1);
                expect(screen.pixels).toEqual([[false, true, true, false, false], [true, true, true, false, false], [true, false, false, false, false]]);
            });

            test(`should handle overflow correctly`, () => {
                const screen = new Screen(5, 3);
                screen.rect(3, 2);
                screen.rotateColumn(0, 2);
                expect(screen.pixels).toEqual([[true, true, true, false, false], [false, true, true, false, false], [true, false, false, false, false]]);
            });
        });

        describe(`When countPixelsOn is called...`, () => {
            test(`should return the number of pixels on the screen`, () => {
                const screen = new Screen(5, 3);
                screen.rect(3, 2);
                expect(screen.countPixelsOn()).toBe(6);
            });
        });
    });
});