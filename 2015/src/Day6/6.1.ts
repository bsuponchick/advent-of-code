import { LightGrid, Instruction } from './6.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const instructions: Instruction[] = [];

const execute = () => {
    const lightGrid = new LightGrid(1000, 1000);

    instructions.forEach((instruction) => {
        lightGrid.applyInstruction(instruction);
    });

    console.log(`The number of lights that are on is ${lightGrid.countLightsThatAreOn()}`);
}

const parseLine = (line: string) => {
    instructions.push(new Instruction(line));
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