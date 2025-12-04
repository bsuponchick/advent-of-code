import { describe, expect, test } from '@jest/globals';
import { Room } from './4.1.logic';

describe('Day 4 - Part 1', () => {
    describe(`Room...`, () => {
        describe(`Constructor`, () => {
            test(`should create a new Room object`, () => {
                const room = new Room('aaaaa-bbb-z-y-x-123[abxyz]');
                expect(room.name).toEqual('aaaaa-bbb-z-y-x');
                expect(room.sectorId).toEqual(123);
                expect(room.checksum).toEqual('abxyz');
            });
        });

        describe(`When isValid is called...`, () => {
            test(`should return true if the room is valid`, () => {
                const room = new Room('aaaaa-bbb-z-y-x-123[abxyz]');
                expect(room.isValid()).toBe(true);
            });

            test(`should return false if the room is not valid`, () => {
                const room = new Room('totally-real-room-200[decoy]');
                expect(room.isValid()).toBe(false);
            });
        });
    });
});