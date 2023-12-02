import { getDigitsFromString } from './2.utils';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let calibrationValues: number[] = [];

const execute = () => {
    if (debug) {
        console.log(`Calibration values: ${calibrationValues}`);
    }

    const sum = calibrationValues.reduce((sum, value) => sum + value, 0);
    console.log(`The sum of all calibration values is ${sum}`);
}

const parseLine = (line) => {
    // Include line parsing logic here
    const value = getDigitsFromString(line);

    console.log(`Generated ${value} from ${line}`);
    calibrationValues.push(value);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test2.txt' : './input.txt')
});


lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};