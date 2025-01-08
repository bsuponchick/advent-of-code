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
        let shortestPathLength = Number.MAX_SAFE_INTEGER;
        let shortestPath = '';

        const numericPaths = numericKeypad.determineShortestPathsForSequence(sequence);

        numericPaths.forEach((path) => {
            const directionalKeypadOnePaths = directionalKeypadOne.determineShortestPathsForSequence(path);

            directionalKeypadOnePaths.forEach((d1path) => {
                const directionalKeypadTwoPaths = directionalKeypadTwo.determineShortestPathsForSequence(d1path);

                directionalKeypadTwoPaths.forEach((d2path) => {
                    if (d2path.length < shortestPathLength) {
                        shortestPathLength = d2path.length;
                        shortestPath = d2path;
                    }
                });
            });
        });

        const lengthOfDirectionalKeypadTwoPath = shortestPathLength;
        const numericPartOfSequence = Number.parseInt(sequence.replace('A', ''), 10);
        const complexityScore = lengthOfDirectionalKeypadTwoPath * numericPartOfSequence;

        if (debug) {
            console.log(`${shortestPath}`);
            // console.log(`${directionalKeypadOnePath}`);
            // console.log(`${numericPath}`);
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