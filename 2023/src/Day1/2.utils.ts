const digitsAsStrings: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

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