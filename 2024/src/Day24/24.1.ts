import { Wire, AndGate, OrGate, XorGate } from './24.1.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');
const test2 = args.includes('--test2');

const initialValues = new Map<string, number>();
const wires: Map<string, Wire> = new Map<string, Wire>();
const gates = [];

const execute = () => {
    console.log(`There are ${gates.length} gates`);
    console.log(`There are ${wires.size} wires`);

    const wireKeys = Array.from(wires.keys()).sort();

    for (const [key, value] of initialValues) {
         console.log(`Setting ${key} to ${value}`);
         wires.get(key).setValue(value);
    }

    if (debug) {
        wireKeys.forEach((key) => {
            console.log(`${key}: ${wires.get(key).getValue()}`);    
        });
    }

    const zWiresInReverseOrder = wireKeys.filter(key => wires.get(key).isZWire()).reverse();
    const zWireValues = zWiresInReverseOrder.map(key => wires.get(key).getValue());
    const binaryValue = parseInt(zWireValues.join(''), 2)

    console.log(`The binary value is ${binaryValue}`);
}

const parseLine = (line: string) => {
    if (line.trim() === '') {
        return;
    }

    if (line.indexOf(':') > -1) {
        const [key, value] = line.split(': ');
        initialValues.set(key, parseInt(value));
    } else {
        if (line.indexOf('AND') > -1) {
            const sides = line.split(' -> ');
            const wireIds = sides[0].split(' AND ');

            if (wires.get(wireIds[0]) === undefined) {
                wires.set(wireIds[0], new Wire(wireIds[0]));
            }

            if (wires.get(wireIds[1]) === undefined) {
                wires.set(wireIds[1], new Wire(wireIds[1]));
            }

            if (wires.get(sides[1]) === undefined) {
                wires.set(sides[1], new Wire(sides[1]));
            }

            gates.push(new AndGate(`${wireIds[0]} AND ${wireIds[1]}`, wires.get(wireIds[0]), wires.get(wireIds[1]), wires.get(sides[1])));
        } else if (line.indexOf('XOR') > -1) {
            const sides = line.split(' -> ');
            const wireIds = sides[0].split(' XOR ');

            if (wires.get(wireIds[0]) === undefined) {
                wires.set(wireIds[0], new Wire(wireIds[0]));
            }

            if (wires.get(wireIds[1]) === undefined) {
                wires.set(wireIds[1], new Wire(wireIds[1]));
            }

            if (wires.get(sides[1]) === undefined) {
                wires.set(sides[1], new Wire(sides[1]));
            }

            gates.push(new XorGate(`${wireIds[0]} XOR ${wireIds[1]}`, wires.get(wireIds[0]), wires.get(wireIds[1]), wires.get(sides[1])));
        } else {
            const sides = line.split(' -> ');
            const wireIds = sides[0].split(' OR ');

            if (wires.get(wireIds[0]) === undefined) {
                wires.set(wireIds[0], new Wire(wireIds[0]));
            }

            if (wires.get(wireIds[1]) === undefined) {
                wires.set(wireIds[1], new Wire(wireIds[1]));
            }

            if (wires.get(sides[1]) === undefined) {
                wires.set(sides[1], new Wire(sides[1]));
            }

            gates.push(new OrGate(`${wireIds[0]} OR ${wireIds[1]}`, wires.get(wireIds[0]), wires.get(wireIds[1]), wires.get(sides[1])));
        }
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : test2 ? './test2.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};