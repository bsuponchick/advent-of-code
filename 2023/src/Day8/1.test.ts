import { describe, expect, test } from '@jest/globals';
import { Node, determinePath } from './1.logic';

describe('Day 8 - Part 1', () => {
    describe(`determinePath`, () => {
        test(`should return the correct path`, () => {
            const instructions = ['L', 'L', 'R'];
            const nodes = {
                'AAA': new Node('AAA', 'BBB', 'BBB'),
                'BBB': new Node('BBB', 'AAA', 'ZZZ'),
                'ZZZ': new Node('ZZZ', 'ZZZ', 'ZZZ')
            };

            const path = determinePath({ nodes, start: 'AAA', goal: 'ZZZ', instructions });
            expect(path).toEqual(['BBB', 'AAA', 'BBB', 'AAA', 'BBB', 'ZZZ']);
        });
    });
});