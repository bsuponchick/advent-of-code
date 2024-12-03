import { add, sortNumerics, calculateDistance } from './1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const leftSide: number[] = [];
const rightSide: number[] = [];
const distances: number[] = [];

const execute = () => {
    leftSide.sort(sortNumerics);
    rightSide.sort(sortNumerics);

    leftSide.forEach((left, leftIndex) => {
        distances.push(calculateDistance(left, rightSide[leftIndex]));
    });

    const totalDistance = distances.reduce(add, 0);

    if (test) {
        console.log(`Distances is ${JSON.stringify(distances)}`);
    }

    console.log(`The total distance is ${totalDistance}`);
}

const parseLine = (line: string) => {
    const parts = line.split('   ');
   
    leftSide.push(parseInt(parts[0]));
    rightSide.push(parseInt(parts[1]));
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