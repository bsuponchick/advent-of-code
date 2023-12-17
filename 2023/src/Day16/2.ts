import { Tile, Beam, parseMap, printEnergizedMap, getCountEnergizedTiles } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let map: Tile[][] = [];
const input: string[] = [];

const execute = () => {
    map = parseMap(input);

    const initialBeam = new Beam('east');
    map[0][0].addBeam(initialBeam);

    const countOfEnergizedTiles = getCountEnergizedTiles(map);
    printEnergizedMap(map);
    console.log(`Energized tiles: ${countOfEnergizedTiles}`);
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