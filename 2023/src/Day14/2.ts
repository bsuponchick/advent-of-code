import { parseMap, tiltNorth, calculateLoad } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const input: string[] = [];

const execute = () => {
    const map = parseMap(input);
    tiltNorth(map);
    const load = calculateLoad(map);

    console.log(`The load is ${load}`);
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