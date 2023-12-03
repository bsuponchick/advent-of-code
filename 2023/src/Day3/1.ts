import { Node, establishConnections, getNumbersAdjacentToSymbols } from './1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const grid: Node[][] = [];

const execute = () => {
    let numbers: number[] = [];

    establishConnections(grid);

    grid.forEach((row) => {
        numbers = numbers.concat(getNumbersAdjacentToSymbols(row));    
    });

    const sum = numbers.reduce((a, b) => a + b, 0);

    console.log(`Sum: ${sum}`);
}

const parseLine = (line) => {
    const row: Node[] = [];

    line.split('').forEach((character) => {
        const node = new Node(character);
        row.push(node);
    });

    grid.push(row);
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