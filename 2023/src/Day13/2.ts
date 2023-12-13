import {
    determineHorizontalLineOfReflection,
    determineVerticalLineOfReflection,
    determineHorizontalLineOfReflectionIfSmudgeExists,
    determineVerticalLineOfReflectionIfSmudgeExists,
} from './2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const patterns: string[][] = [];
let indexOfCurrentPattern = 0;
const horizontalLinesOfReflection: number[] = [0];
const verticalLinesOfReflection: number[] = [0];

const execute = () => {
    patterns.forEach((pattern) => {
        const initialHorizontalLineOfReflection = determineHorizontalLineOfReflection(pattern);
        const smudgedHorizontalLineOfReflection = determineHorizontalLineOfReflectionIfSmudgeExists(pattern);

        console.log(`Initial horizontal line of reflection: ${initialHorizontalLineOfReflection}`);
        console.log(`Smudged horizontal line of reflection: ${smudgedHorizontalLineOfReflection}`);
        
        if (initialHorizontalLineOfReflection !== smudgedHorizontalLineOfReflection) {
            horizontalLinesOfReflection.push(smudgedHorizontalLineOfReflection);
        } else {
            const initialVerticalLineOfReflection = determineVerticalLineOfReflection(pattern);
            const smudgedVerticalLineOfReflection = determineVerticalLineOfReflectionIfSmudgeExists(pattern);

            console.log(`Initial vertical line of reflection: ${initialVerticalLineOfReflection}`);
            console.log(`Smudged vertical line of reflection: ${smudgedVerticalLineOfReflection}`);

            if (smudgedVerticalLineOfReflection === -1) {
                console.log(`Problem found with pattern:\n${pattern.join('\n')}`);
            } else {
                verticalLinesOfReflection.push(smudgedVerticalLineOfReflection);
            }
        }
    });

    const sumOfHorizontalLinesOfReflection = horizontalLinesOfReflection.reduce((sum, current) => {
        return sum + current;
    });

    const sumOfVerticalLinesOfReflection = verticalLinesOfReflection.reduce((sum, current) => {
        return sum + current;
    });

    const result = sumOfHorizontalLinesOfReflection * 100 + sumOfVerticalLinesOfReflection;
    console.log(`Result: ${result}`);
};

const parseLine = (line: string) => {
    if (line.trim().length === 0) {
        indexOfCurrentPattern++;
    } else {
        if (patterns[indexOfCurrentPattern] === undefined) {
            patterns[indexOfCurrentPattern] = [];
        }

        patterns[indexOfCurrentPattern].push(line);
    }
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
