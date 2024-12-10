import { DiskMap } from './9.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 9 - Part 1', () => {
    describe(`DiskMap`, () => {
        describe(`When parseRawInput is called`, () => {
            test(`Then it should parse the input correctly`, () => {
                const diskMap = new DiskMap();
                diskMap.parseRawInput('12345');
                expect(diskMap.blocks).toStrictEqual(['0', '.', '.', '1', '1', '1', '.', '.', '.', '.', '2', '2', '2', '2', '2']);
            });
        });

        describe(`When generateBlockString is called`, () => {
            test(`Then it should generate the block string correctly`, () => {
                const diskMap = new DiskMap();
                diskMap.parseRawInput('12345');
                expect(diskMap.generateBlockString()).toBe('0..111....22222');
            });
        });

        describe(`When shiftBlocks is called`, () => {
            test(`Then it should shift the blocks correctly`, () => {
                const diskMap = new DiskMap();
                diskMap.parseRawInput('12345');
                diskMap.shiftBlocks();
                expect(diskMap.blocks).toStrictEqual(['0', '2', '2', '1', '1', '1', '2', '2', '2', '.', '.', '.', '.', '.', '.']);
            });
        });

        describe(`When calculateChecksum is called`, () => {
            test(`Then it should calculate the checksum correctly`, () => {
                const diskMap = new DiskMap();
                diskMap.parseRawInput('12345');
                diskMap.shiftBlocks();
                expect(diskMap.calculateChecksum()).toBe(60);
            });
        });
    });
});