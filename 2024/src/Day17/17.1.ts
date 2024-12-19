import { Computer } from './17.1.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');
const test2 = args.includes('--test2');

const computer = new Computer();
let instructions: number[] = [];

const execute = () => {
    if (debug) {
        console.log(`Computer A: ${computer.aRegister}, Computer B: ${computer.bRegister}, Computer C: ${computer.cRegister}`);
        console.log(`Instructions: ${instructions}`);
    }
    computer.executeProgram(instructions);

    if (debug) { 
        console.log(`Computer A: ${computer.aRegister}, Computer B: ${computer.bRegister}, Computer C: ${computer.cRegister}`);
        console.log(`Computer outputs ${computer.outputs}`);
    }
}

const parseLine = (line: string) => {
    if (line.trim() === '') return;

    const parts = line.split(': ');

    if (parts[0] === 'Register A') {
        computer.setARegister(parseInt(parts[1]));
    } else if (parts[0] === 'Register B') {
        computer.setBRegister(parseInt(parts[1]));
    } else if (parts[0] === 'Register C') {
        computer.setCRegister(parseInt(parts[1]));
    } else {
        instructions = instructions.concat(parts[1].split(',').map(i => parseInt(i)));
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