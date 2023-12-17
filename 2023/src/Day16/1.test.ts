import { describe, expect, test } from '@jest/globals';
import { Tile, Beam } from './1.logic';

describe('Day 16 - Part 1', () => {
    describe(`Tile`, () => {
        describe(`addBeam()`, () => {
            test(`should add beam to tile`, () => {
                const tile = new Tile('/');
                const beam = new Beam('east');
                tile.addBeam(beam);
                expect(tile.beams.length).toBe(1);
                expect(tile.beams[0]).toBe(beam);
            });

            test(`should set the tile as energized when adding a beam`, () => {
                const tile = new Tile('/');
                const beam = new Beam('east');
                tile.addBeam(beam);
                expect(tile.isEnergized()).toBe(true);
            });

            test(`should add the direction of the beam to the beamCache`, () => {
                const tile = new Tile('.');
                const beam = new Beam('east');
                tile.addBeam(beam);
                expect(tile.beamCache.length).toBe(1);
                expect(tile.beamCache[0]).toBe('east');
            });

            test(`should add the direction of the beam to the beamCache only once`, () => {
                const tile = new Tile('.');
                const beam = new Beam('east');
                tile.addBeam(beam);
                tile.addBeam(beam);
                expect(tile.beamCache.length).toBe(1);
                expect(tile.beamCache[0]).toBe('east');
            });

            test(`should not add a beam to the tile if the beamCache already contains the direction of the beam`, () => {
                const tile = new Tile('.');
                const beam = new Beam('east');
                const beam2 = new Beam('east');
                tile.addBeam(beam);
                tile.addBeam(beam2);
                expect(tile.beams.length).toBe(1);
                expect(tile.beams[0]).toBe(beam);
            });
        });

        describe(`removeBeam()`, () => {
            test(`should remove beam from tile`, () => {
                const tile = new Tile('/');
                const beam = new Beam('east');
                tile.addBeam(beam);
                tile.removeBeam(beam);
                expect(tile.beams.length).toBe(0);
            });

            test(`should keep other beams when removing a beam`, () => {
                const tile = new Tile('/');
                const beam1 = new Beam('east');
                const beam2 = new Beam('west');
                tile.addBeam(beam1);
                tile.addBeam(beam2);
                tile.removeBeam(beam1);
                expect(tile.beams.length).toBe(1);
                expect(tile.beams[0]).toBe(beam2);
            });
        });

        describe(`isEnergized()`, () => {
            test(`should return false when tile has no beams`, () => {
                const tile = new Tile('/');
                expect(tile.isEnergized()).toBe(false);
            });

            test(`should return true when a tile has active beams`, () => {
                const tile = new Tile('/');
                const beam = new Beam('east');
                tile.addBeam(beam);
                expect(tile.isEnergized()).toBe(true);
            });

            test(`should return true when a tile has had beams but they have been removed`, () => {
                const tile = new Tile('/');
                const beam = new Beam('east');
                tile.addBeam(beam);
                tile.removeBeam(beam);
                expect(tile.isEnergized()).toBe(true);
            });
        });
    });

    describe(`Beam`, () => {
        describe(`setTile()`, () => {
            test(`should set the tile`, () => {
                const tile = new Tile('/');
                const beam = new Beam('east');
                beam.setTile(tile);
                expect(beam.tile).toBe(tile);
            });

            test(`should remove the beam from the tile if the beam has already visited the tile from the same direction`, () => {
                const tile = new Tile('/');
                const beam = new Beam('east');
                beam.setTile(tile);
                beam.setTile(tile);
                expect(tile.beams.length).toBe(0);
            });

            test(`should change direction to north when moving east to a tile with a / symbol`, () => {
                const tile = new Tile('/');
                const beam = new Beam('east');
                beam.setTile(tile);
                expect(beam.direction).toBe('north');
            });

            test(`should change direction to south when moving east to a tile with a \\ symbol`, () => {
                const tile = new Tile('\\');
                const beam = new Beam('east');
                beam.setTile(tile);
                expect(beam.direction).toBe('south');
            });

            test(`should not change direction when moving east to a tile with a - symbol`, () => {
                const tile = new Tile('-');
                const beam = new Beam('east');
                beam.setTile(tile);
                expect(beam.direction).toBe('east');
            });

            test(`should split beam when moving east into a tile with a | symbol`, () => {
                const tile = new Tile('|');
                const beam = new Beam('east');
                beam.setTile(tile);
                expect(beam.direction).toBe('north');
            });

            test(`should change direction to west when moving south to a tile with a / symbol`, () => {
                const tile = new Tile('/');
                const beam = new Beam('south');
                beam.setTile(tile);
                expect(beam.direction).toBe('west');
            });

            test(`should change direction to east when moving south to a tile with a \\ symbol`, () => {
                const tile = new Tile('\\');
                const beam = new Beam('south');
                beam.setTile(tile);
                expect(beam.direction).toBe('east');
            });

            test(`should not change direction when moving south to a tile with a | symbol`, () => {
                const tile = new Tile('|');
                const beam = new Beam('south');
                beam.setTile(tile);
                expect(beam.direction).toBe('south');
            });

            test(`should split beam when moving south into a tile with a - symbol`, () => {
                const tile = new Tile('-');
                const beam = new Beam('south');
                beam.setTile(tile);
                expect(beam.direction).toBe('west');
            });

            test(`should change direction to south when moving west to a tile with a / symbol`, () => {
                const tile = new Tile('/');
                const beam = new Beam('west');
                beam.setTile(tile);
                expect(beam.direction).toBe('south');
            });

            test(`should change direction to north when moving west to a tile with a \\ symbol`, () => {
                const tile = new Tile('\\');
                const beam = new Beam('west');
                beam.setTile(tile);
                expect(beam.direction).toBe('north');
            });

            test(`should not change direction when moving west to a tile with a - symbol`, () => {
                const tile = new Tile('-');
                const beam = new Beam('west');
                beam.setTile(tile);
                expect(beam.direction).toBe('west');
            });

            test(`should split beam when moving west into a tile with a | symbol`, () => {
                const tile = new Tile('|');
                const beam = new Beam('west');
                beam.setTile(tile);
                expect(beam.direction).toBe('south');
            });

            test(`should change direction to east when moving north to a tile with a / symbol`, () => {
                const tile = new Tile('/');
                const beam = new Beam('north');
                beam.setTile(tile);
                expect(beam.direction).toBe('east');
            });

            test(`should change direction to west when moving north to a tile with a \\ symbol`, () => {
                const tile = new Tile('\\');
                const beam = new Beam('north');
                beam.setTile(tile);
                expect(beam.direction).toBe('west');
            });

            test(`should not change direction when moving north to a tile with a | symbol`, () => {
                const tile = new Tile('|');
                const beam = new Beam('north');
                beam.setTile(tile);
                expect(beam.direction).toBe('north');
            });

            test(`should split beam when moving north into a tile with a - symbol`, () => {
                const tile = new Tile('-');
                const beam = new Beam('north');
                beam.setTile(tile);
                expect(beam.direction).toBe('east');
            });
        });

        describe(`move()`, () => {
            test(`should move the beam to the north tile when the beam is on a tile with a north tile`, () => {
                const tile = new Tile('.');
                const tileNorth = new Tile('/');
                tile.north = tileNorth;
                const beam = new Beam('north');
                beam.setTile(tile);
                beam.move();
                expect(beam.tile).toBe(tileNorth);
            });

            test(`should move the beam to the east tile when the beam is on a tile with a east tile`, () => {
                const tile = new Tile('.');
                const tileEast = new Tile('/');
                tile.east = tileEast;
                const beam = new Beam('east');
                beam.setTile(tile);
                beam.move();
                expect(beam.tile).toBe(tileEast);
            });

            test(`should move the beam to the south tile when the beam is on a tile with a south tile`, () => {
                const tile = new Tile('.');
                const tileSouth = new Tile('/');
                tile.south = tileSouth;
                const beam = new Beam('south');
                beam.setTile(tile);
                beam.move();
                expect(beam.tile).toBe(tileSouth);
            });

            test(`should move the beam to the west tile when the beam is on a tile with a west tile`, () => {
                const tile = new Tile('.');
                const tileWest = new Tile('/');
                tile.west = tileWest;
                const beam = new Beam('west');
                beam.setTile(tile);
                beam.move();
                expect(beam.tile).toBe(tileWest);
            });

            test(`should remove the beam from the tile when the beam is on a tile with no north tile`, () => {
                const tile = new Tile('.');
                const beam = new Beam('north');
                beam.setTile(tile);
                beam.move();
                expect(tile.beams.length).toBe(0);
            });

            test(`should remove the beam from the tile when the beam is on a tile with no east tile`, () => {
                const tile = new Tile('.');
                const beam = new Beam('east');
                beam.setTile(tile);
                beam.move();
                expect(tile.beams.length).toBe(0);
            });

            test(`should remove the beam from the tile when the beam is on a tile with no south tile`, () => {
                const tile = new Tile('.');
                const beam = new Beam('south');
                beam.setTile(tile);
                beam.move();
                expect(tile.beams.length).toBe(0);
            });

            test(`should remove the beam from the tile when the beam is on a tile with no west tile`, () => {
                const tile = new Tile('.');
                const beam = new Beam('west');
                beam.setTile(tile);
                beam.move();
                expect(tile.beams.length).toBe(0);
            });
        });
    });
});