import { NumericKeyPad, DirectionalKeypad } from "./21.1.logic";
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');
const test2 = args.includes('--test2');

const numericKeypad = new NumericKeyPad();
const directionalKeypadOne = new DirectionalKeypad();
const directionalKeypadTwo = new DirectionalKeypad();

const sequences: string[] = [];

const execute = () => {
    let sumOfComplexities = 0;

    sequences.forEach((sequence) => {
        const numericPath = numericKeypad.determinePathToSequence(sequence);
        const directionalKeypadOnePath = directionalKeypadOne.determinePathToSequence(numericPath.join(''));
        const directionalKeypadTwoPath = directionalKeypadTwo.determinePathToSequence(directionalKeypadOnePath.join(''));

        const lengthOfDirectionalKeypadTwoPath = directionalKeypadTwoPath.length;
        const numericPartOfSequence = Number.parseInt(sequence.replace('A', ''), 10);
        const complexityScore = lengthOfDirectionalKeypadTwoPath * numericPartOfSequence;

        if (debug) {
            console.log(`${directionalKeypadTwoPath.join('')}`);
            console.log(`${directionalKeypadOnePath.join('')}`);
            console.log(`${numericPath.join('')}`);
            console.log(`${sequence}`);
            console.log(`Numeric Part of Sequence: ${numericPartOfSequence}`);
            console.log(`Length of Directional Keypad Two Path: ${lengthOfDirectionalKeypadTwoPath}`);
            console.log(`Complexity Score: ${complexityScore}\n`);
        }

        sumOfComplexities += complexityScore;
    });

    console.log(`Sum of complexities: ${sumOfComplexities}`);
}

const parseLine = (line: string) => {
    sequences.push(line);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : test2 ? './test2.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};