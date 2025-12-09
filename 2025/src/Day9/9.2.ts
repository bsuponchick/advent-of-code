import { XYCoordinate } from '../utils/interfaces/coordinate';
import { Grid } from './9.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const coordinates: XYCoordinate[] = [];

const execute = () => {
    const maxX = Math.max(...coordinates.map(coordinate => coordinate.x));
    const maxY = Math.max(...coordinates.map(coordinate => coordinate.y));
    console.log(`Max X: ${maxX}, Max Y: ${maxY}`);

    const grid = new Grid(maxX + 1, maxY + 1, coordinates);
   
    grid.print();
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