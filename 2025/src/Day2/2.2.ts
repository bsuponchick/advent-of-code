import { getInvalidProductIdsFromRange } from './2.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let ranges: string[] = [];

const execute = () => {
    let sumOfInvalidProductIds = 0;
    const invalidProductIds = new Set<number>();

    ranges.forEach((range) => {
        let invalidProductIdsForRange = getInvalidProductIdsFromRange(range);
        invalidProductIdsForRange.forEach((invalidProductId) => {
            if (!invalidProductIds.has(invalidProductId)) {
                invalidProductIds.add(invalidProductId);
                sumOfInvalidProductIds += invalidProductId;
                // console.log(`Running sum of invalid product ids: ${sumOfInvalidProductIds}`);
            } else {
                console.log(`Duplicate invalid product id: ${invalidProductId}`);
            }
        });
    });

    console.log(`The sum of the invalid product ids is ${sumOfInvalidProductIds}`);
}

const parseLine = (line: string) => {
   ranges = line.split(',');
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