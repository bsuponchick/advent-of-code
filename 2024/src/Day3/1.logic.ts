export const findValidInstructions = (instructions: string): string[] => {
    const validInstructions = instructions.match(/(mul\([0-9]{1,3},[0-9]{1,3}\))/g);

    if (validInstructions === null) {
        return [];
    }

    return validInstructions;
}

export const extractNumbers = (instruction: string): number[] => {
    const numbers: number[] = instruction.slice(4).replace(')', '').split(',').map((n) => parseInt(n));
    return numbers;
}