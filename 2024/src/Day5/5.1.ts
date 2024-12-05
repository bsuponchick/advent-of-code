import { Rule, PotentialUpdate, parseRule, parsePotentialUpdate } from './5.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let endOfRules = false;
let rules: Rule[] = [];
let potentialUpdates: PotentialUpdate[] = [];
let validUpdates: PotentialUpdate[] = [];

const execute = () => {
    potentialUpdates.forEach((potentialUpdate) => {
        if (potentialUpdate.determineIfValid(rules)) {
            validUpdates.push(potentialUpdate);
        }
    });

    const middlePageNumbers = validUpdates.map((validUpdate) => validUpdate.getMiddlePageNumber());
    const sumOfMiddlePageNumbers = middlePageNumbers.reduce((acc, middlePageNumber) => acc + middlePageNumber, 0);

    console.log(`The sum of the middle page numbers is ${sumOfMiddlePageNumbers}`);
}

const parseLine = (line: string) => {
    if (line.trim().length === 0) {
        endOfRules = true;
        return;
    } else if (!endOfRules) {
        const rule = parseRule(line);
        rules.push(rule);
    } else {
        const potentialUpdate = parsePotentialUpdate(line);
        potentialUpdates.push(potentialUpdate);
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

export {};