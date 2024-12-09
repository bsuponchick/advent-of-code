import { Node } from './8.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 8 - Part 1', () => {
    describe(`Node`, () => {
        describe(`constructor`, () => {
            test(`should create a new Node`, () => {
                const node = new Node('a', { x: 2, y: 2});
                expect(node.symbol).toBe('a');
                expect(node.coordinate).toEqual({ x: 2, y: 2 });
                expect(node.antiNodes).toStrictEqual([]);
            });
        });

        describe(`When addAntiNode is called...`, () => {
            test(`should add a new antiNode to the Node`, () => {
                const node = new Node('a', { x: 2, y: 2 });
                const antiNode = 'b';
                node.addAntiNode(antiNode);
                expect(node.antiNodes).toStrictEqual([antiNode]);
            });

            test(`should add multiple antiNodes to the Node`, () => {
                const node = new Node('a', { x: 2, y: 2 });
                const antiNode1 = 'b';
                const antiNode2 = 'c';
                node.addAntiNode(antiNode1);
                node.addAntiNode(antiNode2);
                expect(node.antiNodes).toStrictEqual([antiNode1, antiNode2]);
            });

            test(`should not add the same antiNode to the Node`, () => {
                const node = new Node('a', { x: 2, y: 2 });
                const antiNode = 'b';
                node.addAntiNode(antiNode);
                node.addAntiNode(antiNode);
                expect(node.antiNodes).toStrictEqual([antiNode]);
            });
        });

        describe(`When hasAntiNode is called...`, () => {
            test(`should return true if the Node has the antiNode`, () => {
                const node = new Node('a', { x: 2, y: 2 });
                const antiNode = 'b';
                node.addAntiNode(antiNode);
                expect(node.hasAntiNode()).toBeTruthy();
            });

            test(`should return false if the Node does not have the antiNode`, () => {
                const node = new Node('a', { x: 2, y: 2 });
                expect(node.hasAntiNode()).toBeFalsy();
            });
        });

        describe(`When getAntiNodeCoordinates is called...`, () => {
            test(`should return the coordinates of the antiNodes for the upper left to lower right pattern`, () => {
                const nodeA = new Node('a', { x: 2, y: 2 });
                const nodeB = new Node('b', { x: 4, y: 4 });

                const antiNodeCoordiantes = nodeA.getAntiNodeCoordinates(nodeB);
                expect(antiNodeCoordiantes).toStrictEqual([
                    { x: 0, y: 0 },
                    { x: 6, y: 6 }
                ]);
            });

            test(`should return the coordinates of the antiNodes for the lower left to upper right pattern`, () => {
                const nodeA = new Node('a', { x: 2, y: 4 });
                const nodeB = new Node('b', { x: 4, y: 2 });

                const antiNodeCoordiantes = nodeA.getAntiNodeCoordinates(nodeB);
                expect(antiNodeCoordiantes).toStrictEqual([
                    { x: 0, y: 6 },
                    { x: 6, y: 0 }
                ]);
            });

            test(`should return the coordinates of the antiNodes for the left to right pattern`, () => {
                const nodeA = new Node('a', { x: 2, y: 2 });
                const nodeB = new Node('b', { x: 4, y: 2 });

                const antiNodeCoordiantes = nodeA.getAntiNodeCoordinates(nodeB);
                expect(antiNodeCoordiantes).toStrictEqual([
                    { x: 0, y: 2 },
                    { x: 6, y: 2 }
                ]);
            });

            test(`should return the coordinates of the antiNodes for the right to left pattern`, () => {
                const nodeA = new Node('a', { x: 4, y: 2 });
                const nodeB = new Node('b', { x: 2, y: 2 });

                const antiNodeCoordiantes = nodeA.getAntiNodeCoordinates(nodeB);
                expect(antiNodeCoordiantes).toStrictEqual([
                    { x: 6, y: 2 },
                    { x: 0, y: 2 }
                ]);
            });

            test(`should return the coordinates of the antiNodes for the upper right to lower left pattern`, () => {
                const nodeA = new Node('a', { x: 4, y: 4 });
                const nodeB = new Node('b', { x: 2, y: 2 });

                const antiNodeCoordiantes = nodeA.getAntiNodeCoordinates(nodeB);
                expect(antiNodeCoordiantes).toStrictEqual([
                    { x: 6, y: 6 },
                    { x: 0, y: 0 }
                ]);
            });

            test(`should return the coordinates of the antiNodes for the lower right to upper left pattern`, () => {
                const nodeA = new Node('a', { x: 4, y: 2 });
                const nodeB = new Node('b', { x: 2, y: 4 });

                const antiNodeCoordiantes = nodeA.getAntiNodeCoordinates(nodeB);
                expect(antiNodeCoordiantes).toStrictEqual([
                    { x: 6, y: 0 },
                    { x: 0, y: 6 }
                ]);
            });

            test(`should return the coordinates of the antiNodes for the same x pattern`, () => {
                const nodeA = new Node('a', { x: 2, y: 2 });
                const nodeB = new Node('b', { x: 4, y: 2 });

                const antiNodeCoordiantes = nodeA.getAntiNodeCoordinates(nodeB);
                expect(antiNodeCoordiantes).toStrictEqual([
                    { x: 0, y: 2 },
                    { x: 6, y: 2 }
                ]);
            });
        });
    });
});