import { AbaDetector } from './7.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let lines: string[] = [];

const execute = () => {
    let countOfSSlSupportedLines = 0;

    lines.forEach((line) => {
        const lineSegments = AbaDetector.parseLine(line);
        if (AbaDetector.isSslSupported(lineSegments)) {
            countOfSSlSupportedLines++;
        }
    });

    console.log(`There are ${countOfSSlSupportedLines} SSL supported lines.`);
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