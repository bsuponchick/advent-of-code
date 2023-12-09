import { extrapolateNextValue } from "./2.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const sequences: number[][] = [];

const execute = () => {
    const extrapolatedValues = sequences.map(sequence => extrapolateNextValue(sequence));
    const sumOfExtrapolatedValues = extrapolatedValues.reduce((acc, curr) => acc + curr, 0);

    console.log(`The sum of all extrapolated values is ${sumOfExtrapolatedValues}`);
}

const parseLine = (line: string) => {
   sequences.push(line.split(' ').map(x => parseInt(x, 10)));
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