import { Tile, Beam, parseMap, printEnergizedMap, getCountEnergizedTiles, reset } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let map: Tile[][] = [];
const input: string[] = [];
let highestCountOfEnergizedTiles = 0;

const execute = () => {
    map = parseMap(input);

    // Start with top row and initial beams going south
    console.log(`Starting with top row and initial beams going south...`);
    for (let x = 0; x < map[0].length; x++) {
        const initialBeam = new Beam('south');
        map[0][x].addBeam(initialBeam);

        const countOfEnergizedTiles = getCountEnergizedTiles(map);
        if (countOfEnergizedTiles > highestCountOfEnergizedTiles) {
            highestCountOfEnergizedTiles = countOfEnergizedTiles;
        }

        reset(map);
    }
    console.log(`Most energized tiles: ${highestCountOfEnergizedTiles}`);


    // Start with left column and initial beams going east
    console.log(`Starting with left column and initial beams going east...`);
    for (let y = 0; y < map.length; y++) {
        const initialBeam = new Beam('east');
        map[y][0].addBeam(initialBeam);

        const countOfEnergizedTiles = getCountEnergizedTiles(map);
        if (countOfEnergizedTiles > highestCountOfEnergizedTiles) {
            highestCountOfEnergizedTiles = countOfEnergizedTiles;
        }

        reset(map);
    }
    console.log(`Most energized tiles: ${highestCountOfEnergizedTiles}`);


    // Start with bottom row and initial beams going north
    console.log(`Starting with bottom row and initial beams going north...`);
    for (let x = 0; x < map[map.length - 1].length; x++) {
        const initialBeam = new Beam('north');
        map[map.length - 1][x].addBeam(initialBeam);

        const countOfEnergizedTiles = getCountEnergizedTiles(map);
        if (countOfEnergizedTiles > highestCountOfEnergizedTiles) {
            highestCountOfEnergizedTiles = countOfEnergizedTiles;
        }

        reset(map);
    }
    console.log(`Most energized tiles: ${highestCountOfEnergizedTiles}`);


    // Start with right column and initial beams going west
    console.log(`Starting with right column and initial beams going west...`);
    for (let y = 0; y < map.length; y++) {
        const initialBeam = new Beam('west');
        map[y][map[y].length - 1].addBeam(initialBeam);

        const countOfEnergizedTiles = getCountEnergizedTiles(map);
        if (countOfEnergizedTiles > highestCountOfEnergizedTiles) {
            highestCountOfEnergizedTiles = countOfEnergizedTiles;
        }

        reset(map);
    }

    console.log(`Most energized tiles: ${highestCountOfEnergizedTiles}`);
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