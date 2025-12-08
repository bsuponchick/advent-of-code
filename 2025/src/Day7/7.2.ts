import { QuantumTachyonManifold } from './7.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let lines: string[] = [];

const execute = () => {
    const manifold = new QuantumTachyonManifold();
    manifold.parse(lines);
    manifold.connectTiles();
    
    const countOfSplits = manifold.simulate();
    console.log(`There are ${countOfSplits} splits.`);
}

const parseLine = (line: string) => {
   lines.push(line);
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