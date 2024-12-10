import { DiskMap } from './9.2.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 9 - Part 2', () => {
    describe(`DiskMap`, () => {
        describe(`When parseRawInput is called`, () => {
            test(`Then it should parse the input correctly`, () => {
                const diskMap = new DiskMap();
                diskMap.parseRawInput('2333133121414131402');
                expect(diskMap.generateBlockString()).toBe('00...111...2...333.44.5555.6666.777.888899');
            });
        });

        describe(`When shiftBlocks is called`, () => {
            test(`Then it should shift the blocks correctly`, () => {
                const diskMap = new DiskMap();
                diskMap.parseRawInput('2333133121414131402');
                diskMap.shiftBlocks();
                expect(diskMap.generateBlockString()).toBe('00992111777.44.333....5555.6666.....8888..');
            });
        });

        describe(`When calculateChecksum is called`, () => {
            test(`Then it should calculate the checksum correctly`, () => {
                const diskMap = new DiskMap();
                diskMap.parseRawInput('2333133121414131402');
                diskMap.shiftBlocks();
                expect(diskMap.calculateChecksum()).toBe(2858n);
            });
        });
    });
});