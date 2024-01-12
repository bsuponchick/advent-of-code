import { describe, expect, test } from '@jest/globals';
import { Tile, TileType, Map } from './1.logic';

describe('Day 23 - Part 1', () => {
    describe('Tile', () => {
        describe(`constructor`, () => {
            test(`should correctly parse a tile`, () => {
                const tile = new Tile(TileType.Path);
                expect(tile.value).toBe(TileType.Path);
                expect(tile.id).toBeDefined();
            });
        });

        describe(`setIsStart`, () => {
            test(`should correctly set the start flag`, () => {
                const tile = new Tile(TileType.Path);
                expect(tile.isStart).toBe(false);
                tile.setIsStart();
                expect(tile.isStart).toBe(true);
            });
        });

        describe(`setIsGoal`, () => {
            test(`should correctly set the goal flag`, () => {
                const tile = new Tile(TileType.Path);
                expect(tile.isGoal).toBe(false);
                tile.setIsGoal();
                expect(tile.isGoal).toBe(true);
            });
        });

        describe(`setNorth`, () => {
            test(`should correctly set the north tile`, () => {
                const tile = new Tile(TileType.Path);
                const northTile = new Tile(TileType.Path);
                tile.setNorth(northTile);
                expect(tile.north).toBe(northTile);
            });
        });

        describe(`setEast`, () => {
            test(`should correctly set the east tile`, () => {
                const tile = new Tile(TileType.Path);
                const eastTile = new Tile(TileType.Path);
                tile.setEast(eastTile);
                expect(tile.east).toBe(eastTile);
            });
        });

        describe(`setSouth`, () => {
            test(`should correctly set the south tile`, () => {
                const tile = new Tile(TileType.Path);
                const southTile = new Tile(TileType.Path);
                tile.setSouth(southTile);
                expect(tile.south).toBe(southTile);
            });
        });

        describe(`setWest`, () => {
            test(`should correctly set the west tile`, () => {
                const tile = new Tile(TileType.Path);
                const westTile = new Tile(TileType.Path);
                tile.setWest(westTile);
                expect(tile.west).toBe(westTile);
            });
        });

        describe(`isWall`, () => {
            test(`should return true if the tile is a wall`, () => {
                const tile = new Tile(TileType.Wall);
                expect(tile.isWall()).toBe(true);
            });

            test(`should return false if the tile is not a wall`, () => {
                const tile = new Tile(TileType.Path);
                expect(tile.isWall()).toBe(false);
            });
        });

        describe(`isPath`, () => {
            test(`should return true if the tile is a path`, () => {
                const tile = new Tile(TileType.Path);
                expect(tile.isPath()).toBe(true);
            });

            test(`should return false if the tile is not a path`, () => {
                const tile = new Tile(TileType.Wall);
                expect(tile.isPath()).toBe(false);
            });

            test(`should return true if the tile is a north slope`, () => {
                const tile = new Tile(TileType.NorthSlope);
                expect(tile.isPath()).toBe(true);
            });

            test(`should return true if the tile is a east slope`, () => {
                const tile = new Tile(TileType.EastSlope);
                expect(tile.isPath()).toBe(true);
            });

            test(`should return true if the tile is a south slope`, () => {
                const tile = new Tile(TileType.SouthSlope);
                expect(tile.isPath()).toBe(true);
            });

            test(`should return true if the tile is a west slope`, () => {
                const tile = new Tile(TileType.WestSlope);
                expect(tile.isPath()).toBe(true);
            });
        });

        describe(`canMoveNorth`, () => {
            test(`should return false if there is no north tile`, () => {
                const tile = new Tile(TileType.Path);
                expect(tile.canMoveNorth()).toBe(false);
            });

            test(`should return false if the north tile is a wall`, () => {
                const tile = new Tile(TileType.Path);
                const northTile = new Tile(TileType.Wall);
                tile.setNorth(northTile);
                expect(tile.canMoveNorth()).toBe(false);
            });

            test(`should return true if the tile is a path and the north tile is a path`, () => {
                const tile = new Tile(TileType.Path);
                const northTile = new Tile(TileType.Path);
                tile.setNorth(northTile);
                expect(tile.canMoveNorth()).toBe(true);
            });

            test(`should return false if the tile is a north slope and the north tile is a path`, () => {
                const tile = new Tile(TileType.NorthSlope);
                const northTile = new Tile(TileType.Path);
                tile.setNorth(northTile);
                expect(tile.canMoveNorth()).toBe(true);
            });

            test(`should return false if the tile is a south slope and the north tile is a path`, () => {
                const tile = new Tile(TileType.SouthSlope);
                const northTile = new Tile(TileType.Path);
                tile.setNorth(northTile);
                expect(tile.canMoveNorth()).toBe(false);
            });

            test(`should return false if the tile is a west slope and the north tile is a path`, () => {
                const tile = new Tile(TileType.WestSlope);
                const northTile = new Tile(TileType.Path);
                tile.setNorth(northTile);
                expect(tile.canMoveNorth()).toBe(false);
            });

            test(`should return false if the tile is a east slope and the north tile is a path`, () => {
                const tile = new Tile(TileType.EastSlope);
                const northTile = new Tile(TileType.Path);
                tile.setNorth(northTile);
                expect(tile.canMoveNorth()).toBe(false);
            });

            test(`should return false if the tile to the north has been visited`, () => {
                const tile = new Tile(TileType.Path);
                const northTile = new Tile(TileType.Path);
                northTile.visited = true;
                tile.setNorth(northTile);
                expect(tile.canMoveNorth()).toBe(false);
            });
        });

        describe(`canMoveEast`, () => {
            test(`should return false if there is no east tile`, () => {
                const tile = new Tile(TileType.Path);
                expect(tile.canMoveEast()).toBe(false);
            });

            test(`should return false if the east tile is a wall`, () => {
                const tile = new Tile(TileType.Path);
                const eastTile = new Tile(TileType.Wall);
                tile.setEast(eastTile);
                expect(tile.canMoveEast()).toBe(false);
            });

            test(`should return true if the tile is a path and the east tile is a path`, () => {
                const tile = new Tile(TileType.Path);
                const eastTile = new Tile(TileType.Path);
                tile.setEast(eastTile);
                expect(tile.canMoveEast()).toBe(true);
            });

            test(`should return true if the tile is an east slope and the east tile is a path`, () => {
                const tile = new Tile(TileType.EastSlope);
                const eastTile = new Tile(TileType.Path);
                tile.setEast(eastTile);
                expect(tile.canMoveEast()).toBe(true);
            });

            test(`should return false if the tile is a south slope and the east tile is a path`, () => {
                const tile = new Tile(TileType.SouthSlope);
                const eastTile = new Tile(TileType.Path);
                tile.setEast(eastTile);
                expect(tile.canMoveEast()).toBe(false);
            });

            test(`should return false if the tile is a west slope and the east tile is a path`, () => {
                const tile = new Tile(TileType.WestSlope);
                const eastTile = new Tile(TileType.Path);
                tile.setEast(eastTile);
                expect(tile.canMoveEast()).toBe(false);
            });

            test(`should return false if the tile is a north slope and the east tile is a path`, () => {
                const tile = new Tile(TileType.NorthSlope);
                const eastTile = new Tile(TileType.Path);
                tile.setEast(eastTile);
                expect(tile.canMoveEast()).toBe(false);
            });

            test(`should return false if the tile to the east has been visited`, () => {
                const tile = new Tile(TileType.Path);
                const eastTile = new Tile(TileType.Path);
                eastTile.visited = true;
                tile.setEast(eastTile);
                expect(tile.canMoveEast()).toBe(false);
            });
        });

        describe(`canMoveSouth`, () => {
            test(`should return false if there is no south tile`, () => {
                const tile = new Tile(TileType.Path);
                expect(tile.canMoveSouth()).toBe(false);
            });

            test(`should return false if the south tile is a wall`, () => {
                const tile = new Tile(TileType.Path);
                const southTile = new Tile(TileType.Wall);
                tile.setSouth(southTile);
                expect(tile.canMoveSouth()).toBe(false);
            });

            test(`should return true if the tile is a path and the south tile is a path`, () => {
                const tile = new Tile(TileType.Path);
                const southTile = new Tile(TileType.Path);
                tile.setSouth(southTile);
                expect(tile.canMoveSouth()).toBe(true);
            });

            test(`should return true if the tile is a south slope and the south tile is a path`, () => {
                const tile = new Tile(TileType.SouthSlope);
                const southTile = new Tile(TileType.Path);
                tile.setSouth(southTile);
                expect(tile.canMoveSouth()).toBe(true);
            });

            test(`should return false if the tile is a west slope and the south tile is a path`, () => {
                const tile = new Tile(TileType.WestSlope);
                const southTile = new Tile(TileType.Path);
                tile.setSouth(southTile);
                expect(tile.canMoveSouth()).toBe(false);
            });

            test(`should return false if the tile is a north slope and the south tile is a path`, () => {
                const tile = new Tile(TileType.NorthSlope);
                const southTile = new Tile(TileType.Path);
                tile.setSouth(southTile);
                expect(tile.canMoveSouth()).toBe(false);
            });

            test(`should return false if the tile is an east slope and the south tile is a path`, () => {
                const tile = new Tile(TileType.EastSlope);
                const southTile = new Tile(TileType.Path);
                tile.setSouth(southTile);
                expect(tile.canMoveSouth()).toBe(false);
            });

            test(`should return false if the tile to the south has been visited`, () => {
                const tile = new Tile(TileType.Path);
                const southTile = new Tile(TileType.Path);
                southTile.visited = true;
                tile.setSouth(southTile);
                expect(tile.canMoveSouth()).toBe(false);
            });
        });

        describe(`canMoveWest`, () => {
            test(`should return false if there is no west tile`, () => {
                const tile = new Tile(TileType.Path);
                expect(tile.canMoveWest()).toBe(false);
            });

            test(`should return false if the west tile is a wall`, () => {
                const tile = new Tile(TileType.Path);
                const westTile = new Tile(TileType.Wall);
                tile.setWest(westTile);
                expect(tile.canMoveWest()).toBe(false);
            });

            test(`should return true if the tile is a path and the west tile is a path`, () => {
                const tile = new Tile(TileType.Path);
                const westTile = new Tile(TileType.Path);
                tile.setWest(westTile);
                expect(tile.canMoveWest()).toBe(true);
            });

            test(`should return true if the tile is a west slope and the west tile is a path`, () => {
                const tile = new Tile(TileType.WestSlope);
                const westTile = new Tile(TileType.Path);
                tile.setWest(westTile);
                expect(tile.canMoveWest()).toBe(true);
            });

            test(`should return false if the tile is a north slope and the west tile is a path`, () => {
                const tile = new Tile(TileType.NorthSlope);
                const westTile = new Tile(TileType.Path);
                tile.setWest(westTile);
                expect(tile.canMoveWest()).toBe(false);
            });

            test(`should return false if the tile is a south slope and the west tile is a path`, () => {
                const tile = new Tile(TileType.SouthSlope);
                const westTile = new Tile(TileType.Path);
                tile.setWest(westTile);
                expect(tile.canMoveWest()).toBe(false);
            });

            test(`should return false if the tile is an east slope and the west tile is a path`, () => {
                const tile = new Tile(TileType.EastSlope);
                const westTile = new Tile(TileType.Path);
                tile.setWest(westTile);
                expect(tile.canMoveWest()).toBe(false);
            });

            test(`should return false if the tile to the west has been visited`, () => {
                const tile = new Tile(TileType.Path);
                const westTile = new Tile(TileType.Path);
                westTile.visited = true;
                tile.setWest(westTile);
                expect(tile.canMoveWest()).toBe(false);
            });
        });
    });

    describe(`Map`, () => {
        describe(`constructor`, () => {
            test(`should correctly parse a map`, () => {
                const map = new Map();

                expect(map.tiles.length).toBe(0);
            });
        });

        describe(`addRow`, () => {
            test(`should correctly add a row to the map`, () => {
                const map = new Map();
                const tile = new Tile(TileType.Path);
                const row = [tile];

                map.addRow(row);

                expect(map.tiles.length).toBe(1);
                expect(map.tiles[0].length).toBe(1);
                expect(map.tiles[0][0]).toBe(tile);
            });

            test(`should correctly add multiple rows to the map`, () => {
                const map = new Map();
                const tile = new Tile(TileType.Path);
                const row = [tile];

                map.addRow(row);
                map.addRow(row);

                expect(map.tiles.length).toBe(2);
                expect(map.tiles[0].length).toBe(1);
                expect(map.tiles[1].length).toBe(1);
                expect(map.tiles[0][0]).toBe(tile);
                expect(map.tiles[1][0]).toBe(tile);
            });
        });

        describe(`identifyStartingNode`, () => {
            test(`should correctly identify the starting node`, () => {
                const map = new Map();
                const start = new Tile(TileType.Path);
                const goal = new Tile(TileType.Path);
                const wall = new Tile(TileType.Wall);

                map.addRow([wall, start, wall]);
                map.addRow([wall, goal, wall]);
                map.identifyStartingTile();

                expect(start.isStart).toBe(true);
            });
        });

        describe(`identifyGoalNode`, () => {
            test(`should correctly identify the goal node`, () => {
                const map = new Map();
                const start = new Tile(TileType.Path);
                const goal = new Tile(TileType.Path);
                const wall = new Tile(TileType.Wall);

                map.addRow([wall, start, wall]);
                map.addRow([wall, goal, wall]);
                map.identifyGoalTile();

                expect(goal.isGoal).toBe(true);
            });
        });

        describe(`getStartingTile`, () => {
            test(`should return the starting tile`, () => {
                const map = new Map();
                const start = new Tile(TileType.Path);
                const goal = new Tile(TileType.Path);
                const wall = new Tile(TileType.Wall);

                map.addRow([wall, start, wall]);
                map.addRow([wall, goal, wall]);
                map.identifyStartingTile();

                expect(map.getStartingTile()).toBe(start);
            });
        });

        describe(`getGoalTile`, () => {
            test(`should return the goal tile`, () => {
                const map = new Map();
                const start = new Tile(TileType.Path);
                const goal = new Tile(TileType.Path);
                const wall = new Tile(TileType.Wall);

                map.addRow([wall, start, wall]);
                map.addRow([wall, goal, wall]);
                map.identifyGoalTile();

                expect(map.getGoalTile()).toBe(goal);
            });
        });
    });
});