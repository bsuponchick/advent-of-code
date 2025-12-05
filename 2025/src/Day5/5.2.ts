import { SetUnionizer, Range } from './5.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let ranges: Range[] = [];

const execute = () => {
    console.log(`There are ${ranges.length} ranges`);
    ranges.sort((a, b) => a.start - b.start);

    // console.log(`Sorted ranges: ${JSON.stringify(ranges)}`);

    const countOfUniqueItems = SetUnionizer.countUniqueItemsInRanges(ranges);

    console.log(`There are ${countOfUniqueItems} unique items`);

}

const parseLine = (line: string) => {
    if (line.indexOf('-') > -1) {
        const [rangeStart, rangeEnd] = line.split('-').map(Number);
        ranges.push({ start: rangeStart, end: rangeEnd });
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export { };
