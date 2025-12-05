import { AbbaDetector } from './7.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let lines: string[] = [];

const execute = () => {
    let countOfTlsSupportedLines = 0;

    lines.forEach((line) => {
        const lineSegments = AbbaDetector.parseLine(line);
        if (AbbaDetector.isTlsSupported(lineSegments)) {
            countOfTlsSupportedLines++;
        }
    });

    console.log(`There are ${countOfTlsSupportedLines} TLS supported lines.`);
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