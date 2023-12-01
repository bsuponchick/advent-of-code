const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');


const digitsOfInput: number[][] = [];
let calibrationValues: number[] = [];


const execute = () => {
    // This is where you add your code
    digitsOfInput.forEach((digits) => {
        let twoDigitString = '';

        if (digits) {
            let firstDigit = digits.shift();
            let lastDigit = digits.pop();

            if (firstDigit === undefined) {
                firstDigit = 0;
            }

            if (lastDigit === undefined) {
                lastDigit = firstDigit;
            }

            twoDigitString = `${firstDigit}${lastDigit}`;
            
        }

        calibrationValues.push(Number.parseInt(twoDigitString, 10));
    });

    const sum = calibrationValues.reduce((sum, value) => sum + value, 0);
    console.log(`The sum of all calibration values is ${sum}`);
}

const parseLine = (line) => {
    // Include line parsing logic here
    const characters = line.split('');
    const digits: number[] = [];

    characters.forEach((character) => {
        const digit = parseInt(character, 10);
        if (!isNaN(digit)) {
            digits.push(digit);
        }
    });

    digitsOfInput.push(digits);
    console.log(`Digits: ${digits}`);
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