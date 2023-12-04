import { Scratchcard } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const scratchcards: Scratchcard[] = [];

const execute = () => {
    scratchcards.forEach((scratchcard, index) => {
        const winningNumberCount = scratchcard.getMatchingNumbers().length;

        for (let i = 1; i <= winningNumberCount; i++) {
            if (scratchcards.length < index + i + 1) {
                break;
            }

            const nextScratchcard = scratchcards[index + i];
            nextScratchcard.addNumberOfCopies(scratchcard.copies);
        }
    });

    const sumOfScratchcards = scratchcards.reduce((a, b) => a + b.copies, 0);

    console.log(`Sum of scratchcards: ${sumOfScratchcards}`);
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