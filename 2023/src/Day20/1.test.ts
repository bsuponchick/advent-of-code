import { describe, expect, test } from '@jest/globals';
import { Module, ModuleType, ModuleStatus, PulseType, QueuedPulse, PulseQueue } from './1.logic';

describe('Day 20 - Part 1', () => {
    describe(`Module`, () => {
        describe(`constructor`, () => {
            test(`should set the module's id and type`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('2', ModuleType.Broadcast, queue),
                    type: PulseType.High,
                    destination: new Module('3', ModuleType.Broadcast, queue),
                });

                const module = new Module('1', ModuleType.Broadcast, queue);
                expect(module.id).toBe('1');
                expect(module.type).toBe(ModuleType.Broadcast);
                expect(module.status).toBe(ModuleStatus.On);
                expect(module.pulseQueue).toBe(queue);
            });

            test(`should set the module's status to 'off' for FlipFlop modules`, () => {
                const queue: PulseQueue = new PulseQueue();
                const module = new Module('1', ModuleType.FlipFlop, queue);
                expect(module.status).toBe(ModuleStatus.Off);
            });
        });

        describe(`addDestination`, () => {
            test(`should add a destination to the module`, () => {
                const queue: PulseQueue = new PulseQueue();
                const module = new Module('1', ModuleType.Broadcast, queue);
                const destination = new Module('2', ModuleType.Broadcast, queue);
                module.addDestination(destination);
                expect(module.destinations).toEqual([destination]);
            });

            test(`should add an input to the destination module`, () => {
                const queue: PulseQueue = new PulseQueue();
                const module = new Module('1', ModuleType.Broadcast, queue);
                const destination = new Module('2', ModuleType.Broadcast, queue);
                module.addDestination(destination);
                expect(destination.inputs).toEqual([module]);
            });
        });

        describe(`addInput`, () => {
            test(`should add an input to the module`, () => {
                const queue: PulseQueue = new PulseQueue();
                const module = new Module('1', ModuleType.Broadcast, queue);
                const input = new Module('2', ModuleType.Broadcast, queue);
                module.addInput(input);
                expect(module.inputs).toEqual([input]);
            });

            test(`should set the module's most recent received pulse to 'low' for Conjunction modules`, () => {
                const queue: PulseQueue = new PulseQueue();
                const module = new Module('1', ModuleType.Conjunction, queue);
                const input = new Module('2', ModuleType.Broadcast, queue);
                module.addInput(input);
                expect(module.mostRecentReceivedPulses).toEqual({
                    '2': PulseType.Low,
                });
            });

            test(`should set the module's most recent received pulse to 'none' for non-Conjunction modules`, () => {
                const queue: PulseQueue = new PulseQueue();
                const module = new Module('1', ModuleType.Broadcast, queue);
                const input = new Module('2', ModuleType.Broadcast, queue);
                module.addInput(input);
                expect(module.mostRecentReceivedPulses).toEqual({
                    '2': PulseType.None,
                });
            });
        });

        describe(`isInDefaultState`, () => {
            test(`should return true for Broadcast modules`, () => {
                const queue: PulseQueue = new PulseQueue();
                const module = new Module('1', ModuleType.Broadcast, queue);
                expect(module.isInDefaultState()).toBe(true);
            });

            test(`should return true for Button modules`, () => {
                const queue: PulseQueue = new PulseQueue();
                const module = new Module('1', ModuleType.Button, queue);
                expect(module.isInDefaultState()).toBe(true);
            });

            test(`should return true for Conjunction modules with all low inputs`, () => {
                const queue: PulseQueue = new PulseQueue();
                const module = new Module('1', ModuleType.Conjunction, queue);
                const input1 = new Module('2', ModuleType.Broadcast, queue);
                const input2 = new Module('3', ModuleType.Broadcast, queue);
                module.addInput(input1);
                module.addInput(input2);
                module.mostRecentReceivedPulses['2'] = PulseType.Low;
                module.mostRecentReceivedPulses['3'] = PulseType.Low;
                expect(module.isInDefaultState()).toBe(true);
            });

            test(`should return false for Conjunction modules with a high input`, () => {
                const queue: PulseQueue = new PulseQueue();
                const module = new Module('1', ModuleType.Conjunction, queue);
                const input1 = new Module('2', ModuleType.Broadcast, queue);
                const input2 = new Module('3', ModuleType.Broadcast, queue);
                module.addInput(input1);
                module.addInput(input2);
                module.mostRecentReceivedPulses['2'] = PulseType.Low;
                module.mostRecentReceivedPulses['3'] = PulseType.High;
                expect(module.isInDefaultState()).toBe(false);
            });

            test(`should return false for FlipFlop modules in the On status`, () => {
                const queue: PulseQueue = new PulseQueue();
                const module = new Module('1', ModuleType.FlipFlop, queue);
                module.status = ModuleStatus.On;
                expect(module.isInDefaultState()).toBe(false);
            });

            test(`should return true for FlipFlop modules in the Off status`, () => {
                const queue: PulseQueue = new PulseQueue();
                const module = new Module('1', ModuleType.FlipFlop, queue);
                module.status = ModuleStatus.Off;
                expect(module.isInDefaultState()).toBe(true);
            });
        });

        describe(`sendPulse`, () => {
            test(`should add a pulse to the module's pulse queue`, () => {
                const queue: PulseQueue = new PulseQueue();
                const module = new Module('1', ModuleType.Broadcast, queue);
                const destination = new Module('2', ModuleType.Broadcast, queue);
                module.addDestination(destination);
                module.sendPulse(PulseType.Low);
                expect(queue.length()).toEqual(1);
            });

            test(`should add a pulse to the module's pulse queue for each destination`, () => {
                const queue: PulseQueue = new PulseQueue();
                const module = new Module('1', ModuleType.Broadcast, queue);
                const destination1 = new Module('2', ModuleType.Broadcast, queue);
                const destination2 = new Module('3', ModuleType.Broadcast, queue);
                module.addDestination(destination1);
                module.addDestination(destination2);
                module.sendPulse(PulseType.Low);
                expect(queue.length()).toEqual(2);
            });
        });
    });

    describe(`PulseQueue`, () => {
        describe(`constructor`, () => {
            test(`should return an initial length of 0`, () => {
                const queue: PulseQueue = new PulseQueue();
                expect(queue.length()).toEqual(0);
            });

            test(`should return an initial total pulse count of 0`, () => {
                const queue: PulseQueue = new PulseQueue();
                expect(queue.getTotalPulseCount()).toEqual(0);
            });
        });

        describe(`push`, () => {
            test(`should add a pulse to the queue`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                });
                expect(queue.length()).toEqual(1);
            });

            test(`should increment the total pulse count`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                });
                expect(queue.getTotalPulseCount()).toEqual(1);
            });

            test(`should increment the high pulse count`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.High,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                });
                expect(queue.getHighPulseCount()).toEqual(1);
                expect(queue.getLowPulseCount()).toEqual(0);
            });

            test(`should increment the low pulse count`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                });
                expect(queue.getLowPulseCount()).toEqual(1);
                expect(queue.getHighPulseCount()).toEqual(0);
            });
        });

        describe(`getHighPulseCount`, () => {
            test(`should return the high pulse count`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.High,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                });
                expect(queue.getHighPulseCount()).toEqual(1);
            });

            test(`should return the high pulse count for multiple pulses`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.High,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                });
                queue.push({
                    source: new Module('3', ModuleType.Broadcast, queue),
                    type: PulseType.High,
                    destination: new Module('4', ModuleType.Broadcast, queue),
                });
                expect(queue.getHighPulseCount()).toEqual(2);
            });
        });

        describe(`getLowPulseCount`, () => {
            test(`should return the low pulse count`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                });
                expect(queue.getLowPulseCount()).toEqual(1);
            });

            test(`should return the low pulse count for multiple pulses`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                });
                queue.push({
                    source: new Module('3', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: new Module('4', ModuleType.Broadcast, queue),
                });
                expect(queue.getLowPulseCount()).toEqual(2);
            });
        });

        describe(`isEmpty`, () => {
            test(`should return true for an empty queue`, () => {
                const queue: PulseQueue = new PulseQueue();
                expect(queue.isEmpty()).toBe(true);
            });

            test(`should return false for a non-empty queue`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                });
                expect(queue.isEmpty()).toBe(false);
            });
        });

        describe(`length`, () => {
            test(`should return the length of the queue`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                });
                expect(queue.length()).toEqual(1);
            });
        });

        describe(`getTotalPulseCount`, () => {
            test(`should return the total pulse count`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                });
                expect(queue.getTotalPulseCount()).toEqual(1);
            });

            test(`should return the total pulse count for multiple pulses`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                });
                queue.push({
                    source: new Module('3', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: new Module('4', ModuleType.Broadcast, queue),
                });
                expect(queue.getTotalPulseCount()).toEqual(2);
            });
        });

        describe(`execute`, () => {
            test(`should return the next pulse in the queue`, () => {
                const queue: PulseQueue = new PulseQueue();
                const pulse: QueuedPulse = {
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                };
                queue.push(pulse);
                expect(queue.execute()).toEqual(pulse);
            });

            test(`should return undefined for an empty queue`, () => {
                const queue: PulseQueue = new PulseQueue();
                expect(queue.execute()).toBeUndefined();
            });

            test(`should not decrement the total pulse count`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                });
                queue.execute();
                expect(queue.getTotalPulseCount()).toEqual(1);
            });

            test(`should remove the pulse from the queue`, () => {
                const queue: PulseQueue = new PulseQueue();
                queue.push({
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: new Module('2', ModuleType.Broadcast, queue),
                });
                queue.execute();
                expect(queue.length()).toEqual(0);
            });

            test(`should execute the pulse's destination module`, () => {
                const queue: PulseQueue = new PulseQueue();
                const destination = new Module('2', ModuleType.Broadcast, queue);
                const pulse: QueuedPulse = {
                    source: new Module('1', ModuleType.Broadcast, queue),
                    type: PulseType.Low,
                    destination: destination,
                };
                queue.push(pulse);
                queue.execute();
                expect(destination.mostRecentReceivedPulses['1']).toEqual(PulseType.Low);
            });
        });
    });
});