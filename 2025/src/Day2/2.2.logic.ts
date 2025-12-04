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

export const allPartsAreEqual = (parts: string[]): boolean => {
    return parts.every((part) => part === parts[0]);
}

export const isInvalidProductId = (productId: number): boolean => {
    const digits = productId.toString().split('');

    for (let i = 1; i <= digits.length / 2; i++) {
        try {
            const parts = splitIntoEqualPartsOfLength(productId, i);
            if (allPartsAreEqual(parts)) {
                return true;
            }
        } catch (error) {
            // do nothing and move on to the next part length
            continue;
        }
    }

    return false;
}

export const getInvalidProductIdsFromRange = (range: string): number[] => {
    const [start, end] = range.split('-');
    const invalidProductIds = [];

    for (let i = Number(start); i <= Number(end); i++) {
        try {
            if (isInvalidProductId(i)) {
                // console.log(`Invalid product id: ${i}`);
                invalidProductIds.push(i);
            }
        } catch (error) {
            // do nothing and move on to the next product id
            continue;
        }
        
    }
    return invalidProductIds;
}