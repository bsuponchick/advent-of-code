export const calculateGCD = (numbers: number[]): number => {
    return numbers.reduce((a, b) => {
        if (b === 0) {
            return a;
        } else {
            return calculateGCD([b, a % b]);
        }
    });
};