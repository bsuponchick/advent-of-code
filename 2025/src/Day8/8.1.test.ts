import { describe, expect, test } from '@jest/globals';
import { JunctionBox, Circuit } from './8.1.logic';

describe('Day 8 - Part 1', () => {
    describe(`JunctionBox`, () => {
        describe(`constructor`, () => {
            test(`should create a new JunctionBox`, () => {
                const junctionBox = new JunctionBox(1, { x: 0, y: 0, z: 0 });
                expect(junctionBox.getId()).toBe(1);
                expect(junctionBox.getCoordinate()).toEqual({ x: 0, y: 0, z: 0 });
            });
        });

        describe(`calculateDistance`, () => {
            test(`should calculate the distance between two JunctionBoxes`, () => {
                const junctionBox1 = new JunctionBox(1, { x: 0, y: 0, z: 0 });
                const junctionBox2 = new JunctionBox(2, { x: 1, y: 1, z: 1 });
                expect(junctionBox1.calculateDistance(junctionBox2)).toBe(Math.sqrt(3));
            });
        });

        describe(`setCircuit`, () => {
            test(`should set the Circuit for the JunctionBox`, () => {
                const circuit = new Circuit(1);
                const junctionBox = new JunctionBox(1, { x: 0, y: 0, z: 0 });
                junctionBox.setCircuit(circuit);
                expect(junctionBox.getCircuit()).toBe(circuit);
            });

            test(`should add the JunctionBox to the Circuit`, () => {
                const circuit = new Circuit(1);
                const junctionBox = new JunctionBox(1, { x: 0, y: 0, z: 0 });
                junctionBox.setCircuit(circuit);
                expect(circuit.getJunctionBoxes()).toEqual([junctionBox]);
            });
        });

        describe(`getCircuit`, () => {
            test(`should return the Circuit for the JunctionBox`, () => {
                const circuit = new Circuit(1);
                const junctionBox = new JunctionBox(1, { x: 0, y: 0, z: 0 });
                junctionBox.setCircuit(circuit);
                expect(junctionBox.getCircuit()).toBe(circuit);
            });
        });

        describe(`getId`, () => {
            test(`should return the id of the JunctionBox`, () => {
                const junctionBox = new JunctionBox(1, { x: 0, y: 0, z: 0 });
                expect(junctionBox.getId()).toBe(1);
            });
        });
    });

    describe(`Circuit`, () => {
        describe(`constructor`, () => {
            test(`should create a new Circuit`, () => {
                const circuit = new Circuit(1);
                expect(circuit.getJunctionBoxes()).toEqual([]);
            });
        });

        describe(`merge`, () => {
            test(`should merge two Circuits`, () => {
                const circuit1 = new Circuit(1);
                const circuit2 = new Circuit(2);
                circuit1.addJunctionBox(new JunctionBox(1, { x: 0, y: 0, z: 0 }));
                circuit2.addJunctionBox(new JunctionBox(2, { x: 1, y: 1, z: 1 }));
                circuit1.merge(circuit2);
                expect(circuit1.getJunctionBoxes().length).toBe(2);
                expect(circuit2.getJunctionBoxes().length).toBe(0);
            });
        });

        describe(`getJunctionBoxes`, () => {
            test(`should return the JunctionBoxes in the Circuit`, () => {
                const circuit = new Circuit(1);
                circuit.addJunctionBox(new JunctionBox(1, { x: 0, y: 0, z: 0 }));
                circuit.addJunctionBox(new JunctionBox(2, { x: 1, y: 1, z: 1 }));
                expect(circuit.getJunctionBoxes()).toEqual([new JunctionBox(1, { x: 0, y: 0, z: 0 }), new JunctionBox(2, { x: 1, y: 1, z: 1 })]);
            });
        });

        describe(`addJunctionBox`, () => {
            test(`should add a JunctionBox to the Circuit`, () => {
                const circuit = new Circuit(1);
                circuit.addJunctionBox(new JunctionBox(1, { x: 0, y: 0, z: 0 }));
                expect(circuit.getJunctionBoxes()).toEqual([new JunctionBox(1, { x: 0, y: 0, z: 0 })]);
            });
        });

        describe(`getSize`, () => {
            test(`should return the size of the Circuit`, () => {
                const circuit = new Circuit(1);
                circuit.addJunctionBox(new JunctionBox(1, { x: 0, y: 0, z: 0 }));
                circuit.addJunctionBox(new JunctionBox(2, { x: 1, y: 1, z: 1 }));
                expect(circuit.getSize()).toBe(2);
            });
        });

        describe(`clearJunctionBoxes`, () => {
            test(`should clear the JunctionBoxes in the Circuit`, () => {
                const circuit = new Circuit(1);
                circuit.addJunctionBox(new JunctionBox(1, { x: 0, y: 0, z: 0 }));
                circuit.addJunctionBox(new JunctionBox(2, { x: 1, y: 1, z: 1 }));
                circuit.clearJunctionBoxes();
                expect(circuit.getJunctionBoxes()).toEqual([]);
            });
        });

        describe(`getId`, () => {
            test(`should return the id of the Circuit`, () => {
                const circuit = new Circuit(1);
                expect(circuit.getId()).toBe(1);
            });
        });
    });
});