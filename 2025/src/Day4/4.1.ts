import { Grid, Tile } from './4.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const lines: string[] = [];

const execute = () => {
    const grid = new Grid();
    grid.parse(lines);
    grid.printWithForkliftAccess();

    const countOfTilesWithForkliftAccess = grid.countTilesWithForkliftAccess();
    console.log(`There are ${countOfTilesWithForkliftAccess} tiles with forklift access.`);
}

const parseLine = (line: string) => {
   lines.push(line);
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