import { NumericKeyPad } from './21.1.logic';
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

        describe(`determineNumberOfStepsToGetToNode`, () => {
            test(`should return the number of steps to get to the 1 key from the action key`, () => {
                const numericKeyPad = new NumericKeyPad();
                const steps = numericKeyPad.determineNumberOfStepsToGetToNode('1');
                expect(steps).toBe(3);
            });

            test(`should return the number of steps to get to the 9 key from the action key`, () => {
                const numericKeyPad = new NumericKeyPad();
                const steps = numericKeyPad.determineNumberOfStepsToGetToNode('9');
                expect(steps).toBe(3);
            });

            test(`should return the number of steps to get to the action key from the 4 key`, () => {
                const numericKeyPad = new NumericKeyPad();
                numericKeyPad.setCurrentNode('4');
                const steps = numericKeyPad.determineNumberOfStepsToGetToNode('A');
                expect(steps).toBe(4);
            });
        });

        describe(`determinePathToNode`, () => {
            test(`should return the path to the 1 key from the action key`, () => {
                const numericKeyPad = new NumericKeyPad();
                const path = numericKeyPad.determinePathToNode('1');
                expect(path).toEqual(expect.arrayContaining(['^', '<', '<']));
            });
        });
    });
});