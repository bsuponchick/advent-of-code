import { describe, expect, test } from '@jest/globals';
import { Node, establishConnections, parseNodes, findStartingNode, getCircuit, getSquaresToCheck, identifyTilesSurroundedByPipes, expandMap, printMap } from './2.logic';

describe('Day 10 - Part 2', () => {
    describe(`Node`, () => {
        test(`All connect methods should return false when the value is '.'`, () => {
            const node = new Node('.');
            expect(node.connectsNorth()).toEqual(false);
            expect(node.connectsEast()).toEqual(false);
            expect(node.connectsSouth()).toEqual(false);
            expect(node.connectsWest()).toEqual(false);
        });

        test(`connectsNorth and connectsSouth should return true when the value is '|'`, () => {
            const node = new Node('|');
            expect(node.connectsNorth()).toEqual(true);
            expect(node.connectsSouth()).toEqual(true);
        });

        test(`connectsEast and connectsWest should return true when the value is '-'`, () => {
            const node = new Node('-');
            expect(node.connectsEast()).toEqual(true);
            expect(node.connectsWest()).toEqual(true);
        });

        test(`connectsSouth and connectsEast should return true when the value is 'F'`, () => {
            const node = new Node('F');
            expect(node.connectsSouth()).toEqual(true);
            expect(node.connectsEast()).toEqual(true);
        });

        test(`connectsWest and connectsSouth should return true when the value is '7'`, () => {
            const node = new Node('7');
            expect(node.connectsWest()).toEqual(true);
            expect(node.connectsSouth()).toEqual(true);
        });

        test(`connectsNorth and connectsEast should return true when the value is 'L'`, () => {
            const node = new Node('L');
            expect(node.connectsNorth()).toEqual(true);
            expect(node.connectsEast()).toEqual(true);
        });

        test(`connectsWest and connectsNorth should return true when the value is 'J'`, () => {
            const node = new Node('J');
            expect(node.connectsWest()).toEqual(true);
            expect(node.connectsNorth()).toEqual(true);
        });

        test(`isStartingNode should return true when the value is 'S'`, () => {
            const node = new Node('S');
            expect(node.isStartingNode()).toEqual(true);
        });

        test(`isStartingNode should return false when the value is not 'S'`, () => {
            const node = new Node('.');
            expect(node.isStartingNode()).toEqual(false);
        });

        test(`visit should set visited to true`, () => {
            const node = new Node('.');
            expect(node.visited).toEqual(false);
            node.visit();
            expect(node.visited).toEqual(true);
        });
    });

    describe(`parseNodes`, () => {
        test(`should return a node with the value of '.' input is '.'`, () => {
            const nodes = parseNodes('.');
            expect(nodes[0].getNeighbors().length).toEqual(0);
        });

        test(`should return an array of nodes the value '.' when the input is '....'`, () => {
            const nodes = parseNodes('....');
            expect(nodes[0].value).toEqual('.');
            expect(nodes[1].value).toEqual('.');
            expect(nodes[2].value).toEqual('.');
            expect(nodes[3].value).toEqual('.');
        });

        test(`should return an array of nodes with proper values when the input is '.S-7.`, () => {
            const nodes = parseNodes('.S-7.');
            expect(nodes[0].value).toEqual('.');
            expect(nodes[1].value).toEqual('S');
            expect(nodes[2].value).toEqual('-');
            expect(nodes[3].value).toEqual('7');
            expect(nodes[4].value).toEqual('.');
        });
    });

    describe(`establishConnections`, () => {
        test(`should update neighbors when the input is ['....']`, () => {
            const nodes = parseNodes('....');
            establishConnections([nodes]);
            expect(nodes[0].getNeighbors().length).toEqual(1);
            expect(nodes[1].getNeighbors().length).toEqual(2);
            expect(nodes[2].getNeighbors().length).toEqual(2);
            expect(nodes[3].getNeighbors().length).toEqual(1);
        });

        test(`should update the nodes with appropriate neighbors when the input is ['.S-7.']`, () => {
            const nodes = parseNodes('.S-7.');
            establishConnections([nodes]);
            expect(nodes[0].getNeighbors().length).toEqual(1);

            expect(nodes[1].getNeighbors().length).toEqual(1);
            expect(nodes[1].getNeighbors()[0].id).toEqual(nodes[2].id);

            expect(nodes[2].getNeighbors().length).toEqual(2);
            expect(nodes[2].getNeighbors()[0].id).toEqual(nodes[1].id);
            expect(nodes[2].getNeighbors()[1].id).toEqual(nodes[3].id);

            expect(nodes[3].getNeighbors().length).toEqual(1);
            expect(nodes[3].getNeighbors()[0].id).toEqual(nodes[2].id);

            expect(nodes[4].getNeighbors().length).toEqual(1);
        });

        test(`should update the nodes with appropriate neighbors when the input is ['.....', '.S-7.', '.|.|.', '.L-J.', '.....']`, () => {
            const map: string[] = ['.....', '.S-7.', '.|.|.', '.L-J.', '.....'];
            const graph: Node[][] = [];
            
            map.forEach((row) => {
                graph.push(parseNodes(row));
            });
            
            establishConnections(graph);

            expect(graph[0][0].getNeighbors().length).toEqual(2);
            expect(graph[0][1].getNeighbors().length).toEqual(3);
            expect(graph[0][2].getNeighbors().length).toEqual(3);
            expect(graph[0][3].getNeighbors().length).toEqual(3);
            expect(graph[0][4].getNeighbors().length).toEqual(2);

            expect(graph[1][0].getNeighbors().length).toEqual(3);
            expect(graph[1][1].getNeighbors().length).toEqual(2);
            expect(graph[1][2].getNeighbors().length).toEqual(2);
            expect(graph[1][3].getNeighbors().length).toEqual(2);
            expect(graph[1][4].getNeighbors().length).toEqual(3);

            expect(graph[2][0].getNeighbors().length).toEqual(3);
            expect(graph[2][1].getNeighbors().length).toEqual(2);
            expect(graph[2][2].getNeighbors().length).toEqual(4);
            expect(graph[2][3].getNeighbors().length).toEqual(2);
            expect(graph[2][4].getNeighbors().length).toEqual(3);

            expect(graph[3][0].getNeighbors().length).toEqual(3);
            expect(graph[3][1].getNeighbors().length).toEqual(2);
            expect(graph[3][2].getNeighbors().length).toEqual(2);
            expect(graph[3][3].getNeighbors().length).toEqual(2);
            expect(graph[3][4].getNeighbors().length).toEqual(3);

            expect(graph[4][0].getNeighbors().length).toEqual(2);
            expect(graph[4][1].getNeighbors().length).toEqual(3);
            expect(graph[4][2].getNeighbors().length).toEqual(3);
            expect(graph[4][3].getNeighbors().length).toEqual(3);
            expect(graph[4][4].getNeighbors().length).toEqual(2);
        });
    });

    describe(`findStartingNode`, () => {
        test(`should return the node with the value 'S' when the input is ['.S-7.']`, () => {
            const nodes = parseNodes('.S-7.');
            const startingNode = findStartingNode([nodes]);

            if (startingNode === null) {
                throw new Error('Starting node was null');
            } else {
                expect(startingNode.value).toEqual('S');
            }
        });
    });

    describe(`getCircuit`, () => {
        test(`should return an array with 8 nodes for the sample square input`, () => {
            const map: string[] = ['.....', '.S-7.', '.|.|.', '.L-J.', '.....'];
            const graph: Node[][] = [];
            
            map.forEach((row) => {
                graph.push(parseNodes(row));
            });
            
            establishConnections(graph);

            const startingNode = findStartingNode(graph);
            if (startingNode === null) {
                throw new Error('Starting node was null');
            } else {
                const circuit = getCircuit(startingNode);
                expect(circuit.length).toEqual(8);
            }
        });
    });

    describe(`getSquaresToCheck`, () => {
        test(`should return 6 squares for the sample input`, () => {
            const map: string[] = [
                '...........',
                '.S-------7.',
                '.|F-----7|.',
                '.||.....||.',
                '.||.....||.',
                '.|L-7.F-J|.',
                '.|..|.|..|.',
                '.L--J.L--J.',
                '...........'
            ];
            const graph: Node[][] = [];

            map.forEach((row) => {
                graph.push(parseNodes(row));
            });
            
            establishConnections(graph);
            const squaresToCheck = getSquaresToCheck(graph);

            expect(squaresToCheck.length).toEqual(6);
        });
    });

    describe(`identifyTilesSurroundedByPipes`, () => {
        test(`should return 4 tiles for the sample map with a direct path out.`, () => {
            const map: string[] = [
                '...........',
                '.S-------7.',
                '.|F-----7|.',
                '.||.....||.',
                '.||.....||.',
                '.|L-7.F-J|.',
                '.|..|.|..|.',
                '.L--J.L--J.',
                '...........'
            ];
            const expandedMap: string[] = expandMap(map);
            const graph: Node[][] = [];
    
            expandedMap.forEach((row) => {
                graph.push(parseNodes(row));
            });
            
            establishConnections(graph);
            getCircuit(findStartingNode(graph) as Node);

            const tilesSurroundedByPipes = identifyTilesSurroundedByPipes(graph);
            expect(tilesSurroundedByPipes.length).toEqual(4);
        });
        
        test(`should return 4 tiles for the small sample map with no direct path out.`, () => {
            const map: string[] = [
                '..........',
                '.S------7.',
                '.|F----7|.',
                '.||....||.',
                '.||....||.',
                '.|L-7F-J|.',
                '.|..||..|.',
                '.L--JL--J.',
                '..........'
            ];
            const expandedMap: string[] = expandMap(map);
            const graph: Node[][] = [];
    
            expandedMap.forEach((row) => {
                graph.push(parseNodes(row));
            });
            
            establishConnections(graph);
            getCircuit(findStartingNode(graph) as Node);
            const tilesSurroundedByPipes = identifyTilesSurroundedByPipes(graph);
    
            expect(tilesSurroundedByPipes.length).toEqual(4);
        });
    });

    describe(`expandMap`, () => {
        test(`should return a map with 4 rows and 5 columns when the input is ['..','..']`, () => {
            const map: string[] = ['..', '..'];
            const expandedMap = expandMap(map);
            expect(expandedMap.length).toEqual(4);
            expect(expandedMap[0].length).toEqual(5);
        });

        test(`should return a map with 11 rows and 21 columns for the simple map with no direct path out.'`, () => {
            const map: string[] = [
                '..........',
                '.S------7.',
                '.|F----7|.',
                '.||....||.',
                '.||....||.',
                '.|L-7F-J|.',
                '.|..||..|.',
                '.L--JL--J.',
                '..........'
            ];
            const expandedMap = expandMap(map);
            expect(expandedMap.length).toEqual(11);
            expect(expandedMap[0].length).toEqual(21);
        });
    });
});