const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let calibrationValues: number[] = [];
let digitsAsStrings: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

export const getDigitsFromString = (string: string): number => {
    // Include line parsing logic here
    const characters = string.split('');
    const digits: number[] = [];
    let digitAsString: string = '';

    characters.forEach((character) => {
        const digit = parseInt(character, 10);
        let exactMatch = false;

        if (!isNaN(digit)) {
            digits.push(digit);
            digitAsString = '';
        } else {
            digitAsString += character;
            let valid = false;

            if (debug) {
                console.log(`Digit as string: ${digitAsString}`);
            }

            digitsAsStrings.forEach((validString) => {
                if (validString === digitAsString) {
                    digits.push(digitsAsStrings.indexOf(validString) + 1);
                    exactMatch = true;
                } else if (validString.indexOf(digitAsString) === 0) {
                    valid = true;
                }
            });

            if (valid === false) {
                if (exactMatch) {
                    digitAsString = `${character}`;
                } else {
                    digitAsString = digitAsString.slice(1);
                }
            }
        }
    });
    
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

    return Number.parseInt(twoDigitString, 10);
}


const execute = () => {
    if (debug) {
        console.log(`Calibration values: ${calibrationValues}`);
    }

    const sum = calibrationValues.reduce((sum, value) => sum + value, 0);
    console.log(`The sum of all calibration values is ${sum}`);
}

const parseLine = (line) => {
    // Include line parsing logic here
    const value = getDigitsFromString(line);

    console.log(`Generated ${value} from ${line}`);
    calibrationValues.push(value);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test2.txt' : './input.txt')
});


lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};