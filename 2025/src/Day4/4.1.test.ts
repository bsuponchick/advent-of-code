import { describe, expect, test } from '@jest/globals';
import { Tile, Grid } from './4.1.logic';

describe('Day 4 - Part 1', () => {
    describe(`Tile`, () => {
        describe(`Constructor`, () => {
            test(`should create a new Tile object`, () => {
                const tile = new Tile({ x: 0, y: 0 }, '.');
                expect(tile.coordinate).toEqual({ x: 0, y: 0 });
                expect(tile.type).toEqual('.');
            });
        });

        describe(`When isEmpty is called...`, () => {
            test(`should return true if the type is '.'`, () => {
                const tile = new Tile({ x: 0, y: 0 }, '.');
                expect(tile.isEmpty()).toBe(true);
            });

            test(`should return false if the type is not '.'`, () => {
                const tile = new Tile({ x: 0, y: 0 }, '@');
                expect(tile.isEmpty()).toBe(false);
            });
        });

        describe(`When isPaper is called...`, () => {
            test(`should return true if the type is '@'`, () => {
                const tile = new Tile({ x: 0, y: 0 }, '@');
                expect(tile.isPaper()).toBe(true);
            });
        });

        describe(`When canForkliftAccess is called...`, () => {
            test(`should return false if the tile has more than four paper neighbors`, () => {
                const tile = new Tile({ x: 0, y: 0 }, '.');
                tile.north = new Tile({ x: 0, y: 1 }, '@');
                tile.east = new Tile({ x: 1, y: 0 }, '@');
                tile.south = new Tile({ x: 0, y: -1 }, '@');
                tile.west = new Tile({ x: -1, y: 0 }, '@');
                tile.northEast = new Tile({ x: 1, y: 1 }, '@');
                tile.southWest = new Tile({ x: -1, y: -1 }, '@');
                tile.southEast = new Tile({ x: 1, y: -1 }, '@');
                tile.northWest = new Tile({ x: -1, y: 1 }, '@');
                expect(tile.canForkliftAccess()).toBe(false);
            });

            test(`should return true if the tile has fewer than four paper neighbors`, () => {
                const tile = new Tile({ x: 0, y: 0 }, '.');
                tile.north = new Tile({ x: 0, y: 1 }, '.');
                tile.east = new Tile({ x: 1, y: 0 }, '@');
                tile.south = new Tile({ x: 0, y: -1 }, '@');
                tile.west = new Tile({ x: -1, y: 0 }, '@');
                tile.northEast = new Tile({ x: 1, y: 1 }, '.');
                tile.southWest = new Tile({ x: -1, y: -1 }, '.');
                tile.southEast = new Tile({ x: 1, y: -1 }, '.');
                tile.northWest = new Tile({ x: -1, y: 1 }, '.');
                expect(tile.canForkliftAccess()).toBe(true);
            });
        });
    });

    describe(`Grid`, () => {
        describe(`Constructor`, () => {
            test(`should create a new Grid object`, () => {
                const grid = new Grid();
                expect(grid.tiles).toEqual([]);
            });
        });

        describe(`When addRow is called...`, () => {
            test(`should add a new row to the grid`, () => {
                const grid = new Grid();
                grid.addRow([new Tile({ x: 0, y: 0 }, '.'), new Tile({ x: 1, y: 0 }, '.'), new Tile({ x: 2, y: 0 }, '.')]);
                expect(grid.tiles).toEqual([[new Tile({ x: 0, y: 0 }, '.'), new Tile({ x: 1, y: 0 }, '.'), new Tile({ x: 2, y: 0 }, '.')]]);
            });
        });

        describe(`When connectTiles is called...`, () => {
            test(`should connect the tiles in the grid`, () => {
                const grid = new Grid();
                grid.addRow([new Tile({ x: 0, y: 0 }, '.'), new Tile({ x: 1, y: 0 }, '.'), new Tile({ x: 2, y: 0 }, '.')]);
                grid.connectTiles();
                expect(grid.tiles[0][0].north).toEqual(null);
                expect(grid.tiles[0][0].east).toEqual(grid.tiles[0][1]);
                expect(grid.tiles[0][0].south).toEqual(null);
                expect(grid.tiles[0][0].west).toEqual(null);

                expect(grid.tiles[0][1].north).toEqual(null);
                expect(grid.tiles[0][1].east).toEqual(grid.tiles[0][2]);
                expect(grid.tiles[0][1].south).toEqual(null);
                expect(grid.tiles[0][1].west).toEqual(grid.tiles[0][0]);

                expect(grid.tiles[0][2].north).toEqual(null);
                expect(grid.tiles[0][2].east).toEqual(null);
                expect(grid.tiles[0][2].south).toEqual(null);
                expect(grid.tiles[0][2].west).toEqual(grid.tiles[0][1]);
            });

            test(`should connect the diagonals in the grid`, () => {
                const grid = new Grid();
                grid.addRow([new Tile({ x: 0, y: 0 }, '.'), new Tile({ x: 1, y: 0 }, '.'), new Tile({ x: 2, y: 0 }, '.')]);
                grid.addRow([new Tile({ x: 0, y: 1 }, '.'), new Tile({ x: 1, y: 1 }, '.'), new Tile({ x: 2, y: 1 }, '.')]);
                grid.connectTiles();

                expect(grid.tiles[0][0].north).toEqual(null);
                expect(grid.tiles[0][0].east).toEqual(grid.tiles[0][1]);
                expect(grid.tiles[0][0].south).toEqual(grid.tiles[1][0]);
                expect(grid.tiles[0][0].west).toEqual(null);
                expect(grid.tiles[0][0].northEast).toEqual(null);
                expect(grid.tiles[0][0].southWest).toEqual(null);
                expect(grid.tiles[0][0].southEast).toEqual(grid.tiles[1][1]);
                expect(grid.tiles[0][0].northWest).toEqual(null);

                expect(grid.tiles[0][1].north).toEqual(null);
                expect(grid.tiles[0][1].east).toEqual(grid.tiles[0][2]);
                expect(grid.tiles[0][1].south).toEqual(grid.tiles[1][1]);
                expect(grid.tiles[0][1].west).toEqual(grid.tiles[0][0]);
                expect(grid.tiles[0][1].northEast).toEqual(null);
                expect(grid.tiles[0][1].southWest).toEqual(grid.tiles[1][0]);
                expect(grid.tiles[0][1].southEast).toEqual(grid.tiles[1][2]);
                expect(grid.tiles[0][1].northWest).toEqual(null);

                expect(grid.tiles[0][2].north).toEqual(null);
                expect(grid.tiles[0][2].east).toEqual(null);
                expect(grid.tiles[0][2].south).toEqual(grid.tiles[1][2]);
                expect(grid.tiles[0][2].west).toEqual(grid.tiles[0][1]);
                expect(grid.tiles[0][2].northEast).toEqual(null);
                expect(grid.tiles[0][2].southWest).toEqual(grid.tiles[1][1]);
                expect(grid.tiles[0][2].southEast).toEqual(null);
                expect(grid.tiles[0][2].northWest).toEqual(null);

                expect(grid.tiles[1][0].north).toEqual(grid.tiles[0][0]);
                expect(grid.tiles[1][0].east).toEqual(grid.tiles[1][1]);
                expect(grid.tiles[1][0].south).toEqual(null);
                expect(grid.tiles[1][0].west).toEqual(null);
                expect(grid.tiles[1][0].northEast).toEqual(grid.tiles[0][1]);
                expect(grid.tiles[1][0].southWest).toEqual(null);
                expect(grid.tiles[1][0].southEast).toEqual(null);
                expect(grid.tiles[1][0].northWest).toEqual(null);

                expect(grid.tiles[1][1].north).toEqual(grid.tiles[0][1]);
                expect(grid.tiles[1][1].east).toEqual(grid.tiles[1][2]);
                expect(grid.tiles[1][1].south).toEqual(null);
                expect(grid.tiles[1][1].west).toEqual(grid.tiles[1][0]);
                expect(grid.tiles[1][1].northEast).toEqual(grid.tiles[0][2]);
                expect(grid.tiles[1][1].southWest).toEqual(null);
                expect(grid.tiles[1][1].southEast).toEqual(null);
                expect(grid.tiles[1][1].northWest).toEqual(grid.tiles[0][0]);

                expect(grid.tiles[1][2].north).toEqual(grid.tiles[0][2]);
                expect(grid.tiles[1][2].east).toEqual(null);
                expect(grid.tiles[1][2].south).toEqual(null);
                expect(grid.tiles[1][2].west).toEqual(grid.tiles[1][1]);
                expect(grid.tiles[1][2].northEast).toEqual(null);
                expect(grid.tiles[1][2].southWest).toEqual(null);
                expect(grid.tiles[1][2].southEast).toEqual(null);
                expect(grid.tiles[1][2].northWest).toEqual(grid.tiles[0][1]);
            });
        });
    });
});