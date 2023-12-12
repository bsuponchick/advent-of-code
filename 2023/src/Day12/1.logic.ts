export const determinePossibleValidArrangements = (line: string): number => {
    const { springs, arrangements } = parseSprings(line);

    const possibleConfigurations = determinePossibleConfigurations(springs);
    const validConfigurations = possibleConfigurations.filter((configuration) => determineValidity(configuration, arrangements));

    return validConfigurations.length;
}

export const determinePossibleConfigurations = (inputString: string): string[] => {
    const permutations: string[] = [];
    const chars = ['.', '#'];

    const stack: Array<{ currentString: string; index: number }> = [];
    stack.push({ currentString: '', index: 0 });

    while (stack.length > 0) {
        const { currentString, index } = stack.pop()!;

        if (index === inputString.length) {
            permutations.push(currentString);
        } else {
            if (inputString[index] === '?') {
                for (const char of chars) {
                    stack.push({ currentString: currentString + char, index: index + 1 });
                }
            } else {
                stack.push({ currentString: currentString + inputString[index], index: index + 1 });
            }
        }
    }

    return permutations;
};

export const determineValidity = (springs: string, arrangements: number[]): boolean => {
    let potentiallyValid = false;

    if (arrangements.length > 0) {
        const firstArrangement = arrangements[0];
        let countContiguousHashes = 0;
        let nextSubstring = '';

        for (let i = 0; i < springs.length; i++) {
            if (springs[i] === '#') {
                countContiguousHashes++;
            } else if (countContiguousHashes > 0) {
                potentiallyValid = false;
                break;
            }

            if (countContiguousHashes === firstArrangement) {
                if (i + 1 === springs.length) {
                    potentiallyValid = arrangements.length === 1;
                    break;
                } else if ((i + 1 < springs.length) && (springs[i + 1] === '.')) {
                    if (arrangements.length > 1) {
                        nextSubstring = springs.slice(i + 1);
                        potentiallyValid = determineValidity(nextSubstring, arrangements.slice(1));
                        break;
                    } else {
                        potentiallyValid = springs.slice(i + 1).indexOf('#') === -1;
                        break;
                    }    
                } else {
                    potentiallyValid = false;
                    break;
                }
            }
        };
    }

    return potentiallyValid;
};

export const parseSprings = (line: string): { springs: string, arrangements: number[] } => {
    const [springs, arrangementsString] = line.split(' ');
    return {
        springs,
        arrangements: arrangementsString.split(',').map((arrangement) => parseInt(arrangement, 10))
    };
};