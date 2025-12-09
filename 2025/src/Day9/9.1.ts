import { XYCoordinate } from '../utils/interfaces/coordinate';
import { calculateAreaBetweenCoordinates } from './9.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const coordinates: XYCoordinate[] = [];

const execute = () => {
    let maxArea = 0;

    for (let i = 0; i < coordinates.length; i++) {
        for (let j = i + 1; j < coordinates.length; j++) {
            const area = calculateAreaBetweenCoordinates(coordinates[i], coordinates[j]);
            if (area > maxArea) {
                maxArea = area;
            }
        }
    }
    console.log(`The max area is ${maxArea}`);
}

const parseLine = (line: string) => {
    const [x, y] = line.split(',').map(Number);
    coordinates.push({ x, y });
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