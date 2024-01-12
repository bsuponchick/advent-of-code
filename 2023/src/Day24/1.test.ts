import { describe, expect, test } from '@jest/globals';
import { Line } from './1.logic';

describe('Day 24 - Part 1', () => {
    describe('Line', () => {
        describe(`constructor`, () => {
            test(`should correctly parse a line`, () => {
                const line = new Line(1, 2, 3, 4);
                expect(line.x1).toBe(1);
                expect(line.y1).toBe(2);
                expect(line.x2).toBe(3);
                expect(line.y2).toBe(4);
                expect(line.a).toBe(2);
                expect(line.b).toBe(-2);
                expect(line.c).toBe(2);
            });
        });

        describe(`determineIntersection`, () => {
            test(`should return the intersection point of two lines`, () => {
                const line = new Line(1, 1, 4, 4);
                const line2 = new Line(1, 4, 6, 4);

                const intersection = line.determineIntersection(line2);
                expect(intersection).toEqual({ x: 4, y: 4 });
            });

            test(`should return null for two parallel lines`, () => {
                const line = new Line(1, 1, 2, 2);
                const line2 = new Line(2, 1, 3, 2);

                const intersection = line.determineIntersection(line2);
                expect(intersection).toBeNull();
            });
        });
    });
});