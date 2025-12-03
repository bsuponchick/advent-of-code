export const getNextLargestPotentialInvalidId = (productId: number): number => {
    let digits = (productId + 1).toString().split('');

    if (digits.length % 2 === 0) {
        return productId + 1;
    }

    return Math.pow(10, digits.length);
}

export const getNextSmallestPotentialInvalidId = (productId: number): number => {
    let digits = productId.toString().split('');

    if (digits.length % 2 === 0) {
        return productId;
    }

    return Math.pow(10, digits.length - 2);
}

export const isInvalidProductId = (productId: number): boolean => {
    const digits = productId.toString().split('');

    let firstHalfOfDigits = digits.slice(0, digits.length / 2);
    let secondHalfOfDigits = digits.slice(digits.length / 2);

    let firstHalfDigitsAsNumber = Number.parseInt(firstHalfOfDigits.join(''), 10);
    let secondHalfDigitsAsNumber = Number.parseInt(secondHalfOfDigits.join(''), 10);

    return firstHalfDigitsAsNumber === secondHalfDigitsAsNumber;
}

export const getInvalidProductIdsFromRange = (range: string): number[] => {
    const [start, end] = range.split('-').map(Number);
    const invalidProductIds = [];
    let inRange = true;
    let current = start - 1;

    while (inRange) {
        let nextPotentialInvalidId = getNextLargestPotentialInvalidId(current);
        
        if (nextPotentialInvalidId > end) {
            inRange = false;
        } else {
            if (isInvalidProductId(nextPotentialInvalidId)) {
                invalidProductIds.push(nextPotentialInvalidId);
            }
        }

        current = nextPotentialInvalidId;
    }

    return invalidProductIds;
}