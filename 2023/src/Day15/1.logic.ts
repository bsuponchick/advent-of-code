export const determineAscii = (input: string) => {
    return input.charCodeAt(0);
};

export const executeHashAlgorithm = (input: string) => {
    let currentValue = 0;

    input.split('').forEach((char) => {
        currentValue += determineAscii(char);
        currentValue *= 17;
        currentValue %= 256;
    });

    return currentValue;
};

