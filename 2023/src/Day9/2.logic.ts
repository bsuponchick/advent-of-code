export const generateNextSequence = (sequence: number[]): number[] | null => {
    const countZeros = sequence.filter(x => x === 0).length;
    if (countZeros === sequence.length) {
        return null;
    } else {
        let nextSequence: number[] = [];
    
        sequence.forEach((num, index, arr) => {
            if (index < sequence.length - 1) {
                nextSequence.push(arr[index + 1] - num);
            }
        });

        return nextSequence;
    }
};

export const determineNextValue = (sequence: number[], value: number): number => {
    return sequence[0] - value;
};

export const extrapolateNextValue = (sequence: number[]): number => {
    const sequences: number[][] = [sequence];
    
    let nextSequence = generateNextSequence(sequence);

    while (nextSequence !== null) {
        sequences.push(nextSequence);
        nextSequence = generateNextSequence(nextSequence);
    }
    
    sequences.reverse().forEach((sequence, index) => {
        const nextValue = determineNextValue(sequence, index === 0 ? 0 : sequences[index - 1][0]);
        sequence.unshift(nextValue);
    });

    return sequences[sequences.length - 1][0];
};