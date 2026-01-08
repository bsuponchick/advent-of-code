import { Instruction } from './12.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let instructions: Instruction[] = [];
let registers: { [key: string]: number } = {};

const execute = () => {
    console.log(`There are ${instructions.length} instructions`);
    console.log(`Instructions: ${JSON.stringify(instructions)}`);

    let instructionPointer = 0;
    registers = { a: 0, b: 0, c: 0, d: 0 };

    while (instructionPointer < instructions.length) {
        const instruction = instructions[instructionPointer];
        instructionPointer = instruction.execute(instructionPointer, registers);

        console.log(`Registers is ${JSON.stringify(registers)}`);
    }

    console.log(`The value of register a is ${registers['a']}`);
}

const parseLine = (line: string) => {
    const parts = line.split(' ');
    instructions.push(new Instruction(parts[0], parts[1], parts[2] ? parts[2] : null));
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