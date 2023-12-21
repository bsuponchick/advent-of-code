import { describe, expect, test } from '@jest/globals';
import { Terrain, TerrainType, Map, Elf } from './1.logic';

describe('Day 21 - Part 1', () => {
    describe(`Terrain`, () => {
        describe(`constructor`, () => {
            test(`should initialize properties`, () => {
                const terrain = new Terrain(TerrainType.Garden);

                expect(terrain.north).toBeNull();
                expect(terrain.south).toBeNull();
                expect(terrain.east).toBeNull();
                expect(terrain.west).toBeNull();
                expect(terrain.visited).toBeFalsy();
                expect(terrain.type).toBe(TerrainType.Garden);
                expect(terrain.startingPoint).toBeFalsy();
            });

            test(`should set starting point when specified`, () => {
                const terrain = new Terrain(TerrainType.Garden, true);

                expect(terrain.startingPoint).toBeTruthy();
            });
        });

        describe(`isStartingPoint`, () => {
            test(`should return true when starting point`, () => {
                const terrain = new Terrain(TerrainType.Garden, true);

                expect(terrain.isStartingPoint()).toBeTruthy();
            });

            test(`should return false when not starting point`, () => {
                const terrain = new Terrain(TerrainType.Garden);

                expect(terrain.isStartingPoint()).toBeFalsy();
            });
        });

        describe(`setNorth`, () => {
            test(`should set north property`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const north = new Terrain(TerrainType.Garden);

                terrain.setNorth(north);

                expect(terrain.north).toBe(north);
            });
        });

        describe(`setSouth`, () => {
            test(`should set south property`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const south = new Terrain(TerrainType.Garden);

                terrain.setSouth(south);

                expect(terrain.south).toBe(south);
            });
        });

        describe(`setEast`, () => {
            test(`should set east property`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const east = new Terrain(TerrainType.Garden);

                terrain.setEast(east);

                expect(terrain.east).toBe(east);
            });
        });

        describe(`setWest`, () => {
            test(`should set west property`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const west = new Terrain(TerrainType.Garden);

                terrain.setWest(west);

                expect(terrain.west).toBe(west);
            });
        });

        describe(`canMoveNorth`, () => {
            test(`should return false when north is null`, () => {
                const terrain = new Terrain(TerrainType.Garden);

                expect(terrain.canMoveNorth()).toBeFalsy();
            });

            test(`should return false when north is rock`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const north = new Terrain(TerrainType.Rock);

                terrain.setNorth(north);

                expect(terrain.canMoveNorth()).toBeFalsy();
            });

            test(`should return true when north is garden`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const north = new Terrain(TerrainType.Garden);

                terrain.setNorth(north);

                expect(terrain.canMoveNorth()).toBeTruthy();
            });
        });

        describe(`canMoveSouth`, () => {
            test(`should return false when south is null`, () => {
                const terrain = new Terrain(TerrainType.Garden);

                expect(terrain.canMoveSouth()).toBeFalsy();
            });

            test(`should return false when south is rock`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const south = new Terrain(TerrainType.Rock);

                terrain.setSouth(south);

                expect(terrain.canMoveSouth()).toBeFalsy();
            });

            test(`should return true when south is garden`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const south = new Terrain(TerrainType.Garden);

                terrain.setSouth(south);

                expect(terrain.canMoveSouth()).toBeTruthy();
            });
        });

        describe(`canMoveEast`, () => {
            test(`should return false when east is null`, () => {
                const terrain = new Terrain(TerrainType.Garden);

                expect(terrain.canMoveEast()).toBeFalsy();
            });

            test(`should return false when east is rock`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const east = new Terrain(TerrainType.Rock);

                terrain.setEast(east);

                expect(terrain.canMoveEast()).toBeFalsy();
            });

            test(`should return true when east is garden`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const east = new Terrain(TerrainType.Garden);

                terrain.setEast(east);

                expect(terrain.canMoveEast()).toBeTruthy();
            });
        });

        describe(`canMoveWest`, () => {
            test(`should return false when west is null`, () => {
                const terrain = new Terrain(TerrainType.Garden);

                expect(terrain.canMoveWest()).toBeFalsy();
            });

            test(`should return false when west is rock`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const west = new Terrain(TerrainType.Rock);

                terrain.setWest(west);

                expect(terrain.canMoveWest()).toBeFalsy();
            });

            test(`should return true when west is garden`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const west = new Terrain(TerrainType.Garden);

                terrain.setWest(west);

                expect(terrain.canMoveWest()).toBeTruthy();
            });
        });

        describe(`areAllNeighborsVisited`, () => {
            test(`should return true when all neighbors are null`, () => {
                const terrain = new Terrain(TerrainType.Garden);

                expect(terrain.areAllNeighborsVisited()).toBeTruthy();
            });

            test(`should return true when all neighbors are visited`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const north = new Terrain(TerrainType.Garden);
                const south = new Terrain(TerrainType.Garden);
                const east = new Terrain(TerrainType.Garden);
                const west = new Terrain(TerrainType.Garden);

                terrain.setNorth(north);
                terrain.setSouth(south);
                terrain.setEast(east);
                terrain.setWest(west);

                north.visit();
                south.visit();
                east.visit();
                west.visit();

                expect(terrain.areAllNeighborsVisited()).toBeTruthy();
            });

            test('should return true when some neighbors are null and the rest are visited', () => {
                const terrain = new Terrain(TerrainType.Garden);
                const north = new Terrain(TerrainType.Garden);
                const east = new Terrain(TerrainType.Garden);

                terrain.setNorth(north);
                terrain.setEast(east);

                north.visit();
                east.visit();

                expect(terrain.areAllNeighborsVisited()).toBeTruthy();
            });

            test(`should return false when one neighbor is not visited`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const north = new Terrain(TerrainType.Garden);
                const south = new Terrain(TerrainType.Garden);
                const east = new Terrain(TerrainType.Garden);
                const west = new Terrain(TerrainType.Garden);

                terrain.setNorth(north);
                terrain.setSouth(south);
                terrain.setEast(east);
                terrain.setWest(west);

                north.visit();
                south.visit();
                east.visit();

                expect(terrain.areAllNeighborsVisited()).toBeFalsy();
            });

            test(`should return false when more than one neighbor is not visited`, () => {
                const terrain = new Terrain(TerrainType.Garden);
                const north = new Terrain(TerrainType.Garden);
                const south = new Terrain(TerrainType.Garden);
                const east = new Terrain(TerrainType.Garden);
                const west = new Terrain(TerrainType.Garden);

                terrain.setNorth(north);
                terrain.setSouth(south);
                terrain.setEast(east);
                terrain.setWest(west);

                north.visit();
                east.visit();

                expect(terrain.areAllNeighborsVisited()).toBeFalsy();
            });
        });

        describe(`visit`, () => {
            test(`should set visited property to true`, () => {
                const terrain = new Terrain(TerrainType.Garden);

                terrain.visit();

                expect(terrain.visited).toBeTruthy();
            });
        });
    });

    describe(`Map`, () => {
        describe(`constructor`, () => {
            test(`should initialize terrain property`, () => {
                const map = new Map();

                expect(map.terrain).toEqual([]);
            });
        });

        describe(`establishConnections`, () => {
            test(`should set neighbors for each terrain`, () => {
                const map = new Map();
                const terrain1 = new Terrain(TerrainType.Garden);
                const terrain2 = new Terrain(TerrainType.Garden);
                const terrain3 = new Terrain(TerrainType.Garden);
                const terrain4 = new Terrain(TerrainType.Garden);

                map.terrain = [
                    [terrain1, terrain2],
                    [terrain3, terrain4]
                ];

                map.establishConnections();

                expect(terrain1.north).toBeNull();
                expect(terrain1.south).toBe(terrain3);
                expect(terrain1.east).toBe(terrain2);
                expect(terrain1.west).toBeNull();

                expect(terrain2.north).toBeNull();
                expect(terrain2.south).toBe(terrain4);
                expect(terrain2.east).toBeNull();
                expect(terrain2.west).toBe(terrain1);

                expect(terrain3.north).toBe(terrain1);
                expect(terrain3.south).toBeNull();
                expect(terrain3.east).toBe(terrain4);
                expect(terrain3.west).toBeNull();

                expect(terrain4.north).toBe(terrain2);
                expect(terrain4.south).toBeNull();
                expect(terrain4.east).toBeNull();
                expect(terrain4.west).toBe(terrain3);
            });
        });

        describe(`getStartingPoint`, () => {
            test(`should return starting point`, () => {
                const map = new Map();
                const terrain1 = new Terrain(TerrainType.Garden);
                const terrain2 = new Terrain(TerrainType.Garden, true);
                const terrain3 = new Terrain(TerrainType.Garden);

                map.terrain = [
                    [terrain1, terrain2, terrain3]
                ];

                expect(map.getStartingPoint()).toBe(terrain2);
            });
        });

        describe(`initialize`, () => {
            test(`should initialize terrain property`, () => {
                const map = new Map();
                const input = [
                    '#S',
                    '##'
                ];

                map.initialize(input);

                expect(map.terrain.length).toBe(2);
                expect(map.terrain[0].length).toBe(2);
                expect(map.terrain[1].length).toBe(2);
                expect(map.terrain[0][0].type).toBe(TerrainType.Rock);
                expect(map.terrain[0][1].type).toBe(TerrainType.Garden);
                expect(map.terrain[0][1].startingPoint).toBeTruthy();
                expect(map.terrain[1][0].type).toBe(TerrainType.Rock);
                expect(map.terrain[1][1].type).toBe(TerrainType.Rock);
            });
        });
    });

    describe(`Elf`, () => {
        describe(`constructor`, () => {
            test(`should initialize properties`, () => {
                const map = new Map();
                const elf = new Elf(map);

                expect(elf.map).toBe(map);
            });
        });

        describe(`visitNeighbors`, () => {
            test(`should visit all neighbors`, () => {
                const map = new Map();
                const terrain1 = new Terrain(TerrainType.Garden);
                const terrain2 = new Terrain(TerrainType.Garden);
                const terrain3 = new Terrain(TerrainType.Garden);
                const terrain4 = new Terrain(TerrainType.Garden);
                const elf = new Elf(map);

                map.terrain = [
                    [terrain1, terrain2],
                    [terrain3, terrain4]
                ];

                map.establishConnections();

                elf.visitNeighbors(terrain1);

                expect(terrain1.visited).toBeFalsy();
                expect(terrain2.visited).toBeTruthy();
                expect(terrain3.visited).toBeTruthy();
                expect(terrain4.visited).toBeFalsy();
            });
        });
    });
});