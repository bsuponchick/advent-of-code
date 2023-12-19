// import {  } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');



const execute = () => {
    
};

const parseLine = (line: string) => {
    
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