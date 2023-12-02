import { getMiniumCounts, calculatePower } from './2.utils';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const gamePowers: number[] = [];

const execute = () => {
    let sumOfGamePower = gamePowers.reduce((sum, power) => {
        return sum + power;
    } , 0);

    console.log(`The sum of all game power is ${sumOfGamePower}`);
}

const parseLine = (line) => {
    const minimumCounts = getMiniumCounts(line);
    const power = calculatePower(minimumCounts);
    gamePowers.push(power);
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