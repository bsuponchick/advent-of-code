import { Guard } from './6.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 6 - Part 1', () => {
    describe(`Guard`, () => {
        describe(`When the constructor is called...`, () => {
            test(`Then it should set the x, y, direction, and map properties.`, () => {
                const map = [['^', '#'], ['#', '#']];
                const guard = new Guard(map);

                expect(guard.x).toBe(0);
                expect(guard.y).toBe(0);
                expect(guard.direction).toBe('^');
                expect(guard.map).toBe(map);
            });
        });

        describe(`When the move method is called...`, () => {
            describe(`And the direction is up...`, () => {
                test(`Then it should return false if the guard is at the top of the map.`, () => {
                    const map = [['^', '.'], ['.', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(result).toBe(false);
                });

                test(`Then it should change the direction to right if the next tile is a wall.`, () => {
                    const map = [['#', '.'], ['^', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(guard.direction).toBe('>');
                });

                test(`Then it should move the guard up one tile if the next tile is not a wall.`, () => {
                    const map = [['.', '.'], ['^', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(guard.x).toBe(0);
                    expect(guard.y).toBe(0);
                });

                test(`Then it should mark the tile the guard is moving from with an X and to with a ^.`, () => {
                    const map = [['.', '.'], ['^', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(guard.map[1][0]).toBe('X');
                    expect(guard.map[0][0]).toBe('^');
                });
            });

            describe(`And the direction is down...`, () => {
                test(`Then it should return false if the guard is at the bottom of the map.`, () => {
                    const map = [['.', '.'], ['.', 'v']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(result).toBe(false);
                });

                test(`Then it should change the direction to left if the next tile is a wall.`, () => {
                    const map = [['v', '.'], ['#', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(guard.direction).toBe('<');
                });

                test(`Then it should move the guard down one tile if the next tile is not a wall.`, () => {
                    const map = [['v', '.'], ['.', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(guard.x).toBe(0);
                    expect(guard.y).toBe(1);
                });

                test(`Then it should mark the tile the guard is moving from with an X and the new tile with a v.`, () => {
                    const map = [['v', '.'], ['.', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(guard.map[0][0]).toBe('X');
                    expect(guard.map[1][0]).toBe('v');
                });
            });

            describe(`And the direction is left...`, () => {
                test(`Then it should return false if the guard is at the left edge of the map.`, () => {
                    const map = [['<', '.'], ['.', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(result).toBe(false);
                });

                test(`Then it should change the direction to up if the next tile is a wall.`, () => {
                    const map = [['#', '<'], ['.', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(guard.direction).toBe('^');
                });

                test(`Then it should move the guard left one tile if the next tile is not a wall.`, () => {
                    const map = [['.', '<'], ['.', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(guard.x).toBe(0);
                    expect(guard.y).toBe(0);
                });

                test(`Then it should mark the tile the guard is moving from with an X and to with a <.`, () => {
                    const map = [['.', '<'], ['.', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(guard.map[0][1]).toBe('X');
                    expect(guard.map[0][0]).toBe('<');
                });
            });

            describe(`And the direction is right...`, () => {
                test(`Then it should return false if the guard is at the right edge of the map.`, () => {
                    const map = [['.', '>'], ['.', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(result).toBe(false);
                });

                test(`Then it should change the direction to down if the next tile is a wall.`, () => {
                    const map = [['>', '#'], ['.', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(guard.direction).toBe('v');
                });

                test(`Then it should move the guard right one tile if the next tile is not a wall.`, () => {
                    const map = [['>', '.'], ['.', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(guard.x).toBe(1);
                    expect(guard.y).toBe(0);
                });

                test(`Then it should mark the tile the guard is moving from with an X and to with a >.`, () => {
                    const map = [['>', '.'], ['.', '.']];
                    const guard = new Guard(map);

                    const result = guard.move();

                    expect(guard.map[0][0]).toBe('X');
                    expect(guard.map[0][1]).toBe('>');
                });
            });
        });
    });
});