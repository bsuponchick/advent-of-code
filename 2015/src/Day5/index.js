const strings = [];
let countOfNiceStrings = 0;

const containsAtLeast3Vowels = (input) => {
    let count = 0;
    const vowelRegex = /[aeiou]/;

    for (let i = 0; i < input.length; i++) {
        const letter = input.charAt(i);

        if (vowelRegex.test(letter)) {
            count++;
        }
    }

    return count >= 3;
}

const containsADoubleLetter = (input) => {
    const doubleLetterRegex = /(.)\1/;
    return doubleLetterRegex.test(input);
}

const doesNotContainBadStrings = (input) => {
    const badStrings = ['ab', 'cd', 'pq', 'xy'];
    let isGood = true;

    badStrings.forEach((string) => {
        if (input.indexOf(string) >= 0) {
            isGood = false;
        }
    });

    return isGood;
}

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    strings.push(line);
}).on('close', () => {
    strings.forEach((string) => {
        if (containsAtLeast3Vowels(string) && containsADoubleLetter(string) && doesNotContainBadStrings(string)) {
            countOfNiceStrings = countOfNiceStrings + 1;
        }
    })

    console.log(`Santa has ${countOfNiceStrings} nice strings in his file.`);
});
