import { calculateJoltage } from './3.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const rowsOfBatteries: string[] = [];

const execute = () => {
    let sumOfJoltages = 0;

    rowsOfBatteries.forEach((battery) => {
        sumOfJoltages += calculateJoltage(battery);
    });

    console.log(`The sum of the joltages is ${sumOfJoltages}`);
}

const parseLine = (line: string) => {
   rowsOfBatteries.push(line);
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