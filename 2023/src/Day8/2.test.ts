import { describe, expect, test } from '@jest/globals';
import { Node, determineStartingNodes, areAllNodesGoalNodes, determineStepsInPath } from './2.logic';

describe('Day 8 - Part 2', () => {
    describe('`Node` class', () => {
        test(`isStartingNode should return true for starting nodes`, () => {
            const node = new Node('11A', '11B', 'XXX');
            expect(node.isStartingNode()).toBe(true);
        });

        test(`isStartingNode should return false for non-starting nodes`, () => {
            const node = new Node('11B', 'XXX', '11Z');
            expect(node.isStartingNode()).toBe(false);
        });

        test(`isGoalNode should return true for goal nodes`, () => {
            const node = new Node('11Z', '11B', 'ZZZ');
            expect(node.isGoalNode()).toBe(true);
        });

        test(`isGoalNode should return false for non-goal nodes`, () => {
            const node = new Node('11B', 'XXX', '11Z');
            expect(node.isGoalNode()).toBe(false);
        });
    });

    describe(`determineStartingNodes`, () => {
        test(`should return the correct starting nodes`, () => {
            const nodes = [
                new Node('11A', '11B', 'XXX'),
                new Node('11B', 'XXX', '11Z'),
                new Node('11Z', '11B', 'XXX'),
                new Node('22A', '22B', 'XXX'),
                new Node('22B', '22C', '22C'),
                new Node('22C', '22Z', '22Z'),
                new Node('22Z', '22B', '22B'),
                new Node('XXX', 'XXX', 'XXX')
            ];
            
            const startingNodes = determineStartingNodes(nodes);
            expect(startingNodes.map((node) => node.id)).toEqual(expect.arrayContaining(['11A', '22A']));
        });
    });

    describe(`areAllNodesGoalNodes`, () => {
        test(`should return true when all nodes are goal nodes`, () => {
            const nodes = [
                new Node('11Z', '11B', '11Z'),
                new Node('12Z', '11A', '11Z'),
                new Node('13Z', '11B', '11A')
            ];
            
            const result = areAllNodesGoalNodes(nodes);
            expect(result).toBe(true);
        });

        test(`should return false when not all nodes are goal nodes`, () => {
            const nodes = [
                new Node('11Z', '11B', '11Z'),
                new Node('12Z', '11A', '11Z'),
                new Node('13A', '11B', '11A')
            ];
            
            const result = areAllNodesGoalNodes(nodes);
            expect(result).toBe(false);
        });
    });

    describe(`determineStepsInPath`, () => {
        test(`should return the correct number of steps`, () => {
            const nodes = {
                '11A': new Node('11A', '11B', 'XXX'),
                '11B': new Node('11B', 'XXX', '11Z'),
                '11Z': new Node('11Z', '11B', 'XXX'),
                '22A': new Node('22A', '22B', 'XXX'),
                '22B': new Node('22B', '22C', '22C'),
                '22C': new Node('22C', '22Z', '22Z'),
                '22Z': new Node('22Z', '22B', '22B'),
                'XXX': new Node('XXX', 'XXX', 'XXX')
            };
            const startingNodes: Node[] = determineStartingNodes(Object.values(nodes));
            const instructions = ['L', 'R'];

            const stepsInPath = determineStepsInPath({ nodes, startingNodes, instructions });
            expect(stepsInPath).toBe(6);
        });
    });
});