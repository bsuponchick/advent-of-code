import { add } from './18.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let message: string = '';

const execute = () => {
    console.log(`The message is ${message}`);
    console.log(`Get ready for AoC 2016!`);
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