import { Brick, Block } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const blockCache: { [id: string]: Block } = {};
const bricks: Brick[] = [];

const execute = () => {
    let atLeastOneFell = false;
    let started = false;

    if (debug) {
        console.log(`Bricks: ${bricks.length}`);
    }

    while(atLeastOneFell || (started === false)) {
        let countOfBricksFalling = 0;
        atLeastOneFell = false;
        started = true;

        bricks.forEach(brick => {
            if (brick.couldPotentiallyFall()) {
                brick.fall();
                atLeastOneFell = true;
                countOfBricksFalling++;
            }
        });

        if (debug) {
            console.log(`Bricks falling: ${countOfBricksFalling}`);
        }
    }

    if (debug) {
        console.log(`All bricks stable!`);
    }

    let countOfDisentegratableBricks = 0;

    bricks.forEach((brick, index) => {
        let countBricksThatCouldFall = 0;
        brick.removeFromBlockCache();

        bricks.forEach((otherBrick, otherIndex) => {
            if (index !== otherIndex) {
                if (otherBrick.couldPotentiallyFall()) {
                    countBricksThatCouldFall++;
                }
            }
        });

        if (countBricksThatCouldFall === 0) {
            countOfDisentegratableBricks++;
        }

        brick.addToBlockCache();
    });

    console.log(`There are ${countOfDisentegratableBricks} bricks that can be disentegrated.`);
};

const parseLine = (line: string) => {
    const brick = new Brick(line, blockCache);
    bricks.push(brick);
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