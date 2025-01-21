import { Wire, AndGate, OrGate, XorGate } from './24.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 24 - Part 1', () => {
    describe(`Wire`, () => {
        describe(`Constructor`, () => {
            test(`Should create a new Wire with the provided id`, () => {
                const wire = new Wire('a');
                expect(wire.getId()).toBe('a');
            });
        });

        describe(`setValue`, () => {
            test(`Should set the value of the wire`, () => {
                const wire = new Wire('a');
                wire.setValue(1);
                expect(wire.getValue()).toBe(1);
            });

            test(`Should notify observers if the value is set`, () => {
                const wire = new Wire('a');
                const observer = {
                    notify: jest.fn()
                };
                wire.addObserver(observer);
                wire.setValue(1);
                expect(observer.notify).toHaveBeenCalled();
            });
        });

        describe(`getValue`, () => {
            test(`Should return -1 if the value has not been set`, () => {
                const wire = new Wire('a');
                expect(wire.getValue()).toBe(-1);
            });

            test(`Should return the value that was set`, () => {
                const wire = new Wire('a');
                wire.setValue(1);
                expect(wire.getValue()).toBe(1);
            });
        });

        describe(`addObserver`, () => {
            test(`Should add an observer to the wire`, () => {
                const wire = new Wire('a');
                const observer = {
                    notify: jest.fn()
                };
                wire.addObserver(observer);
                expect(wire['observers']).toContain(observer);
            });
        });

        describe(`notifyObservers`, () => {
            test(`Should notify all observers`, () => {
                const wire = new Wire('a');
                const observer1 = {
                    notify: jest.fn()
                };
                const observer2 = {
                    notify: jest.fn()
                };
                wire.addObserver(observer1);
                wire.addObserver(observer2);
                wire.notifyObservers();
                expect(observer1.notify).toHaveBeenCalled();
                expect(observer2.notify).toHaveBeenCalled();
            });
        });

        describe(`isZWire`, () => {
            test(`Should return true if the id starts with 'z'`, () => {
                const wire = new Wire('z00');
                expect(wire.isZWire()).toBe(true);
            });

            test(`Should return false if the id does not start with 'z'`, () => {
                const wire = new Wire('a00');
                expect(wire.isZWire()).toBe(false);
            });
        });
    });

    describe(`AndGate`, () => {
        describe(`Constructor`, () => {
            test(`Should create a new AndGate with the provided id, inputs, and output`, () => {
                const input1 = new Wire('a');
                const input2 = new Wire('b');
                const output = new Wire('c');
                const andGate = new AndGate('d', input1, input2, output);

                expect(andGate['id']).toBe('d');
                expect(andGate['input1']).toBe(input1);
                expect(andGate['input2']).toBe(input2);
                expect(andGate['output']).toBe(output);

                expect(input1['observers']).toContain(andGate);
                expect(input2['observers']).toContain(andGate);
            });
        });

        describe(`notify`, () => {
            test(`Should not set the output value when either input is -1`, () => {
                const input1 = new Wire('a');
                const input2 = new Wire('b');
                const output = new Wire('c');
                const andGate = new AndGate('d', input1, input2, output);
                input1.setValue(1);
                expect(output.getValue()).toBe(-1);
            });

            test(`Should set the output value to the result of input1 & input2`, () => {
                const input1 = new Wire('a');
                const input2 = new Wire('b');
                const output = new Wire('c');
                const andGate = new AndGate('d', input1, input2, output);
                input1.setValue(1);
                input2.setValue(1);
                expect(output.getValue()).toBe(1);
            });
        });
    });

    describe(`OrGate`, () => {
        describe(`Constructor`, () => {
            test(`Should create a new OrGate with the provided id, inputs, and output`, () => {
                const input1 = new Wire('a');
                const input2 = new Wire('b');
                const output = new Wire('c');
                const orGate = new OrGate('d', input1, input2, output);

                expect(orGate['id']).toBe('d');
                expect(orGate['input1']).toBe(input1);
                expect(orGate['input2']).toBe(input2);
                expect(orGate['output']).toBe(output);

                expect(input1['observers']).toContain(orGate);
                expect(input2['observers']).toContain(orGate);
            });
        });

        describe(`notify`, () => {
            test(`Should not set the output value when either input is -1`, () => {
                const input1 = new Wire('a');
                const input2 = new Wire('b');
                const output = new Wire('c');
                const orGate = new OrGate('d', input1, input2, output);
                input1.setValue(1);
                expect(output.getValue()).toBe(-1);
            });

            test(`Should set the output value to the result of input1 | input2`, () => {
                const input1 = new Wire('a');
                const input2 = new Wire('b');
                const output = new Wire('c');
                const orGate = new OrGate('d', input1, input2, output);
                input1.setValue(1);
                input2.setValue(0);
                expect(output.getValue()).toBe(1);

                input1.setValue(0);
                expect(output.getValue()).toBe(0);
            });
        });
    });

    describe(`XorGate`, () => {
        describe(`Constructor`, () => {
            test(`Should create a new XorGate with the provided id, inputs, and output`, () => {
                const input1 = new Wire('a');
                const input2 = new Wire('b');
                const output = new Wire('c');
                const xorGate = new XorGate('d', input1, input2, output);

                expect(xorGate['id']).toBe('d');
                expect(xorGate['input1']).toBe(input1);
                expect(xorGate['input2']).toBe(input2);
                expect(xorGate['output']).toBe(output);

                expect(input1['observers']).toContain(xorGate);
                expect(input2['observers']).toContain(xorGate);
            });
        });

        describe(`notify`, () => {
            test(`Should not set the output value when either input is -1`, () => {
                const input1 = new Wire('a');
                const input2 = new Wire('b');
                const output = new Wire('c');
                const xorGate = new XorGate('d', input1, input2, output);
                input1.setValue(1);
                expect(output.getValue()).toBe(-1);
            });

            test(`Should set the output value to the result of input1 ^ input2`, () => {
                const input1 = new Wire('a');
                const input2 = new Wire('b');
                const output = new Wire('c');
                const xorGate = new XorGate('d', input1, input2, output);
                input1.setValue(1);
                input2.setValue(0);
                expect(output.getValue()).toBe(1);

                input1.setValue(0);
                expect(output.getValue()).toBe(0);
            });
        });
    });
});