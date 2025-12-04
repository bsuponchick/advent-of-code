import { calculateGCD } from './gcd';

export const calculateLCM = (numbers: number[]): number => {
    const lcm = (x, y) => (x * y) / calculateGCD([x, y]);
    return numbers.reduce((a, b) => lcm(a, b));
};