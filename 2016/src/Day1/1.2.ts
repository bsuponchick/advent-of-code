import { Traveler, Direction } from './1.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let instructions: string[] = [];

const execute = () => {
    const traveler = new Traveler({ x: 0, y: 0 });
    traveler.faceDirection(Direction.North);
    traveler.followInstructionsUntilVisitedCoordinateTwice(instructions);
    console.log(`The distance is ${traveler.calculateDistance()}`);
}

const parseLine = (line: string) => {
   instructions.push(...line.split(', '));
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