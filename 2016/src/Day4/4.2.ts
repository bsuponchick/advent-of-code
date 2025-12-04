import { Room } from './4.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let input: string[] = [];

const execute = () => {
    let sumOfValidSectorIds = 0;

    input.forEach((line) => {
        const room = new Room(line);
        if (room.isValid()) {
            console.log(`${room.decryptName()} - ${room.sectorId}`);
        }
    });
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