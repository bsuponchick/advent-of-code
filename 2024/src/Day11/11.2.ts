import { Stone } from './11.2.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let stones: Stone[] = [];
let MAX_BLINKS = 75;
let cache: Map<number, Map<number, number>> = new Map();

const execute = () => {
    let countOfStones = 0;

    stones.forEach((stone) => {
        countOfStones += stone.transformXTimes(MAX_BLINKS);
    });

    console.log(`There are ${countOfStones} stones after ${MAX_BLINKS} blinks.`);
}

const parseLine = (line: string) => {
    line.split(' ').forEach((engraving) => {
        stones.push(new Stone(parseInt(engraving, 10), cache));
    });
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