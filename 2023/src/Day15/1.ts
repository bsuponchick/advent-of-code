import { executeHashAlgorithm } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const initializationSequence: string[] = [];

const execute = () => {
    const stepHashes = initializationSequence.map((step) => {
        return executeHashAlgorithm(step);
    });

    const sumOfHashes = stepHashes.reduce((sum, hash) => {
        return sum + hash;
    });

    console.log(`The sum of the hashes is ${sumOfHashes}.`);
};

const parseLine = (line: string) => {
    initializationSequence.push(...line.split(','));
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