import { CephalopodCalculator, Command } from './6.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const commands: Command[] = [];
const numbers: number[][] = [];

const lines: string[][] = [];
const symbols: string[] = [];
const symbolIndices: number[] = [];

const execute = () => {
    // console.log(`lines: ${JSON.stringify(lines)}`);
    // console.log(`symbols: ${JSON.stringify(symbols)}`);

    symbols.forEach((symbol, index) => {
        if (symbol === '+') {
            symbolIndices.push(index);
        } else if (symbol === '*') {
            symbolIndices.push(index);
        }
    });

    // console.log(`symbolIndices: ${JSON.stringify(symbolIndices)}`);

    
    for (let i = 0; i < symbolIndices.length; i++) {
        const startIndex = symbolIndices[i];
        const endIndex = i < symbolIndices.length - 1 ? symbolIndices[i + 1] - 1 : lines[0].length;

        const values = lines.map((line) => line.slice(startIndex, endIndex));

        // console.log(`For index ${i}, the values are ${JSON.stringify(values)}`);
        
        const columns: string[] = [];

        for (let j = 0; j < values[0].length; j++) {
            let stringValue = '';
            for (let k = values.length - 1; k >= 0; k--) {
                if (values[k][j] !== ' ') {
                    stringValue = `${values[k][j]}${stringValue}`;
                }
            }
            columns.push(stringValue);
        }

        const column: number[] = columns.map((column) => Number(column));
        // console.log(`column: ${JSON.stringify(column)}`);

        if (symbols[symbolIndices[i]] === '+') {
            commands.push({ type: 'add', values: column });
        } else if (symbols[symbolIndices[i]] === '*') {
            commands.push({ type: 'multiply', values: column });
        } else {
            console.log(`Symbol ${symbols[symbolIndices[i]]} is not a valid symbol`);
        }
    }

    commands.reverse();

    console.log(`commands: ${JSON.stringify(commands)}`);

    const result = CephalopodCalculator.executeCommandsAndAddResults(commands);
    console.log(`The result is ${result}`);

    // for (let i = 0; i < numbers[0].length; i++) {
    //     const column: number[] = [];
    //     for (let j = 0; j < numbers.length; j++) {
    //         column.push(numbers[j][i]);
    //     }

    //     if (symbols[i] === '+') {
    //         commands.push({ type: 'add', values: column });
    //     } else if (symbols[i] === '*') {
    //         commands.push({ type: 'multiply', values: column });
    //     }
    // }

    // const result = CephalopodCalculator.executeCommandsAndAddResults(commands);
    // console.log(`The result is ${result}`);
}

const parseLine = (line: string) => {
    if (line.trim().charAt(0) === '+' || line.trim().charAt(0) === '*') {
        symbols.push(...line.split(''));
    } else {
        lines.push([...line.split('')]);
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