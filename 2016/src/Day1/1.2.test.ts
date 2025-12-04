import { describe, expect, test } from '@jest/globals';
import { Traveler, Direction } from './1.2.logic';

describe('Day 1 - Part 1', () => {
    describe(`Traveler...`, () => {
        describe(`constructor`, () => {
            test(`should create a traveler with the correct coordinate and direction`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                expect(traveler.coordinate).toEqual({ x: 0, y: 0 });
                expect(traveler.direction).toEqual(Direction.North);
            });
        });

        describe(`When the faceDirection method is called...`, () => {
            test(`should face the traveler in the correct direction`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.East);
                expect(traveler.direction).toEqual(Direction.East);
            });
        });

        describe(`When the turnRight method is called...`, () => {
            test(`should turn the traveler east if the traveler is facing north`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.turnRight();
                expect(traveler.direction).toEqual(Direction.East);
            });

            test(`should turn the traveler south if the traveler is facing east`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.East);
                traveler.turnRight();
                expect(traveler.direction).toEqual(Direction.South);
            });

            test(`should turn the traveler west if the traveler is facing south`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.South);
                traveler.turnRight();
                expect(traveler.direction).toEqual(Direction.West);
            });

            test(`should turn the traveler north if the traveler is facing west`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.West);
                traveler.turnRight();
                expect(traveler.direction).toEqual(Direction.North);
            });
        });

        describe(`When the turnLeft method is called...`, () => {
            test(`should turn the traveler west if the traveler is facing north`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.North);
                traveler.turnLeft();
                expect(traveler.direction).toEqual(Direction.West);
            });

            test(`should turn the traveler south if the traveler is facing west`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.West);
                traveler.turnLeft();
                expect(traveler.direction).toEqual(Direction.South);
            });

            test(`should turn the traveler east if the traveler is facing south`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.South);
                traveler.turnLeft();
                expect(traveler.direction).toEqual(Direction.East);
            });

            test(`should turn the traveler north if the traveler is facing east`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.East);
                traveler.turnLeft();
                expect(traveler.direction).toEqual(Direction.North);
            });
        });

        describe(`When the moveForward method is called...`, () => {
            test(`should move the traveler 10 steps north if the traveler is facing north`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.North);
                traveler.moveForward(10);
                expect(traveler.coordinate).toEqual({ x: 0, y: 10 });
            });

            test(`should move the traveler 10 steps east if the traveler is facing east`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.East);
                traveler.moveForward(10);
                expect(traveler.coordinate).toEqual({ x: 10, y: 0 });
            });

            test(`should move the traveler 10 steps south if the traveler is facing south`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.South);
                traveler.moveForward(10);
                expect(traveler.coordinate).toEqual({ x: 0, y: -10 });
            });

            test(`should move the traveler 10 steps west if the traveler is facing west`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.West);
                traveler.moveForward(10);
                expect(traveler.coordinate).toEqual({ x: -10, y: 0 });
            });
        });

        describe(`When the parseInstruction method is called...`, () => {
            test(`should parse the instruction and return the correct direction and steps`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                const instruction = 'R10';
                const result = traveler.parseInstruction(instruction);
                expect(result).toEqual({ turn: 'R', steps: 10 });
            });
        });

        describe(`When the calculateDistance method is called...`, () => {
            test(`should return 10 if the traveler is at (0, 10)`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.North);
                traveler.moveForward(10);
                expect(traveler.calculateDistance()).toEqual(10);
            });

            test(`should return 10 if the traveler is at (10, 0)`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.East);
                traveler.moveForward(10);
                expect(traveler.calculateDistance()).toEqual(10);
            });

            test(`should return 10 if the traveler is at (0, -10)`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.South);
                traveler.moveForward(10);
                expect(traveler.calculateDistance()).toEqual(10);
            });

            test(`should return 10 if the traveler is at (-10, 0)`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.West);
                traveler.moveForward(10);
                expect(traveler.calculateDistance()).toEqual(10);
            });

            test(`should return 20 if the traveler is at (10, 10)`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.faceDirection(Direction.North);
                traveler.moveForward(10);
                traveler.faceDirection(Direction.East);
                traveler.moveForward(10);
                expect(traveler.calculateDistance()).toEqual(20);
            });
        });

        describe(`When the visitCoordinate method is called...`, () => {
            test(`should visit the coordinate and increment the count`, () => {
                const traveler = new Traveler({ x: 0, y: 0 });
                traveler.visitCoordinate({ x: 1, y: 1 });
                expect(traveler.visitedCoordinates.get(`1,1`)).toEqual(1);
            });
        });
    });
});