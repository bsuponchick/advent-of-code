import { Wire, AndGate, OrGate, NotGate, LShiftGate, RShiftGate, PassthroughGate, DirectAssignmentGate, Gate } from './7.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const wires: Map<string, Wire> = new Map<string, Wire>();
const gates: Gate[] = [];

const execute = () => {
    for (let i = 0; i < gates.length; i++) {
        gates.forEach((gate) => {
            if (gate.canTrigger()) {
                if (gate.hasTriggered()) {
                    if (debug) {
                        console.log(`Gate has already triggered...`);
                        gate.print();
                    }
                } else {
                    if (debug) {
                        console.log(`Gate can trigger`);
                        gate.print();
                    }
                    gate.trigger();
                }
            } else {
                if (debug) {
                    console.log(`Gate cannot trigger yet...`);
                    gate.print();
                }
            }
        });
    }

    if (debug) {
        const mapEntries = Array.from(wires.values()).sort((a, b) => a.id.localeCompare(b.id));
        mapEntries.forEach((wire) => {
            wire.print();    
        });
    }

    const wireAValue = wires.get('a').value;
    console.log(`The initial value of wire a is ${wireAValue}`);

    console.log(`====================================\n\n\n`);
    console.log(`Resetting all wires and gates...`);
    Array.from(wires.values()).forEach((wire) => {
        wire.reset();
    });

    gates.forEach((gate) => {
        gate.reset();
    });

    console.log(`All gates and wires reset...`);

    console.log(`====================================\n\n\n`);

    // Setting the value of wire b to the value of wire a
    wires.get('b').setValue(wireAValue);

    if (debug) {
        console.log(`Wire values after reset...`)
        const mapEntries = Array.from(wires.values()).sort((a, b) => a.id.localeCompare(b.id));
        mapEntries.forEach((wire) => {
            wire.print();    
        });
    }

    console.log(`====================================\n\n\n`);


    console.log(`Executing again...`);

    for (let i = 0; i < gates.length; i++) {
        gates.forEach((gate) => {
            if (gate.getOutput().id === 'b') {
                // skip
            } else if (gate.canTrigger()) {
                if (gate.hasTriggered()) {
                    if (debug) {
                        console.log(`Gate has already triggered...`);
                        gate.print();
                    }
                } else {
                    if (debug) {
                        console.log(`Gate can trigger`);
                        gate.print();
                    }
                    gate.trigger();
                }
            } else {
                if (debug) {
                    console.log(`Gate cannot trigger yet...`);
                    gate.print();
                }
            }
        });
    }

    if (debug) {
        const mapEntries = Array.from(wires.values()).sort((a, b) => a.id.localeCompare(b.id));
        mapEntries.forEach((wire) => {
            wire.print();    
        });
    }

    console.log(`The final value of wire a is ${wires.get('a').value}`);
}

const parseLine = (line: string) => {
    const parts = line.split(' ');

    if (line.indexOf('AND') !== -1) {
        if (!wires.has(parts[2])) {
            wires.set(parts[2], new Wire(parts[2]));
        }

        if (!wires.has(parts[4])) {
            wires.set(parts[4], new Wire(parts[4]));
        }

        if (Number.isNaN(parseInt(parts[0], 10))) {
            if (!wires.has(parts[0])) {
                wires.set(parts[0], new Wire(parts[0]));
            }

            const gate = new AndGate(wires.get(parts[0]), wires.get(parts[2]), wires.get(parts[4]));
            gates.push(gate);
        } else {
            const gate = new AndGate(parseInt(parts[0], 10), wires.get(parts[2]), wires.get(parts[4]));
            gates.push(gate);
        }
    } else if (line.indexOf('OR') !== -1) {
        if (!wires.has(parts[0])) {
            wires.set(parts[0], new Wire(parts[0]));
        }

        if (!wires.has(parts[2])) {
            wires.set(parts[2], new Wire(parts[2]));
        }

        if (!wires.has(parts[4])) {
            wires.set(parts[4], new Wire(parts[4]));
        }

        const gate = new OrGate(wires.get(parts[0]), wires.get(parts[2]), wires.get(parts[4]));
        gates.push(gate);
    } else if (line.indexOf('NOT') !== -1) {
        if (!wires.has(parts[1])) {
            wires.set(parts[1], new Wire(parts[1]));
        }

        if (!wires.has(parts[3])) {
            wires.set(parts[3], new Wire(parts[3]));
        }

        const gate = new NotGate(wires.get(parts[1]), wires.get(parts[3]));
        gates.push(gate);
    } else if (line.indexOf('LSHIFT') !== -1) {
        if (!wires.has(parts[0])) {
            wires.set(parts[0], new Wire(parts[0]));
        }

        if (!wires.has(parts[4])) {
            wires.set(parts[4], new Wire(parts[4]));
        }

        const gate = new LShiftGate(wires.get(parts[0]), parseInt(parts[2]), wires.get(parts[4]));
        gates.push(gate);
    } else if (line.indexOf('RSHIFT') !== -1) {
        if (!wires.has(parts[0])) {
            wires.set(parts[0], new Wire(parts[0]));
        }

        if (!wires.has(parts[4])) {
            wires.set(parts[4], new Wire(parts[4]));
        }

        const gate = new RShiftGate(wires.get(parts[0]), parseInt(parts[2]), wires.get(parts[4]));
        gates.push(gate);
    } else {
        // This is an assignment to a wire
        if (!wires.has(parts[2])) {
            wires.set(parts[2], new Wire(parts[2]));
        }

        const wire = wires.get(parts[2]);

        if (Number.isNaN(parseInt(parts[0], 10))) {
            // This is a passthrough gate
            console.log(`Passthrough gate found: ${parts[0]} -> ${parts[2]}`);
            if (!wires.has(parts[0])) {
                wires.set(parts[0], new Wire(parts[0]));
            }

            const gate = new PassthroughGate(wires.get(parts[0]), wire);
            gates.push(gate);
        } else {
            // This is a direct assignment
            console.log(`Direct assignment found: ${parts[0]} -> ${parts[2]}`);

            const gate = new DirectAssignmentGate(parseInt(parts[0], 10), wire);
            gates.push(gate);
        }
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};