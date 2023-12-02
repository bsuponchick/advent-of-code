import { isValid } from './1.utils';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const gameValidities: boolean[] = [];

const execute = () => {
    let sumOfValidGameNumbers = 0;

    gameValidities.forEach((validity, index) => {
        if (validity) {
            sumOfValidGameNumbers = sumOfValidGameNumbers + index + 1;
        }
    });

    console.log(`The sum of all valid game numbers is ${sumOfValidGameNumbers}`);
}

const parseLine = (line) => {
    gameValidities.push(isValid(line));
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