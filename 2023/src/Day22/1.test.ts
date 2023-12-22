import { describe, expect, test } from '@jest/globals';
import { Block, Brick } from './1.logic';

describe('Day 22 - Part 1', () => {
    describe('Block', () => {
        describe(`constructor`, () => {
            test(`should correctly parse a block`, () => {
                const block = new Block(1, 2, 3);
                expect(block.x).toBe(1);
                expect(block.y).toBe(2);
                expect(block.z).toBe(3);
                expect(block.id).toBe('1,2,3');
            });
        });

        describe(`fall`, () => {
            test(`should move the block down by one`, () => {
                const block = new Block(1, 2, 3);
                block.fall();
                expect(block.x).toBe(1);
                expect(block.y).toBe(2);
                expect(block.z).toBe(2);
                expect(block.id).toBe('1,2,2');
            });
        });

        describe(`reset`, () => {
            test(`should reset the block to its starting position`, () => {
                const block = new Block(1, 2, 3);
                block.fall();

                expect(block.x).toBe(1);
                expect(block.y).toBe(2);
                expect(block.z).toBe(2);
                expect(block.id).toBe('1,2,2');

                block.reset();
                
                expect(block.x).toBe(1);
                expect(block.y).toBe(2);
                expect(block.z).toBe(3);
                expect(block.id).toBe('1,2,3');
            });
        });

        describe(`updateDefaults`, () => {
            test(`should update the starting position of the block`, () => {
                const block = new Block(1, 2, 3);
                block.fall();

                expect(block.x).toBe(1);
                expect(block.y).toBe(2);
                expect(block.z).toBe(2);
                expect(block.id).toBe('1,2,2');
                expect(block.startingX).toBe(1);
                expect(block.startingY).toBe(2);
                expect(block.startingZ).toBe(3);

                block.updateDefaults();
                
                expect(block.startingX).toBe(1);
                expect(block.startingY).toBe(2);
                expect(block.startingZ).toBe(2);
            });
        });
    });

    describe(`Brick`, () => {
        describe(`constructor`, () => {
            test(`should correctly parse a brick with only one block`, () => {
                const blockCache: { [id: string]: Block } = {};
                const brick = new Brick('1,2,3~1,2,3', blockCache);

                expect(brick.blocks.length).toBe(1);
                expect(brick.blocks[0].x).toBe(1);
                expect(brick.blocks[0].y).toBe(2);
                expect(brick.blocks[0].z).toBe(3);
                expect(blockCache['1,2,3']).toBe(brick.blocks[0]);
            });

            test(`should correctly parse a brick with multiple blocks in the x direction`, () => {
                const blockCache: { [id: string]: Block } = {};
                const brick = new Brick('1,2,3~2,2,3', blockCache);

                expect(brick.blocks.length).toBe(2);
                expect(brick.blocks[0].x).toBe(1);
                expect(brick.blocks[0].y).toBe(2);
                expect(brick.blocks[0].z).toBe(3);
                expect(blockCache['1,2,3']).toBe(brick.blocks[0]);

                expect(brick.blocks[1].x).toBe(2);
                expect(brick.blocks[1].y).toBe(2);
                expect(brick.blocks[1].z).toBe(3);
                expect(blockCache['2,2,3']).toBe(brick.blocks[1]);
            });

            test(`should correctly parse a brick with multiple blocks in the y direction`, () => {
                const blockCache: { [id: string]: Block } = {};
                const brick = new Brick('1,2,3~1,3,3', blockCache);

                expect(brick.blocks.length).toBe(2);
                expect(brick.blocks[0].x).toBe(1);
                expect(brick.blocks[0].y).toBe(2);
                expect(brick.blocks[0].z).toBe(3);
                expect(blockCache['1,2,3']).toBe(brick.blocks[0]);

                expect(brick.blocks[1].x).toBe(1);
                expect(brick.blocks[1].y).toBe(3);
                expect(brick.blocks[1].z).toBe(3);
                expect(blockCache['1,3,3']).toBe(brick.blocks[1]);
            });

            test(`should correctly parse a brick with multiple blocks in the z direction`, () => {
                const blockCache: { [id: string]: Block } = {};
                const brick = new Brick('1,2,3~1,2,4', blockCache);

                expect(brick.blocks.length).toBe(2);
                expect(brick.blocks[0].x).toBe(1);
                expect(brick.blocks[0].y).toBe(2);
                expect(brick.blocks[0].z).toBe(3);
                expect(blockCache['1,2,3']).toBe(brick.blocks[0]);

                expect(brick.blocks[1].x).toBe(1);
                expect(brick.blocks[1].y).toBe(2);
                expect(brick.blocks[1].z).toBe(4);
                expect(blockCache['1,2,4']).toBe(brick.blocks[1]);
            });
        });

        describe(`couldPotentiallyFall`, () => {
            test(`should return true if the brick has no blocks at z=1`, () => {
                const blockCache: { [id: string]: Block } = {};
                const brick = new Brick('1,2,2~1,2,3', blockCache);

                expect(brick.couldPotentiallyFall()).toBe(true);
            });

            test(`should return false if the brick has at least one block at z=1`, () => {
                const blockCache: { [id: string]: Block } = {};
                const brick = new Brick('1,2,1~1,2,2', blockCache);

                expect(brick.couldPotentiallyFall()).toBe(false);
            });

            test(`should return false if the block cache has at least one block directly below any of the brick's blocks`, () => {
                const blockCache: { [id: string]: Block } = {
                    '1,2,1': new Block(1, 2, 1)
                };
                const brick = new Brick('1,2,2~1,2,3', blockCache);

                expect(brick.couldPotentiallyFall()).toBe(false);
            });
        });

        describe(`fall`, () => {
            test(`should move all blocks down by one`, () => {
                const blockCache: { [id: string]: Block } = {};
                const brick = new Brick('1,2,3~1,2,4', blockCache);
                brick.fall();

                expect(brick.blocks[0].x).toBe(1);
                expect(brick.blocks[0].y).toBe(2);
                expect(brick.blocks[0].z).toBe(2);
                expect(blockCache['1,2,2']).toBe(brick.blocks[0]);

                expect(brick.blocks[1].x).toBe(1);
                expect(brick.blocks[1].y).toBe(2);
                expect(brick.blocks[1].z).toBe(3);
                expect(blockCache['1,2,3']).toBe(brick.blocks[1]);

                expect(blockCache['1,2,4']).toBe(undefined);
            });
        });

        describe(`removeFromBlockCache`, () => {
            test(`should remove all blocks from the block cache`, () => {
                const blockCache: { [id: string]: Block } = {};
                const brick = new Brick('1,2,3~1,2,4', blockCache);
                brick.removeFromBlockCache();

                expect(blockCache['1,2,3']).toBe(undefined);
                expect(blockCache['1,2,4']).toBe(undefined);
            });
        });

        describe(`addToBlockCache`, () => {
            test(`should add all blocks to the block cache`, () => {
                const blockCache: { [id: string]: Block } = {};
                const brick = new Brick('1,2,3~1,2,4', blockCache);

                brick.removeFromBlockCache();
                brick.addToBlockCache();

                expect(blockCache['1,2,3']).toBe(brick.blocks[0]);
                expect(blockCache['1,2,4']).toBe(brick.blocks[1]);
            });
        });

        describe(`reset`, () => {
            test(`should reset all blocks to their starting positions`, () => {
                const blockCache: { [id: string]: Block } = {};
                const brick = new Brick('1,2,3~1,2,4', blockCache);

                brick.fall();
                brick.reset();

                expect(brick.blocks[0].x).toBe(1);
                expect(brick.blocks[0].y).toBe(2);
                expect(brick.blocks[0].z).toBe(3);
                expect(blockCache['1,2,3']).toBe(brick.blocks[0]);

                expect(brick.blocks[1].x).toBe(1);
                expect(brick.blocks[1].y).toBe(2);
                expect(brick.blocks[1].z).toBe(4);
                expect(blockCache['1,2,4']).toBe(brick.blocks[1]);
            });
        });

        describe(`setDefaultPositions`, () => {
            test(`should update the starting positions of all blocks`, () => {
                const blockCache: { [id: string]: Block } = {};
                const brick = new Brick('1,2,3~1,2,4', blockCache);

                brick.fall();

                brick.setDefaultPositions();

                expect(brick.blocks[0].startingX).toBe(1);
                expect(brick.blocks[0].startingY).toBe(2);
                expect(brick.blocks[0].startingZ).toBe(2);

                expect(brick.blocks[1].startingX).toBe(1);
                expect(brick.blocks[1].startingY).toBe(2);
                expect(brick.blocks[1].startingZ).toBe(3);
            });
        });
    });
});