import { TowelOrganizer } from "./19.2.logic";
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');
const test2 = args.includes('--test2');

const organizer = new TowelOrganizer();
const patternsToEvaluate: string[] = [];

const execute = () => {
   let countOfPossiblePatterns = 0;

    patternsToEvaluate.forEach(pattern => {
        countOfPossiblePatterns += organizer.countPossiblePathsToPattern(pattern);
    });

    console.log(`There are ${countOfPossiblePatterns} possible patterns.`);
}

const parseLine = (line: string) => {
    if (line === '') {
        return;
    } else if (line.indexOf(', ') === -1) {
        patternsToEvaluate.push(line);
    } else {
        const towels = line.split(', ');
        towels.forEach(towel => organizer.addTowel(towel));
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : test2 ? './test2.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};