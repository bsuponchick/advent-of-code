import { Node, establishConnections, getNumbersAdjacentToSymbols } from './1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const grid: Node[][] = [];

const execute = () => {
    let gears: Node[] = [];
    let sumOfGearRatios = 0;

    establishConnections(grid);

    grid.forEach((row) => {
        getNumbersAdjacentToSymbols(row);    
    });

    grid.forEach((row) => {
        row.forEach((node) => {
            if (node.isGear()) {
                gears.push(node);
            }
        });
    });

    sumOfGearRatios = gears.reduce((a, b) => a + b.calculateGearRatio(), 0);

    console.log(`Sum of gear ratios: ${sumOfGearRatios}`);
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