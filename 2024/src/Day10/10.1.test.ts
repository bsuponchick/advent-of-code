import { start } from 'repl';
import { Tile, HikingMap, Hiker } from './10.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 10 - Part 1', () => {
    describe('Tile', () => {
        describe(`When the constructor is called...`, () => {
            test(`Then the tile should initialized correctly.`, () => {
                const tile = new Tile(10);
                expect(tile.elevation).toBe(10);
                expect(tile.north).toBe(null);
                expect(tile.east).toBe(null);
                expect(tile.south).toBe(null);
                expect(tile.west).toBe(null);
                expect(tile.beenNorth).toBe(false);
                expect(tile.beenEast).toBe(false);
                expect(tile.beenSouth).toBe(false);
                expect(tile.beenWest).toBe(false);
                expect(tile.visited).toBe(false);
            });
        });

        describe(`When hasBeenNorth is called...`, () => {
            test(`It should return false when the tile has not been marked as visited the north tile yet.`, () => {
                const tile = new Tile(10);
                expect(tile.hasBeenNorth()).toBe(false);
            });

            test(`It should return true when the tile has been marked as visiting north.`, () => {
                const tile = new Tile(10);                
                tile.markBeenNorth();
                expect(tile.hasBeenNorth()).toBe(true);
            });
        });

        describe(`When hasBeenEast is called...`, () => {
            test(`It should return false when the tile has not been marked as visiing the east tile yet.`, () => {
                const tile = new Tile(10);
                expect(tile.hasBeenEast()).toBe(false);
            });

            test(`It should return true when the tile has been marked as visiting east.`, () => {
                const tile = new Tile(10);                
                tile.markBeenEast();
                expect(tile.hasBeenEast()).toBe(true);
            });
        });

        describe(`When hasBeenSouth is called...`, () => {
            test(`It should return false when the tile has not been marked as visiting the south tile yet.`, () => {
                const tile = new Tile(10);
                expect(tile.hasBeenSouth()).toBe(false);
            });

            test(`It should return true when the tile has been marked as visiting south.`, () => {
                const tile = new Tile(10);                
                tile.markBeenSouth();
                expect(tile.hasBeenSouth()).toBe(true);
            });
        });

        describe(`When hasBeenWest is called...`, () => {
            test(`It should return false when the tile has not been marked as visiting the west tile yet.`, () => {
                const tile = new Tile(10);
                expect(tile.hasBeenWest()).toBe(false);
            });

            test(`It should return true when the tile has been marked as visiting west.`, () => {
                const tile = new Tile(10);                
                tile.markBeenWest();
                expect(tile.hasBeenWest()).toBe(true);
            });
        });

        describe(`When visit is called...`, () => {
            test(`It should mark the tile as visited.`, () => {
                const tile = new Tile(10);
                tile.visit();
                expect(tile.visited).toBe(true);
            });
        });

        describe(`When setNorth is called...`, () => {
            test(`It should set the north tile.`, () => {
                const tile = new Tile(10);
                const northTile = new Tile(5);
                tile.setNorth(northTile);
                expect(tile.north).toBe(northTile);
            });
        });

        describe(`When setEast is called...`, () => {
            test(`It should set the east tile.`, () => {
                const tile = new Tile(10);
                const eastTile = new Tile(5);
                tile.setEast(eastTile);
                expect(tile.east).toBe(eastTile);
            });
        });

        describe(`When setSouth is called...`, () => {
            test(`It should set the south tile.`, () => {
                const tile = new Tile(10);
                const southTile = new Tile(5);
                tile.setSouth(southTile);
                expect(tile.south).toBe(southTile);
            });
        });

        describe(`When setWest is called...`, () => {
            test(`It should set the west tile.`, () => {
                const tile = new Tile(10);
                const westTile = new Tile(5);
                tile.setWest(westTile);
                expect(tile.west).toBe(westTile);
            });
        });

        describe(`When canMoveNorth is called...`, () => {
            test(`It should return false when the north tile is null.`, () => {
                const tile = new Tile(10);
                expect(tile.canMoveNorth()).toBe(false);
            });

            test(`It should return false when the elevation difference is not 1.`, () => {
                const tile = new Tile(10);
                const northTile = new Tile(5);
                tile.setNorth(northTile);
                expect(tile.canMoveNorth()).toBe(false);
            });

            test(`It should return true when the elevation difference is 1.`, () => {
                const tile = new Tile(10);
                const northTile = new Tile(11);
                tile.setNorth(northTile);
                expect(tile.canMoveNorth()).toBe(true);
            });
        });

        describe(`When canMoveEast is called...`, () => {
            test(`It should return false when the east tile is null.`, () => {
                const tile = new Tile(10);
                expect(tile.canMoveEast()).toBe(false);
            });

            test(`It should return false when the elevation difference is not 1.`, () => {
                const tile = new Tile(10);
                const eastTile = new Tile(5);
                tile.setEast(eastTile);
                expect(tile.canMoveEast()).toBe(false);
            });

            test(`It should return true when the elevation difference is 1.`, () => {
                const tile = new Tile(10);
                const eastTile = new Tile(11);
                tile.setEast(eastTile);
                expect(tile.canMoveEast()).toBe(true);
            });
        });

        describe(`When canMoveSouth is called...`, () => {
            test(`It should return false when the south tile is null.`, () => {
                const tile = new Tile(10);
                expect(tile.canMoveSouth()).toBe(false);
            });

            test(`It should return false when the elevation difference is not 1.`, () => {
                const tile = new Tile(10);
                const southTile = new Tile(5);
                tile.setSouth(southTile);
                expect(tile.canMoveSouth()).toBe(false);
            });

            test(`It should return true when the elevation difference is 1.`, () => {
                const tile = new Tile(10);
                const southTile = new Tile(11);
                tile.setSouth(southTile);
                expect(tile.canMoveSouth()).toBe(true);
            });
        });

        describe(`When canMoveWest is called...`, () => {
            test(`It should return false when the west tile is null.`, () => {
                const tile = new Tile(10);
                expect(tile.canMoveWest()).toBe(false);
            });

            test(`It should return false when the elevation difference is not 1.`, () => {
                const tile = new Tile(10);
                const westTile = new Tile(5);
                tile.setWest(westTile);
                expect(tile.canMoveWest()).toBe(false);
            });

            test(`It should return true when the elevation difference is 1.`, () => {
                const tile = new Tile(10);
                const westTile = new Tile(11);
                tile.setWest(westTile);
                expect(tile.canMoveWest()).toBe(true);
            });
        });

        describe(`When reset is called...`, () => {
            test(`It should reset the tile.`, () => {
                const tile = new Tile(10);
                tile.markBeenNorth();
                tile.markBeenEast();
                tile.markBeenSouth();
                tile.markBeenWest();
                tile.visit();
                tile.reset();
                expect(tile.hasBeenNorth()).toBe(false);
                expect(tile.hasBeenEast()).toBe(false);
                expect(tile.hasBeenSouth()).toBe(false);
                expect(tile.hasBeenWest()).toBe(false);
                expect(tile.visited).toBe(false);
            });
        });

        describe(`When isTrailhead is called...`, () => {
            test(`It should return true when the elevation is 0.`, () => {
                const tile = new Tile(0);
                expect(tile.isTrailhead()).toBe(true);
            });

            test(`It should return false when the elevation is not 0.`, () => {
                const tile = new Tile(1);
                expect(tile.isTrailhead()).toBe(false);
            });
        });

        describe(`When isSummit is called...`, () => {
            test(`It should return true when the elevation is 9.`, () => {
                const tile = new Tile(9);
                expect(tile.isSummit()).toBe(true);
            });

            test(`It should return false when the elevation is not 9.`, () => {
                const tile = new Tile(8);
                expect(tile.isSummit()).toBe(false);
            });
        });
    });

    describe('HikingMap', () => {
        describe(`When the constructor is called...`, () => {
            test(`Then the hiking map should be initialized correctly.`, () => {
                const hikingMap = new HikingMap();
                expect(hikingMap.tiles).toStrictEqual([]);
            });
        });

        describe(`When addRow is called...`, () => {
            test(`It should add a row of tiles to the hiking map.`, () => {
                const hikingMap = new HikingMap();
                const row = [new Tile(0), new Tile(1), new Tile(2)];
                hikingMap.addRow(row);
                expect(hikingMap.tiles).toStrictEqual([row]);
            });

            test(`It should add multiple rows of tiles to the hiking map.`, () => {
                const hikingMap = new HikingMap();
                const row1 = [new Tile(0), new Tile(1), new Tile(2)];
                const row2 = [new Tile(3), new Tile(4), new Tile(5)];
                hikingMap.addRow(row1);
                hikingMap.addRow(row2);
                expect(hikingMap.tiles).toStrictEqual([row1, row2]);
            });
        });

        describe(`When connectTiles is called...`, () => {
            test(`It should connect the tiles in the hiking map.`, () => {
                const hikingMap = new HikingMap();
                const row1 = [new Tile(0), new Tile(1), new Tile(2)];
                const row2 = [new Tile(3), new Tile(4), new Tile(5)];
                hikingMap.addRow(row1);
                hikingMap.addRow(row2);
                hikingMap.connectTiles();

                expect(row1[0].north).toBe(null);
                expect(row1[1].north).toBe(null);
                expect(row1[2].north).toBe(null);
                expect(row1[0].east).toBe(row1[1]);
                expect(row1[1].east).toBe(row1[2]);
                expect(row1[2].east).toBe(null);
                expect(row1[0].south).toBe(row2[0]);
                expect(row1[1].south).toBe(row2[1]);
                expect(row1[2].south).toBe(row2[2]);
                expect(row1[0].west).toBe(null);
                expect(row1[1].west).toBe(row1[0]);
                expect(row1[2].west).toBe(row1[1]);

                expect(row2[0].north).toBe(row1[0]);
                expect(row2[1].north).toBe(row1[1]);
                expect(row2[2].north).toBe(row1[2]);
                expect(row2[0].east).toBe(row2[1]);
                expect(row2[1].east).toBe(row2[2]);
                expect(row2[2].east).toBe(null);
                expect(row2[0].south).toBe(null);
                expect(row2[1].south).toBe(null);
                expect(row2[2].south).toBe(null);
                expect(row2[0].west).toBe(null);
                expect(row2[1].west).toBe(row2[0]);
                expect(row2[2].west).toBe(row2[1]);

            });
        });

        describe(`When reset is called...`, () => {
            test(`It should reset the hiking map.`, () => {
                const hikingMap = new HikingMap();
                const row1 = [new Tile(0), new Tile(1), new Tile(2)];
                const row2 = [new Tile(3), new Tile(4), new Tile(5)];
                hikingMap.addRow(row1);
                hikingMap.addRow(row2);
                hikingMap.connectTiles();
                hikingMap.tiles.forEach(row => {
                    row.forEach(tile => {
                        tile.markBeenNorth();
                        tile.markBeenEast();
                        tile.markBeenSouth();
                        tile.markBeenWest();
                        tile.visit();
                    });
                });

                hikingMap.reset();

                hikingMap.tiles.forEach(row => {
                    row.forEach(tile => {
                        expect(tile.hasBeenNorth()).toBe(false);
                        expect(tile.hasBeenEast()).toBe(false);
                        expect(tile.hasBeenSouth()).toBe(false);
                        expect(tile.hasBeenWest()).toBe(false);
                        expect(tile.visited).toBe(false);
                    });
                });
            });
        });

        describe(`When calculateScore is called...`, () => {
            test(`It should calculate the score for the default hiking map as 0.`, () => {
                const hikingMap = new HikingMap();
                const row1 = [new Tile(0), new Tile(1), new Tile(2)];
                const row2 = [new Tile(3), new Tile(4), new Tile(5)];
                hikingMap.addRow(row1);
                hikingMap.addRow(row2);
                hikingMap.connectTiles();
                const score = hikingMap.calculateScore();

                expect(score).toBe(0);
            });

            test(`It should calculate the score for a hiking map with a score of 1.`, () => {
                const hikingMap = new HikingMap();
                const row1 = [new Tile(0), new Tile(1), new Tile(2)];
                const row2 = [new Tile(3), new Tile(4), new Tile(9)];
                hikingMap.addRow(row1);
                hikingMap.addRow(row2);
                hikingMap.connectTiles();
                row2[2].visit();
                const score = hikingMap.calculateScore();

                expect(score).toBe(1);
            });
        });
    });

    describe('Hiker', () => {
        describe(`When the constructor is called...`, () => {
            test(`Then the hiker should be initialized correctly.`, () => {
                const startingTile = new Tile(0);
                const hiker = new Hiker(startingTile);
                expect(hiker.startingTile).toBe(startingTile);
                expect(hiker.currentTile).toBe(startingTile);
            });
        });

        describe(`When moveNorth is called...`, () => {
            test(`It should move the hiker north.`, () => {
                const startingTile = new Tile(0);
                const northTile = new Tile(1);
                startingTile.setNorth(northTile);
                const hiker = new Hiker(startingTile);
                hiker.moveNorth();
                expect(hiker.currentTile).toBe(northTile);
            });
        });

        describe(`When moveEast is called...`, () => {
            test(`It should move the hiker east.`, () => {
                const startingTile = new Tile(0);
                const eastTile = new Tile(1);
                startingTile.setEast(eastTile);
                const hiker = new Hiker(startingTile);
                hiker.moveEast();
                expect(hiker.currentTile).toBe(eastTile);
            });
        });

        describe(`When moveSouth is called...`, () => {
            test(`It should move the hiker south.`, () => {
                const startingTile = new Tile(0);
                const southTile = new Tile(1);
                startingTile.setSouth(southTile);
                const hiker = new Hiker(startingTile);
                hiker.moveSouth();
                expect(hiker.currentTile).toBe(southTile);
            });
        });

        describe(`When moveWest is called...`, () => {
            test(`It should move the hiker west.`, () => {
                const startingTile = new Tile(0);
                const westTile = new Tile(1);
                startingTile.setWest(westTile);
                const hiker = new Hiker(startingTile);
                hiker.moveWest();
                expect(hiker.currentTile).toBe(westTile);
            });
        });

        describe(`When atSummit is called...`, () => {
            test(`It should return true when the hiker is at the summit.`, () => {
                const startingTile = new Tile(9);
                const hiker = new Hiker(startingTile);
                expect(hiker.atSummit()).toBe(true);
            });

            test(`It should return false when the hiker is not at the summit.`, () => {
                const startingTile = new Tile(8);
                const hiker = new Hiker(startingTile);
                expect(hiker.atSummit()).toBe(false);
            });
        });
    });
});