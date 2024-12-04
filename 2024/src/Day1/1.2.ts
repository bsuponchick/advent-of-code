import { add } from './1.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const leftSide: number[] = [];
const rightSide: number[] = [];
const similarityScores: number[] = [];

const execute = () => {
    leftSide.forEach((left) => {
        let countOfOccurences = 0;

        rightSide.forEach((right) => {
            if (left === right) {
                countOfOccurences++;
            }
        });

        similarityScores.push(countOfOccurences * left);
    });

    const sumOfSimilarityScores = similarityScores.reduce(add, 0);

    console.log(`The sum of the similarity scores is ${sumOfSimilarityScores}`);
}

const parseLine = (line: string) => {
    const parts = line.split('   ');
   
    leftSide.push(parseInt(parts[0]));
    rightSide.push(parseInt(parts[1]));
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