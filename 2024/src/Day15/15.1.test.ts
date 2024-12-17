import { MapTile, WarehouseMap, Robot } from './15.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 15 - Part 1', () => {
    describe(`MapTile`, () => {
        describe(`Constructor`, () => {
            test(`should create a new MapTile object`, () => {
                const coordinate = { x: 0, y: 0 };
                const type = '.';
                const mapTile = new MapTile(coordinate, type);
                expect(mapTile.coordinate).toEqual(coordinate);
                expect(mapTile.type).toEqual(type);
                expect(mapTile.north).toBeNull();
                expect(mapTile.east).toBeNull();
                expect(mapTile.south).toBeNull();
                expect(mapTile.west).toBeNull();
            });
        });

        describe(`When isWall is called...`, () => {
            test(`should return true if the type is '#'`, () => {
                const coordinate = { x: 0, y: 0 };
                const type = '#';
                const mapTile = new MapTile(coordinate, type);
                expect(mapTile.isWall()).toBeTruthy();
            });

            test(`should return false if the type is not '#'`, () => {
                const coordinate = { x: 0, y: 0 };
                const type = '.';
                const mapTile = new MapTile(coordinate, type);
                expect(mapTile.isWall()).toBeFalsy();
            });
        });

        describe(`When isBox is called...`, () => {
            test(`should return true if the type is 'O'`, () => {
                const coordinate = { x: 0, y: 0 };
                const type = 'O';
                const mapTile = new MapTile(coordinate, type);
                expect(mapTile.isBox()).toBeTruthy();
            });

            test(`should return false if the type is not 'O'`, () => {
                const coordinate = { x: 0, y: 0 };
                const type = '.';
                const mapTile = new MapTile(coordinate, type);
                expect(mapTile.isBox()).toBeFalsy();
            });
        });

        describe(`When isEmpty is called...`, () => {
            test(`should return true if the type is '.'`, () => {
                const coordinate = { x: 0, y: 0 };
                const type = '.';
                const mapTile = new MapTile(coordinate, type);
                expect(mapTile.isEmpty()).toBeTruthy();
            });

            test(`should return false if the type is not '.'`, () => {
                const coordinate = { x: 0, y: 0 };
                const type = '#';
                const mapTile = new MapTile(coordinate, type);
                expect(mapTile.isEmpty()).toBeFalsy();
            });
        });

        describe(`When isRobot is called...`, () => {
            test(`should return true if the type is '@'`, () => {
                const coordinate = { x: 0, y: 0 };
                const type = '@';
                const mapTile = new MapTile(coordinate, type);
                expect(mapTile.isRobot()).toBeTruthy();
            });

            test(`should return false if the type is not '@'`, () => {
                const coordinate = { x: 0, y: 0 };
                const type = '.';
                const mapTile = new MapTile(coordinate, type);
                expect(mapTile.isRobot()).toBeFalsy();
            });
        });

        describe(`When pushNorth is called...`, () => {
            test(`should not push north if the tile is a wall`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#.O.#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[1][1];
                testTile.pushNorth();

                expect(testTile.north.type).toEqual('#');
            });

            test(`should not push north if the tile is box next to a wall`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#.O.#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[2][2];
                testTile.pushNorth();

                expect(testTile.north.type).toEqual('O');
            });

            test(`should push north if the tile is box that can move north directly`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#.O.#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[3][1];
                testTile.north.pushNorth();

                expect(testTile.north.type).toEqual('.');
                expect(testTile.north.north.type).toEqual('O');
            });

            test(`should push multiple boxes north if there are multiple boxes that can move north directly`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#OO.#',
                    '#...#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[4][1];
                testTile.north.pushNorth();

                expect(testTile.north.type).toEqual('.');
                expect(testTile.north.north.type).toEqual('O');
                expect(testTile.north.north.north.type).toEqual('O');
            });

            test(`should stop pushing north if there's a gap between boxes`, () => {
                const lines = [
                    '#####',
                    '#...#',
                    '#.O.#',
                    '#O@O#',
                    '#OO.#',
                    '#...#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[5][1];
                testTile.north.pushNorth();

                expect(testTile.north.type).toEqual('.');
                expect(testTile.north.north.type).toEqual('O');
                expect(testTile.north.north.north.type).toEqual('O');
                expect(testTile.north.north.north.north.type).toEqual('.');
            });
        });

        describe(`When pushEast is called...`, () => {
            test(`should not push east if the tile is a wall`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#.O.#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[1][3];
                testTile.pushEast();

                expect(testTile.east.type).toEqual('#');
            });

            test(`should not push east if the tile is box next to a wall`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#.O.#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[2][2];
                testTile.pushEast();

                expect(testTile.east.type).toEqual('O');
            });

            test(`should push east if the tile is box that can move east directly`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#.O.#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[3][1];
                testTile.east.pushEast();

                expect(testTile.east.type).toEqual('.');
                expect(testTile.east.east.type).toEqual('O');
            });

            test(`should push multiple boxes east if there are multiple boxes that can move east directly`, () => {
                const lines = [
                    '######',
                    '#.O..#',
                    '#O@O.#',
                    '#.OO.#',
                    '######'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[3][1];
                testTile.east.pushEast();

                expect(testTile.east.type).toEqual('.');
                expect(testTile.east.east.type).toEqual('O');
                expect(testTile.east.east.east.type).toEqual('O');
            });

            test(`should stop pushing east if there's a gap between boxes`, () => {
                const lines = [
                    '#######',
                    '#.O...#',
                    '#O@O..#',
                    '#.OO..#',
                    '#######'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[3][1];
                testTile.east.pushEast();

                expect(testTile.east.type).toEqual('.');
                expect(testTile.east.east.type).toEqual('O');
                expect(testTile.east.east.east.type).toEqual('O');
                expect(testTile.east.east.east.east.type).toEqual('.');
            });
        });

        describe(`When pushSouth is called...`, () => {
            test(`should not push south if the tile is a wall`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#.O.#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[3][1];
                testTile.pushSouth();

                expect(testTile.south.type).toEqual('#');
            });

            test(`should not push south if the tile is box next to a wall`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#.O.#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[2][2];
                testTile.pushSouth();

                expect(testTile.south.type).toEqual('O');
            });

            test(`should push south if the tile is box that can move south directly`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#.O.#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[1][1];
                testTile.south.pushSouth();

                expect(testTile.south.type).toEqual('.');
                expect(testTile.south.south.type).toEqual('O');
            });

            test(`should push multiple boxes south if there are multiple boxes that can move south directly`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#OO.#',
                    '#...#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[1][1];
                testTile.south.pushSouth();

                expect(testTile.south.type).toEqual('.');
                expect(testTile.south.south.type).toEqual('O');
                expect(testTile.south.south.south.type).toEqual('O');
            });

            test(`should stop pushing south if there's a gap between boxes`, () => {
                const lines = [
                    '#####',
                    '#...#',
                    '#OO.#',
                    '#O@O#',
                    '#.O.#',
                    '#...#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[1][1];
                testTile.south.pushSouth();

                expect(testTile.south.type).toEqual('.');
                expect(testTile.south.south.type).toEqual('O');
                expect(testTile.south.south.south.type).toEqual('O');
                expect(testTile.south.south.south.south.type).toEqual('.');
            });
        });

        describe(`When pushWest is called...`, () => {
            test(`should not push west if the tile is a wall`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#.O.#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[1][1];
                testTile.pushWest();

                expect(testTile.west.type).toEqual('#');
            });

            test(`should not push west if the tile is box next to a wall`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#.O.#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[2][2];
                testTile.pushWest();

                expect(testTile.west.type).toEqual('O');
            });

            test(`should push west if the tile is box that can move west directly`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#.O.#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[1][3];
                testTile.west.pushWest();

                expect(testTile.west.type).toEqual('.');
                expect(testTile.west.west.type).toEqual('O');
            });

            test(`should push multiple boxes west if there are multiple boxes that can move west directly`, () => {
                const lines = [
                    '######',
                    '#.OO.#',
                    '#O@O.#',
                    '#.O..#',
                    '######'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[1][4];
                testTile.west.pushWest();

                expect(testTile.west.type).toEqual('.');
                expect(testTile.west.west.type).toEqual('O');
                expect(testTile.west.west.west.type).toEqual('O');
            });

            test(`should stop pushing west if there's a gap between boxes`, () => {
                const lines = [
                    '#######',
                    '#..OO.#',
                    '#O@O..#',
                    '#.OO..#',
                    '#######'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const testTile = warehouseMap.tiles[1][5];
                testTile.west.pushWest();

                expect(testTile.west.type).toEqual('.');
                expect(testTile.west.west.type).toEqual('O');
                expect(testTile.west.west.west.type).toEqual('O');
                expect(testTile.west.west.west.west.type).toEqual('.');
            });
        });

        describe(`When calculateGPSCoordinate is called...`, () => {
            test(`should return 0 if the tile is not a box`, () => {
                const coordinate = { x: 1, y: 1 };
                const type = '.';
                const mapTile = new MapTile(coordinate, type);
                expect(mapTile.calculateGPSCoordinate()).toEqual(0);
            });

            test(`should return 0 if the tile is a wall`, () => {
                const coordinate = { x: 1, y: 1 };
                const type = '#';
                const mapTile = new MapTile(coordinate, type);
                expect(mapTile.calculateGPSCoordinate()).toEqual(0);
            });

            test(`should return 104 if the tile's position is x: 4, y: 1`, () => {
                const coordinate = { x: 4, y: 1 };
                const type = 'O';
                const mapTile = new MapTile(coordinate, type);
                expect(mapTile.calculateGPSCoordinate()).toEqual(104);
            });
        });
    });

    describe(`WarehouseMap`, () => {
        describe(`Constructor`, () => {
            test(`should create a new WarehouseMap object`, () => {
                const warehouseMap = new WarehouseMap();
                expect(warehouseMap.tiles).toEqual([]);
            });
        });

        describe(`When addRow is called...`, () => {
            test(`should add a new row to the tiles array`, () => {
                const warehouseMap = new WarehouseMap();
                const tile = new MapTile({ x: 0, y: 0 }, '.');
                const row: MapTile[] = [tile];
                warehouseMap.addRow(row);
                expect(warehouseMap.tiles).toEqual([row]);
            });
        });

        describe(`When connectTiles is called...`, () => {
            test(`should connect the tiles in the warehouse map`, () => {
                const warehouseMap = new WarehouseMap();
                const tile1 = new MapTile({ x: 0, y: 0 }, '.');
                const tile2 = new MapTile({ x: 1, y: 0 }, '.');
                const tile3 = new MapTile({ x: 0, y: 1 }, '.');
                const tile4 = new MapTile({ x: 1, y: 1 }, '.');

                const row1: MapTile[] = [tile1, tile2];
                const row2: MapTile[] = [tile3, tile4];

                warehouseMap.addRow(row1);
                warehouseMap.addRow(row2);

                warehouseMap.connectTiles();

                expect(tile1.north).toBeNull();
                expect(tile1.east).toEqual(tile2);
                expect(tile1.south).toEqual(tile3);
                expect(tile1.west).toBeNull();

                expect(tile2.north).toBeNull();
                expect(tile2.east).toBeNull();
                expect(tile2.south).toEqual(tile4);
                expect(tile2.west).toEqual(tile1);

                expect(tile3.north).toEqual(tile1);
                expect(tile3.east).toEqual(tile4);
                expect(tile3.south).toBeNull();
                expect(tile3.west).toBeNull();

                expect(tile4.north).toEqual(tile2);
                expect(tile4.east).toBeNull();
                expect(tile4.south).toBeNull();
                expect(tile4.west).toEqual(tile3);
            });
        });

        describe(`When parse is called...`, () => {
            test(`should parse the input lines into a warehouse map`, () => {
                const lines = [
                    '#####',
                    '#.O.#',
                    '#O@O#',
                    '#.O.#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                expect(warehouseMap.tiles.length).toEqual(5);
                
                expect(warehouseMap.tiles[0][0].type).toEqual('#');
                expect(warehouseMap.tiles[0][0].coordinate).toEqual({ x: 0, y: 0 });
                expect(warehouseMap.tiles[0][1].type).toEqual('#');
                expect(warehouseMap.tiles[0][1].coordinate).toEqual({ x: 1, y: 0 });
                expect(warehouseMap.tiles[0][2].type).toEqual('#');
                expect(warehouseMap.tiles[0][2].coordinate).toEqual({ x: 2, y: 0 });
                expect(warehouseMap.tiles[0][3].type).toEqual('#');
                expect(warehouseMap.tiles[0][3].coordinate).toEqual({ x: 3, y: 0 });
                expect(warehouseMap.tiles[0][4].type).toEqual('#');
                expect(warehouseMap.tiles[0][4].coordinate).toEqual({ x: 4, y: 0 });

                expect(warehouseMap.tiles[1][0].type).toEqual('#');
                expect(warehouseMap.tiles[1][0].coordinate).toEqual({ x: 0, y: 1 });
                expect(warehouseMap.tiles[1][1].type).toEqual('.');
                expect(warehouseMap.tiles[1][1].coordinate).toEqual({ x: 1, y: 1 });
                expect(warehouseMap.tiles[1][2].type).toEqual('O');
                expect(warehouseMap.tiles[1][2].coordinate).toEqual({ x: 2, y: 1 });
                expect(warehouseMap.tiles[1][3].type).toEqual('.');
                expect(warehouseMap.tiles[1][3].coordinate).toEqual({ x: 3, y: 1 });
                expect(warehouseMap.tiles[1][4].type).toEqual('#');
                expect(warehouseMap.tiles[1][4].coordinate).toEqual({ x: 4, y: 1 });

                expect(warehouseMap.tiles[2][0].type).toEqual('#');
                expect(warehouseMap.tiles[2][0].coordinate).toEqual({ x: 0, y: 2 });
                expect(warehouseMap.tiles[2][1].type).toEqual('O');
                expect(warehouseMap.tiles[2][1].coordinate).toEqual({ x: 1, y: 2 });
                expect(warehouseMap.tiles[2][2].type).toEqual('@');
                expect(warehouseMap.tiles[2][2].coordinate).toEqual({ x: 2, y: 2 });
                expect(warehouseMap.tiles[2][3].type).toEqual('O');
                expect(warehouseMap.tiles[2][3].coordinate).toEqual({ x: 3, y: 2 });
                expect(warehouseMap.tiles[2][4].type).toEqual('#');
                expect(warehouseMap.tiles[2][4].coordinate).toEqual({ x: 4, y: 2 });

                expect(warehouseMap.tiles[3][0].type).toEqual('#');
                expect(warehouseMap.tiles[3][0].coordinate).toEqual({ x: 0, y: 3 });
                expect(warehouseMap.tiles[3][1].type).toEqual('.');
                expect(warehouseMap.tiles[3][1].coordinate).toEqual({ x: 1, y: 3 });
                expect(warehouseMap.tiles[3][2].type).toEqual('O');
                expect(warehouseMap.tiles[3][2].coordinate).toEqual({ x: 2, y: 3 });
                expect(warehouseMap.tiles[3][3].type).toEqual('.');
                expect(warehouseMap.tiles[3][3].coordinate).toEqual({ x: 3, y: 3 });
                expect(warehouseMap.tiles[3][4].type).toEqual('#');
                expect(warehouseMap.tiles[3][4].coordinate).toEqual({ x: 4, y: 3 });

                expect(warehouseMap.tiles[4][0].type).toEqual('#');
                expect(warehouseMap.tiles[4][0].coordinate).toEqual({ x: 0, y: 4 });
                expect(warehouseMap.tiles[4][1].type).toEqual('#');
                expect(warehouseMap.tiles[4][1].coordinate).toEqual({ x: 1, y: 4 });
                expect(warehouseMap.tiles[4][2].type).toEqual('#');
                expect(warehouseMap.tiles[4][2].coordinate).toEqual({ x: 2, y: 4 });
                expect(warehouseMap.tiles[4][3].type).toEqual('#');
                expect(warehouseMap.tiles[4][3].coordinate).toEqual({ x: 3, y: 4 });
                expect(warehouseMap.tiles[4][4].type).toEqual('#');
                expect(warehouseMap.tiles[4][4].coordinate).toEqual({ x: 4, y: 4 });
            });
        });
    });

    describe(`Robot`, () => {
        describe(`Constructor`, () => {
            test(`should create a new Robot object`, () => {
                const mapTile = new MapTile({ x: 0, y: 0 }, '@');
                const robot = new Robot(mapTile);
                
                expect(robot.tile).toEqual(mapTile);
            });
        });

        describe(`When moveNorth is called...`, () => {
            test(`should move the robot north if the tile is empty`, () => {
                const lines = [
                    '#####',
                    '#...#',
                    '#.@.#',
                    '#...#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const robot = new Robot(warehouseMap.tiles[2][2]);
                robot.moveNorth();

                expect(robot.tile.coordinate).toEqual({ x: 2, y: 1 });
                expect(robot.tile.type).toEqual('@');
                expect(warehouseMap.tiles[2][2].type).toEqual('.');
            });

            test(`should not move the robot north if the tile is a wall`, () => {
                const lines = [
                    '#####',
                    '#.@.#',
                    '#...#',
                    '#...#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const robot = new Robot(warehouseMap.tiles[1][2]);
                robot.moveNorth();

                expect(robot.tile.coordinate).toEqual({ x: 2, y: 1 });
                expect(robot.tile.type).toEqual('@');
            });
        });

        describe(`When moveEast is called...`, () => {
            test(`should move the robot east if the tile is empty`, () => {
                const lines = [
                    '#####',
                    '#...#',
                    '#.@.#',
                    '#...#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const robot = new Robot(warehouseMap.tiles[2][2]);
                robot.moveEast();

                expect(robot.tile.coordinate).toEqual({ x: 3, y: 2 });
                expect(robot.tile.type).toEqual('@');
                expect(warehouseMap.tiles[2][2].type).toEqual('.');
            });

            test(`should not move the robot east if the tile is a wall`, () => {
                const lines = [
                    '#####',
                    '#...#',
                    '#..@#',
                    '#...#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const robot = new Robot(warehouseMap.tiles[2][3]);
                robot.moveEast();

                expect(robot.tile.coordinate).toEqual({ x: 3, y: 2 });
                expect(robot.tile.type).toEqual('@');
            });
        });

        describe(`When moveSouth is called...`, () => {
            test(`should move the robot south if the tile is empty`, () => {
                const lines = [
                    '#####',
                    '#...#',
                    '#.@.#',
                    '#...#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const robot = new Robot(warehouseMap.tiles[2][2]);
                robot.moveSouth();

                expect(robot.tile.coordinate).toEqual({ x: 2, y: 3 });
                expect(robot.tile.type).toEqual('@');
                expect(warehouseMap.tiles[2][2].type).toEqual('.');
            });

            test(`should not move the robot south if the tile is a wall`, () => {
                const lines = [
                    '#####',
                    '#...#',
                    '#...#',
                    '#.@.#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const robot = new Robot(warehouseMap.tiles[3][2]);
                robot.moveSouth();

                expect(robot.tile.coordinate).toEqual({ x: 2, y: 3 });
                expect(robot.tile.type).toEqual('@');
            });
        });

        describe(`When moveWest is called...`, () => {
            test(`should move the robot west if the tile is empty`, () => {
                const lines = [
                    '#####',
                    '#...#',
                    '#.@.#',
                    '#...#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const robot = new Robot(warehouseMap.tiles[2][2]);
                robot.moveWest();

                expect(robot.tile.coordinate).toEqual({ x: 1, y: 2 });
                expect(robot.tile.type).toEqual('@');
                expect(warehouseMap.tiles[2][2].type).toEqual('.');
            });

            test(`should not move the robot west if the tile is a wall`, () => {
                const lines = [
                    '#####',
                    '#...#',
                    '#@..#',
                    '#...#',
                    '#####'
                ];

                const warehouseMap = new WarehouseMap();
                warehouseMap.parse(lines);

                const robot = new Robot(warehouseMap.tiles[2][1]);
                robot.moveWest();

                expect(robot.tile.coordinate).toEqual({ x: 1, y: 2 });
                expect(robot.tile.type).toEqual('@');
            });
        });
    });
});