import { Map, determineBoundingBox } from "./2.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const instructions: string[] = [];
const map = new Map();

const execute = () => {
    const boundingBox = determineBoundingBox(instructions);
    console.log(`Bounding box: ${JSON.stringify(boundingBox)}`);
    map.initialize(boundingBox);

    map.digTrench(boundingBox.startingPoint, instructions);
    map.identifyGroundBlocks();
    map.digInnerTrenches();
    map.print();

    const cubicMetersOfTrench = map.calculateCubitMetersOfTrench();

    console.log(`Cubic meters of trench: ${cubicMetersOfTrench}`);
};

const parseLine = (line: string) => {
    instructions.push(line);
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