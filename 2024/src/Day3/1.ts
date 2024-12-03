import { findValidInstructions, extractNumbers } from './1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let validInstructions: string[] = [];

const execute = () => {
    if (debug) {
        console.log(`==== Valid Instructions ====`);
        validInstructions.forEach((instruction) => {
            console.log(`${instruction}`);
        });
    }
    
    let sumOfInstructions = 0;

    validInstructions.forEach((instruction) => {
        const numbers = extractNumbers(instruction);
        const product = numbers[0] * numbers[1];
        sumOfInstructions += product;
    });

    console.log(`The sum of the valid instructions is ${sumOfInstructions}.`);
}

const parseLine = (line: string) => {
    validInstructions = validInstructions.concat(findValidInstructions(line));
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