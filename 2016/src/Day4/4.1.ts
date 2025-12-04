import { Room } from './4.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let input: string[] = [];

const execute = () => {
    let sumOfValidSectorIds = 0;

    input.forEach((line) => {
        const room = new Room(line);
        if (room.isValid()) {
            sumOfValidSectorIds += room.sectorId;
        }
    });

    console.log(`The sum of valid sector ids is ${sumOfValidSectorIds}`);
}

const parseLine = (line: string) => {
   input.push(line);
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