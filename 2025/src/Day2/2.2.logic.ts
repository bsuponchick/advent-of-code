export const hasOnlyOneRepeatedDigit = (counts: number[]): boolean => {
    const countDigitsAtLeastOne = counts.filter((count) => count >= 1).length;
    const countDigitsRepeatedMoreThanOnce = counts.filter((count) => count > 1).length;

    if (countDigitsAtLeastOne === 1 && countDigitsRepeatedMoreThanOnce === 1) {
        return true;
    }
    return false;
}

export const noCountsAreGreaterThanOne = (counts: number[]): boolean => {
    return counts.every((count) => count <= 1);
}

export const getLowestNonZeroCount = (counts: number[]): number => {
    const nonZeroCounts = counts.filter((count) => count > 0);

    if (nonZeroCounts.length === 0) {
        throw new Error('No non-zero counts found');
    }

    return nonZeroCounts.reduce((min, count) => count < min ? count : min, nonZeroCounts[0]);
}

export const splitIntoEqualPartsOfLength = (productId: number, length: number): string[] => {
    const parts = [];
    const digits = productId.toString().split('');

    if (digits.length % length !== 0) {
        throw new Error('Product ID length is not divisible by the part length');
    }

    for (let i = 0; i < digits.length; i += length) {
        parts.push(digits.slice(i, i + length).join(''));
    }
    return parts;
}

export const isInvalidProductId = (productId: number): boolean => {
    const digits = productId.toString().split('');
    const counts = getCountsOfDigitsInProductId(productId);

    if (hasOnlyOneRepeatedDigit(counts)) {
        return true;
    } else if (noCountsAreGreaterThanOne(counts)) {
        return false;
    } else {
        // In this case, the only invalid products are ones where all digits repeat n times
        // console.log(`Product ID: ${productId}`);
        const lowestCount = getLowestNonZeroCount(counts);
        // console.log(`Lowest count: ${lowestCount}`);

        if (lowestCount === 1) {
            return false;
        }

        // the lowest repeated count tells us how many equal parts to split the product id into
        const partLength = digits.length / lowestCount;
        if (partLength % 1 !== 0) {
            return false;
        }
        // console.log(`Part length: ${partLength}`);
        
        const parts = splitIntoEqualPartsOfLength(productId, partLength);

        // console.log(`Parts: ${parts}`);
        const sum = parts.reduce((sum, part) => sum + Number(part), 0);
        // console.log(`Sum: ${sum}`);

        return sum / parts.length === Number(parts[0]);
    }
}

export const getCountsOfDigitsInProductId = (productId: number): number[] => {
    const digits = productId.toString().split('');

    const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    digits.forEach((digit) => {
        counts[Number(digit)]++;
    });

    return counts;
}

export const getInvalidProductIdsFromRange = (range: string): number[] => {
    const [start, end] = range.split('-');
    const invalidProductIds = [];

    for (let i = Number(start); i <= Number(end); i++) {
        try {
            if (isInvalidProductId(i)) {
                console.log(`Invalid product id: ${i}`);
                invalidProductIds.push(i);
            }
        } catch (error) {
            // do nothing and move on to the next product id
            continue;
        }
        
    }
    return invalidProductIds;
}