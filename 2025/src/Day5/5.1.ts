import { FreshnessDetector, Range } from './5.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let ranges: Range[] = [];
let ingredientIds: number[] = [];

const execute = () => {
    let countOfFreshIngredientIds = 0;

    ingredientIds.forEach((ingredientId) => {
        if (FreshnessDetector.isFresh(ingredientId, ranges)) {
            countOfFreshIngredientIds++;
        }
    });

    console.log(`The count of fresh ingredient ids is ${countOfFreshIngredientIds}`);
}

const parseLine = (line: string) => {
    if (line.indexOf('-') > -1) {
        const [rangeStart, rangeEnd] = line.split('-').map(Number);
        ranges.push({ start: rangeStart, end: rangeEnd });
    } else if (line.length > 0) {
        ingredientIds.push(Number(line));
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
