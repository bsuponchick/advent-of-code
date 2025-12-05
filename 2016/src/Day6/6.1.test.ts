import { describe, expect, test } from '@jest/globals';
import { SignalDecoder } from './6.1.logic';

describe('Day 6 - Part 1', () => {
    describe(`SignalDecoder...`, () => {
        describe(`Constructor`, () => {
            test(`should create a new SignalDecoder object`, () => {
                const signalDecoder = new SignalDecoder(['abc', 'def', 'ghi']);
                expect(signalDecoder.signals).toEqual(['abc', 'def', 'ghi']);
                expect(signalDecoder.columnCounts).toEqual([{ a: 1, d: 1, g: 1 }, { b: 1, e: 1, h: 1 }, { c: 1, f: 1, i: 1 }]);
            });
        });
    });
});