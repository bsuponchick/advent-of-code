import { Box, executeHashAlgorithm } from './1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const boxes: Box[] = [];
const instructions: string[] = [];

const execute = () => {
    for (let i = 0; i < 256; i++) {
        boxes.push(new Box(i));
    }

    instructions.forEach((instruction) => {
        const isEqual = instruction.indexOf('=') !== -1;
        const isMinus = instruction.indexOf('-') !== -1;
        const lens = ('' + instruction).replace('=', ' ').replace('-', ' ');
        const label = lens.substring(0, lens.indexOf(' '));

        if (debug) {
            console.log(`------ Lens "${lens}" ------`);
            console.log(`Label: "${label}"`);
        }
        const targetBoxIndex = executeHashAlgorithm(label);
        const targetBox = boxes[targetBoxIndex];

        if (isEqual) {
            targetBox.addLabel(lens);
        } else {
            targetBox.removeLabel(lens);
        }

        if (debug) {
            console.log(`After "${instruction}":`);
            boxes.forEach((box) => {
                if (box.isEmpty() === false) {
                    console.log(`Box ${box.id}: ${box.lenses.join(', ')}`);
                }
            });
        }
    });

    const totalFocusingPower = boxes.reduce((sum, box) => {
        return sum + box.calculateFocusingPower();
    }, 0);

    console.log(`The total focusing power is ${totalFocusingPower}.`);
};

const parseLine = (line: string) => {
    instructions.push(...line.split(','));
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
