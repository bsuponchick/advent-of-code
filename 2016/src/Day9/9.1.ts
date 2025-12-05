import { Decompressor } from './9.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let message: string = '';

const execute = () => {
    const decompressed = Decompressor.decompress(message);
    console.log(`The decompressed length is ${decompressed.length}`);
}

const parseLine = (line: string) => {
   message = line;
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