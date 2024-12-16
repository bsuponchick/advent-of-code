import { Robot } from './14.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 14 - Part 1', () => {
    describe(`Robot`, () => {
        describe(`Constructor`, () => {
            test(`should initialize the robot correctly`, () => {
                const robot = new Robot({ x: 0, y: 0 }, { x: 1, y: 1 });
                expect(robot.position).toEqual({ x: 0, y: 0 });
                expect(robot.velocity).toEqual({ x: 1, y: 1 });
                expect(robot.previousPositions).toEqual([{ x: 0, y: 0 }]);
                expect(robot.positionCache.get('0,0')).toEqual(0);
            });
        });

        describe(`When generatePositionKey is called...`, () => {
            test(`should return the correct key`, () => {
                const robot = new Robot({ x: 0, y: 0 }, { x: 1, y: 1 });
                const key = robot.generatePositionKey({ x: 1, y: 1 });
                expect(key).toEqual('1,1');
            });
        });

        describe(`When move is called...`, () => {
            test(`should move the robot to the next position`, () => {
                const robot = new Robot({ x: 0, y: 0 }, { x: 10, y: 10 });
                robot.move({ x: 20, y: 20 });
                expect(robot.position).toEqual({ x: 10, y: 10 });
                expect(robot.previousPositions).toEqual([{ x: 0, y: 0 }, { x: 10, y: 10 }]);
                expect(robot.positionCache.get('0,0')).toEqual(0);
                expect(robot.positionCache.get('10,10')).toEqual(1);
            });

            test(`should move the robot to the next position (negative)`, () => {
                const robot = new Robot({ x: 10, y: 10 }, { x: -10, y: -10 });
                robot.move({ x: 20, y: 20 });
                expect(robot.position).toEqual({ x: 0, y: 0 });
                expect(robot.previousPositions).toEqual([{ x: 10, y: 10 }, { x: 0, y: 0 }]);
                expect(robot.positionCache.get('10,10')).toEqual(0);
                expect(robot.positionCache.get('0,0')).toEqual(1);
            });

            test(`should teleport the robot when it goes out of bounds`, () => {
                const robot = new Robot({ x: 0, y: 0 }, { x: -1, y: -1 });
                robot.move({ x: 20, y: 20 });
                expect(robot.position).toEqual({ x: 19, y: 19 });
                expect(robot.previousPositions).toEqual([{ x: 0, y: 0 }, { x: 19, y: 19 }]);
                expect(robot.positionCache.get('0,0')).toEqual(0);
                expect(robot.positionCache.get('19,19')).toEqual(1);
            });

            test(`should move appropriately by the example`, () => {
                const robot = new Robot({ x: 2, y: 4 }, { x: 2, y: -3 });
                robot.moveXTimes({ x: 11, y: 7 }, 5);

                expect(robot.previousPositions).toEqual([{ x: 2, y: 4 }, { x: 4, y: 1 }, { x: 6, y: 5 }, { x: 8, y: 2 }, { x: 10, y: 6 }, { x: 1, y: 3 }]);
            });
        });

        describe(`When moveXTimes is called...`, () => {
            test(`should move the robot the correct number of times`, () => {
                const robot = new Robot({ x: 0, y: 0 }, { x: 1, y: 1 });
                robot.moveXTimes({ x: 20, y: 20 }, 5);
                expect(robot.position).toEqual({ x: 5, y: 5 });
                expect(robot.previousPositions).toEqual([{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }]);
                expect(robot.positionCache.get('0,0')).toEqual(0);
                expect(robot.positionCache.get('1,1')).toEqual(1);
                expect(robot.positionCache.get('2,2')).toEqual(2);
                expect(robot.positionCache.get('3,3')).toEqual(3);
                expect(robot.positionCache.get('4,4')).toEqual(4);
                expect(robot.positionCache.get('5,5')).toEqual(5);
            });

            test(`should stop moving when the robot has been in the same position before`, () => {
                const robot = new Robot({ x: 0, y: 0 }, { x: 1, y: 1 });
                robot.moveXTimes({ x: 3, y: 3 }, 5);
                expect(robot.previousPositions).toEqual([{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }]);
                expect(robot.positionCache.get('0,0')).toEqual(0);
                expect(robot.positionCache.get('1,1')).toEqual(1);
                expect(robot.positionCache.get('2,2')).toEqual(2);
            });
        });

        describe(`When determinePositionAtTime is called...`, () => {
            test(`should return the correct position at the given time`, () => {
                const robot = new Robot({ x: 0, y: 0 }, { x: 1, y: 1 });
                robot.moveXTimes({ x: 20, y: 20 }, 5);
                const position = robot.determinePositionAtTime(5);
                expect(position).toEqual({ x: 5, y: 5 });
            });

            test(`should return the correct position at the given time when it reaches a node it's already been to and stops`, () => {
                const robot = new Robot({ x: 0, y: 0 }, { x: 1, y: 1 });
                robot.moveXTimes({ x: 3, y: 3}, 5);
                const positionAt5 = robot.determinePositionAtTime(5);
                const positionAt100 = robot.determinePositionAtTime(100);
                expect(positionAt5).toEqual({ x: 2, y: 2 });
                expect(positionAt100).toEqual({ x: 1, y: 1 });
            });
        });

        describe(`When determineQuadrantFromCoordinate is called...`, () => {
            test(`should return the -1 for a coordinate in the center x`, () => {
                const robot = new Robot({ x: 0, y: 0 }, { x: 1, y: 1 });
                const quadrant = robot.determineQuadrantFromCoordinate({ x: 5, y: 0 }, { x: 11, y: 7 });
                expect(quadrant).toEqual(-1);
            });

            test(`should return the -1 for a coordinate in the center y`, () => {
                const robot = new Robot({ x: 0, y: 0 }, { x: 1, y: 1 });
                const quadrant = robot.determineQuadrantFromCoordinate({ x: 0, y: 3 }, { x: 11, y: 7 });
                expect(quadrant).toEqual(-1);
            });

            test(`should return the 1 for a coordinate in the upper left quadrant`, () => {
                const robot = new Robot({ x: 0, y: 0 }, { x: 1, y: 1 });
                const quadrant = robot.determineQuadrantFromCoordinate({ x: 0, y: 2 }, { x: 11, y: 7 });
                expect(quadrant).toEqual(1);
            });

            test(`should return the 2 for a coordinate in the upper right quadrant`, () => {
                const robot = new Robot({ x: 0, y: 0 }, { x: 1, y: 1 });
                const quadrant = robot.determineQuadrantFromCoordinate({ x: 6, y: 0 }, { x: 11, y: 7 });
                expect(quadrant).toEqual(2);
            });

            test(`should return the 3 for a coordinate in the lower left quadrant`, () => {
                const robot = new Robot({ x: 0, y: 0 }, { x: 1, y: 1 });
                const quadrant = robot.determineQuadrantFromCoordinate({ x: 1, y: 6 }, { x: 11, y: 7 });
                expect(quadrant).toEqual(3);
            });

            test(`should return the 4 for a coordinate in the lower right quadrant`, () => {
                const robot = new Robot({ x: 0, y: 0 }, { x: 1, y: 1 });
                const quadrant = robot.determineQuadrantFromCoordinate({ x: 6, y: 6 }, { x: 11, y: 7 });
                expect(quadrant).toEqual(4);
            });
        });
    });
});