interface DigitWithDigitsToRight {
    digit: number;
    index: number;
}

export const findHighestDigitWithDigitsToRight = (digits: number[]): DigitWithDigitsToRight => {
    const sortedDigits = [...digits].sort();

    // console.log(`Sorted digits: ${JSON.stringify(sortedDigits)}`);

    for (let i = sortedDigits.length - 1; i >= 0; i--) {
        const digit = sortedDigits[i];
        // console.log(`Digit: ${digit}`);
        const indexOfDigit = digits.indexOf(digit);
        // console.log(`Index of digit: ${indexOfDigit}`);

        if (indexOfDigit < sortedDigits.length - 1) {
            // This is the highest digit with numbers to the right
            return { 
                digit: digit,
                index: indexOfDigit,
            };
        }
    }
}

export const calculateJoltage = (input: string): number => {
    const digits = input.toString().split('').map(Number);
    let rval = [-1, -1];

    const highestDigitMetadata = findHighestDigitWithDigitsToRight(digits);
    //console.log(`Highest digit metadata: ${JSON.stringify(highestDigitMetadata)}`);
    rval[0] = highestDigitMetadata.digit;

    const remainingDigits = digits.slice(highestDigitMetadata.index + 1);
    //console.log(`Remaining digits: ${JSON.stringify(remainingDigits)}`);
    rval[1] = remainingDigits.sort()[remainingDigits.length - 1];

    return Number(`${rval[0]}${rval[1]}`);
}