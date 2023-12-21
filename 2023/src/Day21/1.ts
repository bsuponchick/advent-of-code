import { Map, Elf } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const MAX_STEPS = 64;
const map = new Map();
const input: string[] = [];

const execute = () => {
    map.initialize(input);
    const elf = new Elf(map);

    elf.takePotentialSteps(test ? 6 : MAX_STEPS, map.getStartingPoint());
    map.printVisited();

    const count = map.countVisited();
    console.log(`The elf can potentially visit ${count} tiles`);
};

const parseLine = (line: string) => {
    input.push(line);
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