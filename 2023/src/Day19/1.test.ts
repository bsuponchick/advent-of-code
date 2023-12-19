import { describe, expect, test } from '@jest/globals';
import { WorkflowStage, Workflow, Part } from './1.logic';

describe('Day 19 - Part 1', () => {
    describe(`WorkflowStage`, () => {
        describe(`constructor`, () => {
            test(`should parse the input correctly`, () => {
                const input = 'a<2006:qkq';
                const expected = {
                    attribute: 'a',
                    comparator: '<',
                    value: 2006,
                    destination: 'qkq'
                };

                const actual = new WorkflowStage(input);
                expect(actual.attribute).toEqual(expected.attribute);
                expect(actual.comparator).toEqual(expected.comparator);
                expect(actual.value).toEqual(expected.value);
                expect(actual.destination).toEqual(expected.destination);
            });
        });

        describe(`matches`, () => {
            test(`should return true when the part matches the stage`, () => {
                const input = 'a<2006:qkq';
                const stage = new WorkflowStage(input);
                const part = new Part('{a=2005,x=0,m=0,s=0}');

                const actual = stage.matches(part);
                expect(actual).toEqual(true);
            });

            test(`should return false when the part does not match the stage`, () => {
                const input = 'a<2006:qkq';
                const stage = new WorkflowStage(input);
                const part = new Part('{a=2007,x=0,m=0,s=0}');

                const actual = stage.matches(part);
                expect(actual).toEqual(false);
            });
        });
    });

    describe(`Workflow`, () => {
        describe(`constructor`, () => {
            test(`should parse the input correctly`, () => {
                const input = 'px{a<2006:qkq,m>2090:A,rfg}';

                const workflow = new Workflow(input);
                expect(workflow.id).toEqual('px');
                expect(workflow.stages.length).toEqual(2);
                expect(workflow.defaultDestination).toEqual('rfg');
            });
        });
    });

    describe(`Part`, () => {
        describe(`constructor`, () => {
            test(`should parse the input correctly`, () => {
                const input = '{x=787,m=2655,a=1222,s=2876}';

                const part = new Part(input);
                expect(part.x).toEqual(787);
                expect(part.m).toEqual(2655);
                expect(part.a).toEqual(1222);
                expect(part.s).toEqual(2876);
            });
        });
    });
});