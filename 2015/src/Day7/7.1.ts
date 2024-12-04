import { Wire, AndGate, OrGate, NotGate, LShiftGate, RShiftGate, Gate } from './7.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const wires: Map<string, Wire> = new Map<string, Wire>();
const gates: Gate[] = [];

const execute = () => {
    for (let i = 0; i < gates.length; i++) {
        gates.forEach((gate) => {
            if (debug) {
                gate.print();
            }
            
            if (gate.canTrigger() && !gate.hasTriggered()) {
                gate.trigger();
            } else {
                console.log(`Gate cannot trigger`);
            }
        });
    }

    if (debug) {
        const mapEntries = Array.from(wires.values()).sort((a, b) => a.id.localeCompare(b.id));
        mapEntries.forEach((wire) => {
            wire.print();    
        });
    }

    console.log(`The value of wire a is ${wires.get('a').value}`);
}

const parseLine = (line: string) => {
    const parts = line.split(' ');

    if (line.indexOf('AND') !== -1) {

        if (!wires.has(parts[0])) {
            wires.set(parts[0], new Wire(parts[0]));
        }

        if (!wires.has(parts[2])) {
            wires.set(parts[2], new Wire(parts[2]));
        }

        if (!wires.has(parts[4])) {
            wires.set(parts[4], new Wire(parts[4]));
        }

        const gate = new AndGate(wires.get(parts[0]), wires.get(parts[2]), wires.get(parts[4]));
        gates.push(gate);
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
        wire.setValue(parseInt(parts[0], 10));
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