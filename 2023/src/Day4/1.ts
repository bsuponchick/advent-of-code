import { Scratchcard } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const scratchcards: Scratchcard[] = [];

const execute = () => {
    const sumOfPoints = scratchcards.reduce((a, b) => a + b.calculatePoints(), 0);

    console.log(`Sum of points: ${sumOfPoints}`);
}

const parseLine = (line: string) => {
    const noCard = line.slice(line.indexOf(':') + 2);
    const [winningNumbers, scratchcardNumbers] = noCard.split(' | ');

    const winningNumbersArray = winningNumbers.split(' ').map((number) => parseInt(number, 10)).filter((number) => !isNaN(number));
    const scratchcardNumbersArray = scratchcardNumbers.split(' ').map((number) => parseInt(number, 10)).filter((number) => !isNaN(number));

    scratchcards.push(new Scratchcard(winningNumbersArray, scratchcardNumbersArray));
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