const strings = [];
let countOfNiceStrings = 0;

const niceStrings = [];
const naughtyStrings = [];

let countPairsWitoutOverlap = 0;
let countRepeatingLetter = 0;

const containsPairWithoutOverlap = (input) => {
    let count = 0;
    const pairs = [];
    for (let i = 0; i < input.length - 2; i++) {
        pairs.push(`${input.charAt(i)}${input.charAt(i+1)}`);
    }
    const pairsAlreadyFound = [];

    pairs.forEach((pair, index) => {
        const indexOfFirstInstance = input.indexOf(pair, index);
        const indexOfSecondInstance = input.indexOf(pair, indexOfFirstInstance + 1);
        
        if ((indexOfFirstInstance >= 0) && (indexOfSecondInstance >= 0) && (indexOfSecondInstance - indexOfFirstInstance > 1) && (pairsAlreadyFound.indexOf(pair) === -1)) {
            count++;
            pairsAlreadyFound.push(pair);
            console.log(`Found pair without overlap ${pair} in ${input}`);
        }
    });

    if (count === 1) {
        countPairsWitoutOverlap++;
    }
    return count > 0;
}

const containsARepeatingLetterWithOneLetterBetween = (input) => {
    let count = 0;

    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) === input.charAt(i + 2)) {
            console.log(`Found repeating letter with one in between (${input.charAt(i)}${input.charAt(i+1)}${input.charAt(i+2)}): ${input}`);
            count++;
        }
    }
    
    if (count > 0) {
        countRepeatingLetter++;
    }
    return count > 0;
}

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    strings.push(line);
}).on('close', () => {
    strings.sort().forEach((string) => {
        if (containsPairWithoutOverlap(string) && containsARepeatingLetterWithOneLetterBetween(string)) {
            console.log(`Nice String: ${string}`);
            niceStrings.push(string);
            countOfNiceStrings++;
        } else {
            console.log(`Naughty String: ${string}`);
            naughtyStrings.push(string);
        }
    });

    // niceStrings.sort().forEach((string) => {
    //     console.log(`Nice String: ${string}`);
    // })

    // naughtyStrings.sort().forEach((string) => {
    //     console.log(`Naughty String: ${string}`);
    // });

    console.log(`There were ${countPairsWitoutOverlap} strings with pairs without overlap.`);
    console.log(`There were ${countRepeatingLetter} strings with repeating letters with a letter in between.`);
    console.log(`Santa has ${niceStrings.length} nice strings in his file.`);
});
