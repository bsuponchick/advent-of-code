import { describe, expect, test } from '@jest/globals';
import { WorkflowStage, Workflow, countValidPartsForPaths } from './2.logic';

describe('Day 19 - Part 2', () => {
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

            test(`should parse the input correctly when the input starts with '!!'`, () => {
                const input = '!!a<=2006:qkq';
                const expected = {
                    attribute: 'a',
                    comparator: '<=',
                    value: 2006,
                    destination: ''
                };

                const actual = new WorkflowStage(input);
                expect(actual.attribute).toEqual(expected.attribute);
                expect(actual.comparator).toEqual(expected.comparator);
                expect(actual.value).toEqual(expected.value);
                expect(actual.destination).toEqual(expected.destination);
            });
        });

        describe(`generateInverted`, () => {
            test(`should generate the inverted stage correctly`, () => {
                const input = 'a<2006:qkq';
                const expected = 'a>=2006:qkq';

                const stage = new WorkflowStage(input);
                const actual = stage.generateInverted();
                expect(actual.attribute).toEqual('a');
                expect(actual.comparator).toEqual('>=');
                expect(actual.value).toEqual(2006);
            });
        });

        describe(`isDestinationAccepted`, () => {
            test(`should return true when the destination is 'A'`, () => {
                const input = 'a<2006:A';
                const stage = new WorkflowStage(input);
                const actual = stage.isDestinationAccepted();
                expect(actual).toEqual(true);
            });

            test(`should return false when the destination is not 'A'`, () => {
                const input = 'a<2006:qkq';
                const stage = new WorkflowStage(input);
                const actual = stage.isDestinationAccepted();
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

    describe(`countValidPartsForPaths`, () => {
        test(`should return the correct number of valid parts when all parts are valid`, () => {
            const paths: WorkflowStage[][] = [
                [new WorkflowStage('a<4001:abc,def')]
            ];

            expect(countValidPartsForPaths(paths)[0].count).toEqual(4000*4000*4000*4000);
        });

        test(`should return the correct number of parts when only half of one attribute is valid`, () => {
            const paths: WorkflowStage[][] = [
                [new WorkflowStage('a<2001:abc,def')]
            ];

            expect(countValidPartsForPaths(paths)[0].count).toEqual(2000*4000*4000*4000);
        });

        test(`should return the correct number of parts when only half of one attribute is valid and the other attribute is valid`, () => {
            const paths: WorkflowStage[][] = [
                [new WorkflowStage('a<2001:abc,def'), new WorkflowStage('x<2001:abc,def')]
            ];

            expect(countValidPartsForPaths(paths)[0].count).toEqual(2000*2000*4000*4000);
        });

        test(`should return the correct number of parts for a complex example.`, () => {
            // a<=2639 m<=1507 m>=526 s<=2468 s>=1118 a>=1524 m<=1067 x<=1870 s<=1629 s<=1413 m>=801 a<2127 
            
            const paths: WorkflowStage[][] = [
                [new WorkflowStage('!!a<=2639:abc,def'), new WorkflowStage('!!m<=1507:abc,def'), new WorkflowStage('!!m>=526:abc,def'), new WorkflowStage('!!s<=2468:abc,def'), new WorkflowStage('!!s>=1118:abc,def'), new WorkflowStage('!!a>=1524:abc,def'), new WorkflowStage('!!m<=1067:abc,def'), new WorkflowStage('!!x<=1870:abc,def'), new WorkflowStage('!!s<=1629:abc,def'), new WorkflowStage('!!s<=1413:abc,def'), new WorkflowStage('!!m>=801:abc,def'), new WorkflowStage('a<2127:abc,def')]
            ];
            
            expect(countValidPartsForPaths(paths)[0].count).toEqual(1870*267*603*296);
        });
    });
});