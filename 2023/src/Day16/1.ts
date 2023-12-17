import { Tile, Beam, getCountOfBeams, getAllBeams, parseMap, printEnergizedMap } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let map: Tile[][] = [];
const input: string[] = [];

const execute = () => {
    map = parseMap(input);

    const initialBeam = new Beam('east');
    map[0][0].addBeam(initialBeam);

    while (getCountOfBeams(map) > 0) {
        getAllBeams(map).forEach((beam) => {
            beam.move();
        });
    }

    printEnergizedMap(map);

    let countEnergizedTiles = 0;
    map.forEach((row) => {
        row.forEach((tile) => {
            if (tile.isEnergized()) {
                countEnergizedTiles++;
            }
        });
    });

    console.log(`Energized tiles: ${countEnergizedTiles}`);
};

const parseLine = (line: string) => {
    input.push(line);
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