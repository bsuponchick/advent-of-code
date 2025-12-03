import { getInvalidProductIdsFromRange } from './2.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let ranges: string[] = [];

const execute = () => {
    let invalidProductIds: number[] = [];

    ranges.forEach((range) => {
        invalidProductIds.push(...getInvalidProductIdsFromRange(range));
    });

    console.log(`The sum of the invalid product ids is ${invalidProductIds.reduce((sum, invalidProductId) => sum + invalidProductId, 0)}`);
}

const parseLine = (line: string) => {
   ranges = line.split(',');
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