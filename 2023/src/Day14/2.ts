import { parseMap, executeSpinCycle, calculateLoad, generateMapString, determineTargetIndex } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const input: string[] = [];
const SPIN_CYCLE_COUNT = 1000000000;
const cache: { [key: string]: number } = {};

const execute = () => {
    const map = parseMap(input);
    let previousIndex = -1;
    let currentIndex = 0;

    for (let i = 0; i < SPIN_CYCLE_COUNT; i++) {
        executeSpinCycle(map);
        const mapString = generateMapString(map);

        if (cache[mapString] !== undefined) {
            // Found a repeat, need to get the index of the last time this map was seen
            console.log(`Repeat detected at ${i}`);
            previousIndex = cache[mapString];
            break;
        } else {
            cache[mapString] = i;
        }

        currentIndex++;
    }

    const targetIndex = determineTargetIndex(currentIndex, previousIndex, SPIN_CYCLE_COUNT);
    let finalMapString = '';

    Object.keys(cache).forEach((key) => {
        if (cache[key] === targetIndex) {
            finalMapString = key;
        }
    });

    const finalMap = parseMap(finalMapString.split('\n'));
    // Have to kill the final newline character or weird things happen with the load calculation
    finalMap.pop();

    const load = calculateLoad(finalMap);

    console.log(`The load is ${load}`);
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