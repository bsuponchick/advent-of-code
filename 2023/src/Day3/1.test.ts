import { describe, expect, test } from '@jest/globals';
import { Node, establishConnections, getNumbersAdjacentToSymbols } from './1.logic';

describe('Day 3 - Part 1', () => {
    describe(`Node`, () => {
        test(`getNeighbors should return all neighbors when none are null`, () => {
            const node = new Node('1');
            const north = new Node('2');
            const south = new Node('3');
            const east = new Node('4');
            const west = new Node('5');
            const northwest = new Node('6');
            const northeast = new Node('7');
            const southwest = new Node('8');
            const southeast = new Node('9');

            node.setNorth(north);
            node.setSouth(south);
            node.setEast(east);
            node.setWest(west);

            north.setWest(northwest);
            north.setEast(northeast);
            south.setWest(southwest);
            south.setEast(southeast);

            east.setNorth(northeast);
            east.setSouth(southeast);

            west.setNorth(northwest);
            west.setSouth(southwest);

            node.updateDiagonals();

            expect(node.getNeighbors()).toEqual([north, south, east, west, northwest, northeast, southwest, southeast]);
        });

        test(`getNeighbors should return only non-null neighbors`, () => {
            const node = new Node('1');
            const north = new Node('2');
            const south = new Node('3');
            const east = new Node('4');
            const west = new Node('5');

            node.setNorth(north);
            node.setSouth(south);
            node.setEast(east);
            node.setWest(west);
            node.updateDiagonals();

            expect(node.getNeighbors()).toEqual([north, south, east, west]);
        });

        describe(`isAdjacentToSymbol`, () => {
            test(`should return true when any neighbor is a symbol`, () => {
                const node = new Node('1');
                const north = new Node('2');
                const south = new Node('3');
                const east = new Node('4');
                const west = new Node('5');
                const northwest = new Node('6');
                const northeast = new Node('7');
                const southwest = new Node('8');
                const southeast = new Node('9');
    
                node.setNorth(north);
                node.setSouth(south);
                node.setEast(east);
                node.setWest(west);
    
                north.setWest(northwest);
                north.setEast(northeast);
                south.setWest(southwest);
                south.setEast(southeast);
    
                east.setNorth(northeast);
                east.setSouth(southeast);
    
                west.setNorth(northwest);
                west.setSouth(southwest);
    
                node.updateDiagonals();
    
                north.isSymbol = true;
                expect(node.isAdjacentToSymbol()).toBe(true);
    
                north.isSymbol = false;
                south.isSymbol = true;
                expect(node.isAdjacentToSymbol()).toBe(true);
    
                south.isSymbol = false;
                east.isSymbol = true;
                expect(node.isAdjacentToSymbol()).toBe(true);
    
                east.isSymbol = false;
                west.isSymbol = true;
                expect(node.isAdjacentToSymbol()).toBe(true);
    
                west.isSymbol = false;
                northwest.isSymbol = true;
                expect(node.isAdjacentToSymbol()).toBe(true);
    
                northwest.isSymbol = false;
                northeast.isSymbol = true;
                expect(node.isAdjacentToSymbol()).toBe(true);
    
                northeast.isSymbol = false;
                southwest.isSymbol = true;
                expect(node.isAdjacentToSymbol()).toBe(true);
    
                southwest.isSymbol = false;
                southeast.isSymbol = true;
                expect(node.isAdjacentToSymbol()).toBe(true);
            });
        });
    });

    describe(`establishConnections`, () => {
        test(`should connect all nodes in a 2x2 grid`, () => {
            const node1 = new Node('1');
            const node2 = new Node('2');
            const node3 = new Node('3');
            const node4 = new Node('4');

            const nodes = [[node1, node2], [node3, node4]];

            establishConnections(nodes);

            expect(node1.getNeighborValues()).toContain(2);
            expect(node1.getNeighborValues()).toContain(3);
            expect(node1.getNeighborValues()).toContain(4);

            expect(node2.getNeighborValues()).toContain(1);
            expect(node2.getNeighborValues()).toContain(3);
            expect(node2.getNeighborValues()).toContain(4);

            expect(node3.getNeighborValues()).toContain(1);
            expect(node3.getNeighborValues()).toContain(2);
            expect(node3.getNeighborValues()).toContain(4);

            expect(node4.getNeighborValues()).toContain(1);
            expect(node4.getNeighborValues()).toContain(2);
            expect(node4.getNeighborValues()).toContain(3);
        });

        test(`should connect all nodes in a 3x3 grid`, () => {
            const node1 = new Node('1');
            const node2 = new Node('2');
            const node3 = new Node('3');
            const node4 = new Node('4');
            const node5 = new Node('5');
            const node6 = new Node('6');
            const node7 = new Node('7');
            const node8 = new Node('8');
            const node9 = new Node('9');

            const nodes = [[node1, node2, node3], [node4, node5, node6], [node7, node8, node9]];

            establishConnections(nodes);

            expect(node1.getNeighborValues()).toEqual(expect.arrayContaining([2, 4, 5]));
            expect(node2.getNeighborValues()).toEqual(expect.arrayContaining([1, 3, 4, 5, 6]));
            expect(node3.getNeighborValues()).toEqual(expect.arrayContaining([2, 5, 6]));
            expect(node4.getNeighborValues()).toEqual(expect.arrayContaining([1, 2, 5, 7, 8]));
            expect(node5.getNeighborValues()).toEqual(expect.arrayContaining([1, 2, 3, 4, 6, 7, 8, 9]));
            expect(node6.getNeighborValues()).toEqual(expect.arrayContaining([2, 3, 5, 8, 9]));
            expect(node7.getNeighborValues()).toEqual(expect.arrayContaining([4, 5, 8]));
            expect(node8.getNeighborValues()).toEqual(expect.arrayContaining([4, 5, 6, 7, 9]));
            expect(node9.getNeighborValues()).toEqual(expect.arrayContaining([5, 6, 8]));
        });

        test(`should not report nodes with dots in a 2x2 grid`, () => {
            const node1 = new Node('1');
            const node2 = new Node('2');
            const node3 = new Node('.');
            const node4 = new Node('4');

            const nodes = [[node1, node2], [node3, node4]];

            establishConnections(nodes);

            expect(node1.getNeighborValues()).toEqual(expect.arrayContaining([2, 4]));
            expect(node2.getNeighborValues()).toEqual(expect.arrayContaining([1, 4]));
            expect(node3.getNeighborValues()).toEqual(expect.arrayContaining([1, 2, 4]));
            expect(node4.getNeighborValues()).toEqual(expect.arrayContaining([1, 2]));
        });
    });

    describe(`getNumbersAdjacentToSymbols`, () => {
        test(`should return all numbers adjacent to symbols`, () => {
            const nodes = [
                [new Node('.'), new Node('.'), new Node('.'), new Node('$'), new Node('.'), new Node('*'), new Node('.'), new Node('.'), new Node('.'), new Node('.')],
                [new Node('.'), new Node('6'), new Node('6'), new Node('4'), new Node('.'), new Node('5'), new Node('9'), new Node('8'), new Node('.'), new Node('.')]
            ];

            establishConnections(nodes);

            expect(getNumbersAdjacentToSymbols(nodes[1])).toEqual(expect.arrayContaining([664, 598]));
        });
    });
});