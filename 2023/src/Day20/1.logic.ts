export enum ModuleType {
    FlipFlop = '%',
    Conjunction = '&',
    Broadcast = 'broadcaster',
    Button = 'button',
    DeadEnd = 'deadend',
    Unknown = '?',
}

export enum PulseType {
    High = 'high',
    Low = 'low',
    None = 'none',
}

export enum ModuleStatus {
    On = 'on',
    Off = 'off',
}

export interface QueuedPulse {
    type: PulseType;
    source: Module;
    destination: Module;
}

interface PulseCount {
    high: number;
    low: number;
}

export class PulseQueue {
    total: number = 0;
    count: PulseCount = {
        high: 0,
        low: 0,
    };
    countHistory: PulseCount[] = [];
    queue: QueuedPulse[] = [];

    constructor() {
        this.queue = [];
    }

    push(pulse: QueuedPulse) {
        this.queue.push(pulse);
        this.total++;
        if (pulse.type === PulseType.High) {
            this.count.high++;
        } else if (pulse.type === PulseType.Low) {
            this.count.low++;
        }

        this.countHistory.push({ ...this.count });
    }

    isEmpty(): boolean {
        return this.queue.length === 0;
    }

    length(): number {
        return this.queue.length;
    }

    getTotalPulseCount(): number {
        return this.total;
    }

    getHighPulseCount(): number {
        return this.count.high;
    }

    getLowPulseCount(): number {
        return this.count.low;
    }

    execute(): QueuedPulse | undefined {
        const pulse = this.queue.shift();

        if (pulse) {
            console.log(`Sending ${pulse.type} pulse from ${pulse.source.id} to ${pulse.destination.id}`);
            pulse.destination.receivePulse(pulse);
        }

        return pulse;
    }
}

export class Module {
    id: string = '';
    type: ModuleType = ModuleType.Unknown;
    destinations: Module[] = [];
    inputs: Module[] = [];
    mostRecentReceivedPulses: {
        [key: string]: PulseType;
    } = {};
    status: ModuleStatus = ModuleStatus.On;
    pulseQueue: PulseQueue;

    constructor(id: string, type: ModuleType, pulseQueue: PulseQueue) {
        this.id = id;
        this.type = type;
        // Singleton pulse queue to be used by all modules
        this.pulseQueue = pulseQueue;

        // Flip-Flops start in the 'off' state
        if (type === ModuleType.FlipFlop) {
            this.status = ModuleStatus.Off;
        }
    }

    receivePulse(pulse: QueuedPulse) {
        // Store the most recent pulse from this source
        this.mostRecentReceivedPulses[pulse.source.id] = pulse.type;

        switch (this.type) {
            case ModuleType.Broadcast:
                // Broadcast modules send the same pulse they received
                this.sendPulse(pulse.type);
                break;
            case ModuleType.Conjunction:
                // Conjunction modules send a low pulse if all inputs most recently sent a high pulse, otherwise it sends a high pulse
                let allHigh = true;
                for (const input of this.inputs) {
                    if (this.mostRecentReceivedPulses[input.id] !== PulseType.High) {
                        allHigh = false;
                        break;
                    }
                }

                if (allHigh) {
                    this.sendPulse(PulseType.Low);
                } else {
                    this.sendPulse(PulseType.High);
                }

                break;
            case ModuleType.FlipFlop:
                // Flip Flop modules ignore high pulses
                if (pulse.type === PulseType.Low) {
                    if (this.status === ModuleStatus.On) {
                        this.status = ModuleStatus.Off;
                        this.sendPulse(PulseType.Low);
                    } else {
                        this.status = ModuleStatus.On;
                        this.sendPulse(PulseType.High);
                    }
                }
                break;
            case ModuleType.Button:
                // Button modules send a low pulse
                this.sendPulse(PulseType.Low);
                break;
            case ModuleType.DeadEnd:
                // Dead End modules ignore pulses
                break;
            default:
                throw new Error('Unknown module type');
        }
    }

    sendPulse(pulse: PulseType) {
        // Send a pulse to all destinations
        for (const destination of this.destinations) {
            this.pulseQueue.push({
                type: pulse,
                source: this,
                destination: destination,
            });
        }
    }

    addDestination(destination: Module) {
        this.destinations.push(destination);
        destination.addInput(this);
    }

    addInput(input: Module) {
        this.inputs.push(input);

        // Conjunction modules default to 'low' pulses in memory
        if (this.type === ModuleType.Conjunction) {
            this.mostRecentReceivedPulses[input.id] = PulseType.Low;
        } else {
            this.mostRecentReceivedPulses[input.id] = PulseType.None;
        }
    }

    isInDefaultState(): boolean {
        let inDefaultState = false;

        switch (this.type) {
            // Broadcast, Button and DeadEnd modules are always in their default state
            case ModuleType.Broadcast:
            case ModuleType.Button:
            case ModuleType.DeadEnd:
                inDefaultState = true;
                break;
            case ModuleType.Conjunction:
                let allLow = true;

                // Conjunction modules are in their default state if the last pulse received from each input was low
                for (const input of this.inputs) {
                    if (this.mostRecentReceivedPulses[input.id] !== PulseType.Low) {
                        allLow = false;
                        break;
                    }
                }

                inDefaultState = allLow;
                break;
            case ModuleType.FlipFlop:
                // Flip Flop modules are in their default state if they are off
                inDefaultState = this.status === ModuleStatus.Off;
                break;
            default:
                throw new Error('Unknown module type');
        }

        return inDefaultState;
    }
}
