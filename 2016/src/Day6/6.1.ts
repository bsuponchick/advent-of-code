import { SignalDecoder } from './6.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let signals: string[] = [];

const execute = () => {
    const signalDecoder = new SignalDecoder(signals);
    console.log(`The decoded message is ${signalDecoder.decode()}`);
}

const parseLine = (line: string) => {
   signals.push(line);
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