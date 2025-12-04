import { isPossiblyValid } from './3.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const triangles: string[] = [];

const execute = () => {
    let countOfValidTriangles = 0;

    triangles.forEach((triangle) => {
        if (isPossiblyValid(triangle)) {
            countOfValidTriangles++;
        }
    });

    console.log(`The count of valid triangles is ${countOfValidTriangles}`);
}

const parseLine = (line: string) => {
   triangles.push(line);
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