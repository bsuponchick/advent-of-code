import { DiskMap } from './9.2.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let diskMap: DiskMap;

const execute = () => {
    diskMap.shiftBlocks();
    console.log(`=== Block String After All Shifts is ===`);
    console.log(diskMap.generateBlockString());

    const checksum = diskMap.calculateChecksum();

    console.log(`Checksum: ${checksum}`);
}

const parseLine = (line: string) => {
    diskMap = new DiskMap();
    diskMap.parseRawInput(line);
    console.log(`=== Block String After Parsing is ===`);
    console.log(diskMap.generateBlockString());
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