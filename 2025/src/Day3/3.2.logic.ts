interface DigitWithDigitsToRight {
    digit: number;
    index: number;
}

export const findHighestDigitWithNDigitsToRight = (digits: number[], n: number): DigitWithDigitsToRight => {
    const sortedDigits = [...digits].sort();

    // console.log(`Sorted digits: ${JSON.stringify(sortedDigits)}, n: ${n}`);

    for (let i = sortedDigits.length - 1; i >= 0; i--) {
        const digit = sortedDigits[i];
        // console.log(`Digit: ${digit}`);
        const indexOfDigit = digits.indexOf(digit);
        // console.log(`Index of digit: ${indexOfDigit}`);

        if (((sortedDigits.length - 1) - indexOfDigit) >= n) {
            // This is the highest digit with numbers to the right
            return { 
                digit: digit,
                index: indexOfDigit,
            };
        }
    }
}

export const calculateJoltage = (input: string): number => {
    let remainingDigits = input.toString().split('').map(Number);
    let rval = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    let n = 11;

    while (n >= 0) {
        const highestDigitMetadata = findHighestDigitWithNDigitsToRight(remainingDigits, n);
        rval[11 - n] = highestDigitMetadata.digit;
        remainingDigits = remainingDigits.slice(highestDigitMetadata.index + 1);
        n--;
    }

    return Number(rval.join(''));
}