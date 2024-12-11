import { Stone } from './11.1.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let stones: Stone[] = [];
let initialStones: Stone[] = [];
let MAX_BLINKS = 25;

const execute = () => {
    stones = initialStones;

    for (let blink = 0; blink < MAX_BLINKS; blink++) {
        let newStones: Stone[] = [];
        stones.forEach((stone) => {
            newStones.push(...stone.transform());
        });

        stones = newStones;
    }

    console.log(`There are ${stones.length} stones after ${MAX_BLINKS} blinks.`);

    if (debug) {
        console.log(`The stones are: ${stones.map((stone) => stone.engraving).join(', ')}`);
    }
}

const parseLine = (line: string) => {
    line.split(' ').forEach((engraving) => {
        initialStones.push(new Stone(parseInt(engraving, 10)));
    });
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