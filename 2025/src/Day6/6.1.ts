import { CephalopodCalculator, Command } from './6.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const commands: Command[] = [];
const numbers: number[][] = [];
const symbols: string[] = [];

const execute = () => {
    for (let i = 0; i < numbers[0].length; i++) {
        const column: number[] = [];
        for (let j = 0; j < numbers.length; j++) {
            column.push(numbers[j][i]);
        }

        if (symbols[i] === '+') {
            commands.push({ type: 'add', values: column });
        } else if (symbols[i] === '*') {
            commands.push({ type: 'multiply', values: column });
        }
    }

    const result = CephalopodCalculator.executeCommandsAndAddResults(commands);
    console.log(`The result is ${result}`);
}

const parseLine = (line: string) => {
    const splitLine = line.trim().replace(/(\s+)/g, 'XXX').split('XXX');

    if (splitLine[0] === '+' || splitLine[0] === '*') {
        for (const symbol of splitLine) {
            if (symbol.trim().length > 0) {
                symbols.push(symbol);
            }
        }
    } else {
        const row: number[] = [];

        for (const number of splitLine) {
            if (number.trim().length > 0) {   
                row.push(Number(number));
            }
        }

        numbers.push(row);
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