import { Guard } from './6.2.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const map: string[][] = [];
interface Coordinate {
    x: number;
    y: number;
}
const coordinatesOfVisitedTiles: Coordinate[] = [];

const execute = () => {
    const copyOfMap = map.map((row) => [...row]);
    const guard = new Guard(copyOfMap);
    const startingX = guard.x;
    const startingY = guard.y;

    while (guard.move()) {
        // Do nothing.
    }

    guard.map.forEach((row, rowIndex) => {
        row.forEach((tile, tileIndex) => {
            if (tile === 'X') {
                coordinatesOfVisitedTiles.push({ x: rowIndex, y: tileIndex });
            }
        });
    });

    console.log(`The guard visited ${coordinatesOfVisitedTiles.length} tiles.`);
    console.log(guard.map.map((row) => row.join('')).join('\n'));
    console.log();

    let countOfPotentialObstructions = 0;

    coordinatesOfVisitedTiles.forEach((coordinate, coordIndex) => {
        console.log(`Checking obstruction ${coordIndex + 1} of ${coordinatesOfVisitedTiles.length}...`);
        console.log(`Checking obstruction at ${coordinate.x},${coordinate.y}...`);
        console.log(`There are ${countOfPotentialObstructions} potential obstructions so far...`);

        const x = coordinate.x;
        const y = coordinate.y;

        const temporaryMap = map.map((row) => [...row]);
        temporaryMap[x][y] = 'O';

        const tempGuard = new Guard(temporaryMap);

        try {
            while (tempGuard.moveTwo()) {
                // Do nothing.
            }
        } catch (e) {
            if (debug) {
                console.log(`Loop detected...`);
                console.log(tempGuard.map.map((row) => row.join('')).join('\n'));
                console.log();
            }
            countOfPotentialObstructions++;
        }
    });

    console.log(`There are ${countOfPotentialObstructions} potential obstructions.`);
};

const parseLine = (line: string) => {
    map.push(line.split(''));
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : './input.txt'),
});

lineReader
    .on('line', (line) => {
        parseLine(line);
    })
    .on('close', () => {
        execute();
    });

export {};
