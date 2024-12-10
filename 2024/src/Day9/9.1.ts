import { DiskMap } from './9.1.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let diskMap: DiskMap;

const execute = () => {
    diskMap.shiftBlocks();
    const checksum = diskMap.calculateChecksum();

    console.log(`Checksum: ${checksum}`);
}

const parseLine = (line: string) => {
    diskMap = new DiskMap();
    diskMap.parseRawInput(line);
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