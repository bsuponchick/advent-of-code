export const add = (a: number, b: number): number => {
    return a + b;
}

export const subtract = (a: number, b: number): number => {
    return a - b;
}

export const calculateDistance = (a: number, b: number): number => {
    return Math.abs(subtract(a, b));
}

export const sortNumerics = (a: number, b: number): number => {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
}