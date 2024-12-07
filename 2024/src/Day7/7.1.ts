import { Equation } from './7.1.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const equations: Equation[] = [];
const validEquations: Equation[] = [];

const execute = () => {
    equations.forEach(equation => {
        if (equation.evaluate()) {
            validEquations.push(equation);
        }
    });

    const sumOfValidEquations = validEquations.reduce((acc, equation) => acc + equation.outcome, 0);

    console.log(`There are ${validEquations.length} valid equations.`);
    console.log(`The sum of the valid equations is ${sumOfValidEquations}.`);
}

const parseLine = (line: string) => {
    equations.push(new Equation(line));
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