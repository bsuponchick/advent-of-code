import { describe, expect, test } from '@jest/globals';
import { Tile } from './7.1.logic';

describe('Day 7 - Part 1', () => {
    describe(`Tile...`, () => {
        describe(`Constructor`, () => {
            test(`should create a new Tile object`, () => {
                const tile = new Tile('^');
                expect(tile.value).toBe('^');
                expect(tile.north).toBeNull();
                expect(tile.east).toBeNull();
                expect(tile.south).toBeNull();
                expect(tile.west).toBeNull();
            });
        });

        describe(`isSplitter`, () => {
            test(`should return true if the tile is a splitter`, () => {
                const tile = new Tile('^');
                expect(tile.isSplitter()).toBe(true);
            });
        });

        describe(`isTachyon`, () => {
            test(`should return true if the tile is a tachyon`, () => {
                const tile = new Tile('|');
                expect(tile.isTachyon()).toBe(true);
            });
        });

        describe(`isStart`, () => {
            test(`should return true if the tile is a start`, () => {
                const tile = new Tile('S');
                expect(tile.isStart()).toBe(true);
            });
        });

        describe(`isEmpty`, () => {
            test(`should return true if the tile is empty`, () => {
                const tile = new Tile('.');
                expect(tile.isEmpty()).toBe(true);
            });
        });
        
        describe(`setNorth`, () => {
            test(`should set the north tile`, () => {
                const tile = new Tile('^');
                const northTile = new Tile('^');
                tile.setNorth(northTile);
                expect(tile.north).toBe(northTile);
            });
        });
        
        describe(`setEast`, () => {
            test(`should set the east tile`, () => {
                const tile = new Tile('^');
                const eastTile = new Tile('^');
                tile.setEast(eastTile);
                expect(tile.east).toBe(eastTile);
            });
        });
        
        describe(`setSouth`, () => {
            test(`should set the south tile`, () => {
                const tile = new Tile('^');
                const southTile = new Tile('^');
                tile.setSouth(southTile);
                expect(tile.south).toBe(southTile);
            });
        });

        describe(`setWest`, () => {
            test(`should set the west tile`, () => {
                const tile = new Tile('^');
                const westTile = new Tile('^');
                tile.setWest(westTile);
                expect(tile.west).toBe(westTile);
            });
        });

        describe(`getNorth`, () => {
            test(`should get the north tile`, () => {
                const tile = new Tile('^');
                const northTile = new Tile('^');
                tile.setNorth(northTile);
                expect(tile.getNorth()).toBe(northTile);
            });
        });
        
        
        describe(`getEast`, () => {
            test(`should get the east tile`, () => {
                const tile = new Tile('^');
                const eastTile = new Tile('^');
                tile.setEast(eastTile);
                expect(tile.getEast()).toBe(eastTile);
            });
        });
        
        describe(`getSouth`, () => {
            test(`should get the south tile`, () => {
                const tile = new Tile('^');
                const southTile = new Tile('^');
                tile.setSouth(southTile);
                expect(tile.getSouth()).toBe(southTile);
            });
        });
        
        describe(`getWest`, () => {
            test(`should get the west tile`, () => {
                const tile = new Tile('^');
                const westTile = new Tile('^');
                tile.setWest(westTile);
                expect(tile.getWest()).toBe(westTile);
            });
        });
    });
});