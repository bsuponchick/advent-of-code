import { determineHorizontalLineOfReflection, determineVerticalLineOfReflection } from "./2.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const patterns: string[][] = [];
let indexOfCurrentPattern = 0;
const horizontalLinesOfReflection: number[] = [0];
const verticalLinesOfReflection: number[] = [0];

const execute = () => {
    patterns.forEach((pattern) => {
        const horizontalLineOfReflection = determineHorizontalLineOfReflection(pattern);

        if (horizontalLineOfReflection !== -1) {
            horizontalLinesOfReflection.push(horizontalLineOfReflection);
        } else {
            const verticalLineOfReflection = determineVerticalLineOfReflection(pattern);
            
            if (verticalLineOfReflection === -1) {
                console.log(`Problem found with pattern:\n${pattern.join('\n')}`)
            } else {
                verticalLinesOfReflection.push(verticalLineOfReflection);
            }
        }
    });

    const sumOfHorizontalLinesOfReflection = horizontalLinesOfReflection.reduce((sum, current) => {
        return sum + current;
    });

    const sumOfVerticalLinesOfReflection = verticalLinesOfReflection.reduce((sum, current) => {
        return sum + current;
    });

    const result = (sumOfHorizontalLinesOfReflection * 100) + sumOfVerticalLinesOfReflection;
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
    input: require('fs').createReadStream(test ? './test.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};