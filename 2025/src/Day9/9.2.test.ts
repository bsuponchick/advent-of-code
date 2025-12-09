import { describe, expect, test } from '@jest/globals';
import { Decider } from './9.2.logic';

describe('Day 9 - Part 2', () => {
    let decider: Decider;

    beforeEach(() => {
        decider = new Decider();
    });

    describe(`When the calculateAreaBetweenCoordinates function is called...`, () => {
        test(`Should return 6 with { x: 7, y: 3} and { x: 2, y: 3}`, () => {
            expect(decider.calculateAreaBetweenCoordinates({ x: 7, y: 3 }, { x: 2, y: 3 })).toBe(6);
        });

        test(`Should return 24 with { x: 2, y: 5} and { x: 9, y: 7}`, () => {
            expect(decider.calculateAreaBetweenCoordinates({ x: 2, y: 5 }, { x: 9, y: 7 })).toBe(24);
        });

        test(`Should return 35 with { x: 7, y: 1 } and { x: 11, y: 7} `, () => {
            expect(decider.calculateAreaBetweenCoordinates({ x: 7, y: 1 }, { x: 11, y: 7 })).toBe(35);
        });

        test(`Should return 50 with { x: 2, y: 5 } and { x: 11, y: 1 } `, () => {
            expect(decider.calculateAreaBetweenCoordinates({ x: 2, y: 5 }, { x: 11, y: 1 })).toBe(50);
        });
    });

    describe(`When the isInterior function is called...`, () => {
        test(`Should return true with { x: 5, y: 5 } and vertices [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]`, () => {
            // This is a true interior point
            expect(decider.isInterior({ x: 5, y: 5 }, decider.createLineSegmentsFromVertices([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]))).toBe(true);
        });

        test(`Should return true with { x: 5, y: 0 } and vertices [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]`, () => {
            // This is a point on the top edge of the polygon
            expect(decider.isInterior({ x: 5, y: 0 }, decider.createLineSegmentsFromVertices([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]))).toBe(true);
        });

        test(`Should return true with { x: 10, y: 5 } and vertices [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]`, () => {
            // This is a point on the right edge of the polygon
            expect(decider.isInterior({ x: 10, y: 5 }, decider.createLineSegmentsFromVertices([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]))).toBe(true);
        });

        test(`Should return true with { x: 5, y: 10 } and vertices [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]`, () => {
            // This is a point on the bottom edge of the polygon
            expect(decider.isInterior({ x: 5, y: 10 }, decider.createLineSegmentsFromVertices([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]))).toBe(true);
        });

        test(`Should return true with { x: 0, y: 5 } and vertices [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]`, () => {
            // This is a point on the left edge of the polygon
            expect(decider.isInterior({ x: 0, y: 5 }, decider.createLineSegmentsFromVertices([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]))).toBe(true);
        });

        test(`Should return false with { x: 11, y: 5 } and vertices [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]`, () => {
            // This is a point to the right of the polygon
            expect(decider.isInterior({ x: 11, y: 5 }, decider.createLineSegmentsFromVertices([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]))).toBe(false);
        });

        test(`Should return false with { x: 0, y: 1 } and vertices [{ x: 1, y: 1 }, { x: 10, y: 1 }, { x: 10, y: 10 }, { x: 1, y: 10 }]`, () => {
            // This is a point to the left of the polygon
            expect(decider.isInterior({ x: 0, y: 0 }, decider.createLineSegmentsFromVertices([{ x: 1, y: 1 }, { x: 10, y: 1 }, { x: 10, y: 10 }, { x: 1, y: 10 }]))).toBe(false);
        });

        test(`Should return false with { x: 0, y: 0 } and vertices [{ x: 1, y: 1 }, { x: 10, y: 1 }, { x: 10, y: 10 }, { x: 1, y: 10 }]`, () => {
            // This is a point above the polygon
            expect(decider.isInterior({ x: 0, y: 0 }, decider.createLineSegmentsFromVertices([{ x: 1, y: 1 }, { x: 10, y: 1 }, { x: 10, y: 10 }, { x: 1, y: 10 }]))).toBe(false);
        });

        test(`Should return false with { x: 11, y: 1} and vertices [{ x: 1, y: 1 }, { x: 10, y: 1 }, { x: 10, y: 10 }, { x: 1, y: 10 }]`, () => {
            // This is a point below the polygon
            expect(decider.isInterior({ x: 11, y: 1 }, decider.createLineSegmentsFromVertices([{ x: 1, y: 1 }, { x: 10, y: 1 }, { x: 10, y: 10 }, { x: 1, y: 10 }]))).toBe(false);
        });

        test(`Should return false with { x: 0, y: 0 } and vertices [{ x: 0, y: 5}, { x: 0, y: 10 }]`, () => {
            expect(decider.isInterior({ x: 0, y: 0 }, decider.createLineSegmentsFromVertices([{ x: 5, y: 0}, { x: 10, y: 0 }]))).toBe(false);
        });

        test(`Should return true with { x: 2, y: 1 } and vertices [{ x: 11, y: 5 }, { x: 11, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 5 }]`, () => {
            expect(decider.isInterior({ x: 2, y: 1 }, decider.createLineSegmentsFromVertices([{ x: 11, y: 5 }, { x: 11, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 5 }]))).toBe(true);
        });
    });

    describe(`When the isPointOnSegment function is called...`, () => {
        test(`Should return true with { x: 5, y: 5 } and segment { p1: { x: 0, y: 0 }, p2: { x: 10, y: 10 }}`, () => {
            expect(decider.isPointOnSegment({ x: 5, y: 5 }, { p1: { x: 0, y: 0 }, p2: { x: 10, y: 10 } })).toBe(true);
        });

        test(`Should return true with { x: 5, y: 0 } and segment { p1: { x: 0, y: 0 }, p2: { x: 10, y: 0 }}`, () => {
            expect(decider.isPointOnSegment({ x: 5, y: 0 }, { p1: { x: 0, y: 0 }, p2: { x: 10, y: 0 } })).toBe(true);
        });

        test(`Should return true with { x: 0, y: 5 } and segment { p1: { x: 0, y: 0}, p2: { x: 0, y: 10 }}`, () => {
            expect(decider.isPointOnSegment({ x: 0, y: 5 }, { p1: { x: 0, y: 0}, p2: { x: 0, y: 10 } })).toBe(true);
        });

        test(`Should return false with { x: 0, y: 5 } and segment { p1: { x: 10, y: 0}, p2: { x: 0, y: 0 }}`, () => {
            expect(decider.isPointOnSegment({ x: 0, y: 5 }, { p1: { x: 10, y: 0}, p2: { x: 0, y: 0 } })).toBe(false);
        });

        test(`Should return false with { x: 11, y: 1 } and segment { p1: { x: 10, y: 1}, p2: { x: 10, y: 10 }}`, () => {
            expect(decider.isPointOnSegment({ x: 11, y: 1 }, { p1: { x: 10, y: 1}, p2: { x: 10, y: 10 } })).toBe(false);
        });
    });

    describe(`When the getAllXYCoordinatesInRectangle function is called...`, () => {
        test(`Should return [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y, 2 }, { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }] with { x: 0, y: 0 } and { x: 2, y: 2 }`, () => {
            expect(decider.getAllXYCoordinatesInRectangle({ x: 0, y: 0 }, { x: 2, y: 2 })).toEqual([{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }]);
        });
    });
});