import { reset } from "../Day16/1.logic";
import { Brick, Block, resetBlockCache } from "./1.logic";

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

    // Set the default position for all bricks to be their stable position
    bricks.forEach((brick) => {
        brick.setDefaultPositions();
    });

    let countOfBricksThatWouldFall = 0;

    bricks.forEach((brick, index) => {
        let brickIdsThatWouldFall: Set<string> = new Set();
        let countBricksThatFell = 0;
        let started = false;

        brick.removeFromBlockCache();

        while (countBricksThatFell > 0 || started === false) {
            started = true;
            countBricksThatFell = 0;

            bricks.forEach((otherBrick, otherIndex) => {
                if (index !== otherIndex) {
                    if (otherBrick.couldPotentiallyFall()) {
                        otherBrick.fall();
                        brickIdsThatWouldFall.add(otherBrick.id);
                        countBricksThatFell++;
                    }
                }
            });
        }

        countOfBricksThatWouldFall += brickIdsThatWouldFall.size;

        if (debug) {
            console.log(`Disintegrating brick ${index} would cause ${brickIdsThatWouldFall.size} bricks to fall.`);
        }

        resetBlockCache(blockCache);
        bricks.forEach(brick => brick.reset());
    });

    console.log(`There are ${countOfBricksThatWouldFall} bricks that would fall.`);
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