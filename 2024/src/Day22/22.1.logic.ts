export const mix = (value: number, secret: number): number => {
    return value ^ secret;
};

export const prune = (secret: number): number => {
    return secret % 16777216;
};