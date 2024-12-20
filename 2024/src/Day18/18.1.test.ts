import { MemorySpace } from './18.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 18 - Part 1', () => {
    describe(`MemorySpace`, () => {
        describe(`Constructor`, () => {
            test(`Should initialize the memory space properly...`, () => {
                const memorySpace = new MemorySpace(6);

                expect(memorySpace.graph.nodes).toEqual([]);
                expect(memorySpace.size).toBe(6);
            });
        });

        describe(`When generateNodeIdFromCoordinate is called...`, () => {
            test(`Should return the correct node id for { x: 1, y: 2 }...`, () => {
                const memorySpace = new MemorySpace(6);

                expect(memorySpace.generateNodeIdFromCoordinate({ x: 1, y: 2 })).toBe('1,2');
            });
        });

        describe(`When initialize is called...`, () => {
            test(`Should add the correct number of nodes to the graph...`, () => {
                const memorySpace = new MemorySpace(6);
                memorySpace.initialize();

                expect(memorySpace.graph.nodes.length).toBe(49);
            });
        });
    });
});