import { NumericKeyPad, DirectionalKeypad, stepComparator } from './21.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 21 - Part 1', () => {
    describe(`NumericKeyPad`, () => {
        describe(`constructor`, () => {
            test(`should populate the graph with the correct number of nodes`, () => {
                const numericKeyPad = new NumericKeyPad();
                expect(numericKeyPad.graph.nodes.length).toBe(11);
            });

            test(`should populate the graph with the correct number of edges`, () => {
                const numericKeyPad = new NumericKeyPad();
                expect(numericKeyPad.graph.edges.length).toBe(15);
            });

            test(`should set the current node to the action node`, () => {
                const numericKeyPad = new NumericKeyPad();
                expect(numericKeyPad.currentNode.id).toBe('A');
            });
        });

        describe(`setCurrentNode`, () => {
            test(`should set the current node to the node with the given id`, () => {
                const numericKeyPad = new NumericKeyPad();
                numericKeyPad.setCurrentNode('1');
                expect(numericKeyPad.currentNode.id).toBe('1');
            });
        });

        describe(`determinePathToNode`, () => {
            test(`should return the path to the 1 key from the action key`, () => {
                const numericKeyPad = new NumericKeyPad();
                const path = numericKeyPad.determinePathToNode('1');
                expect(path).toEqual(expect.arrayContaining(['^', '<', '<']));
            });
        });

        describe(`determinePathToSequence`, () => {
            test(`should return the proper path given the sample input`, () => {
                const numericKeyPad = new NumericKeyPad();
                const path = numericKeyPad.determinePathToSequence('029A');
                expect(path).toEqual(expect.arrayContaining(['<', 'A', '^', 'A', '>', '^', '^', 'A', 'v', 'v', 'v', 'A']));
            });
        });
    });

    describe(`DirectionalKeypad`, () => {
        describe(`constructor`, () => {
            test(`should populate the graph with the correct number of nodes`, () => {
                const directionalKeypad = new DirectionalKeypad();
                expect(directionalKeypad.graph.nodes.length).toBe(5);
            });

            test(`should populate the graph with the correct number of edges`, () => {
                const directionalKeypad = new DirectionalKeypad();
                expect(directionalKeypad.graph.edges.length).toBe(5);
            });

            test(`should set the current node to the action node`, () => {
                const directionalKeypad = new DirectionalKeypad();
                expect(directionalKeypad.currentNode.id).toBe('A');
            });
        });

        describe(`setCurrentNode`, () => {
            test(`should set the current node to the node with the given id`, () => {
                const directionalKeypad = new DirectionalKeypad();
                directionalKeypad.setCurrentNode('v');
                expect(directionalKeypad.currentNode.id).toBe('v');
            });
        });

        describe(`determinePathToNode`, () => {
            test(`should return the path to the v key from the action key`, () => {
                const directionalKeypad = new DirectionalKeypad();
                const path = directionalKeypad.determinePathToNode('v');
                expect(path).toEqual(expect.arrayContaining(['<', 'v']));
            });
        });

        describe(`determinePathToSequence`, () => {
            test(`should return the proper path given the sample input`, () => {
                const directionalKeypad = new DirectionalKeypad();
                const path = directionalKeypad.determinePathToSequence('<A^A>^^AvvvA');
                expect(path).toEqual(expect.arrayContaining(['v', '<', '<', 'A', '>', '>', '^', 'A', '<', 'A', '>', 'A', 'v', 'A', '<', '^', 'A', 'A', '>', 'A', '<', 'v', 'A', 'A', 'A', '>', '^', 'A']));
            });

            test('should return the proper path for the larger sample input', () => {
                const directionalKeypad = new DirectionalKeypad();
                const path = directionalKeypad.determinePathToSequence('v<<A>>^A<A>AvA<^AA>A<vAAA>^A');
                expect(path).toEqual(expect.arrayContaining('<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A'.split('')));
            });
        });
    });

    describe(`stepComparator`, () => {
        test(`should properly sort the steps <<v to be v<<`, () => {
            const steps = ['<', '<', 'v'];
            steps.sort(stepComparator);
            expect(steps).toEqual(expect.arrayContaining(['v', '<', '<']));
        });

        test(`should properly sort the steps ^<<^ to be ^^<<`, () => {
            const steps = ['^', '<', '<', '^'];
            steps.sort(stepComparator);
            expect(steps).toEqual(expect.arrayContaining(['^', '^', '<', '<']));
        });
    });
});