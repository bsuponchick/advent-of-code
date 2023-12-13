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
    const reducedSprings = springs.replace(/\.+/g, '.');
    const goal = arrangements.map((num) => {
        return Array(num).fill('#').join('') + '.';
    }).join('');

    const finalSprings = reducedSprings.replace(/\.+/g, ' ').trim();
    const finalGoal = goal.replace(/\.+/g, ' ').trim();

    return finalSprings === finalGoal;
};

export const parseSprings = (line: string): { springs: string, arrangements: number[] } => {
    const [springs, arrangementsString] = line.split(' ');
    
    return {
        springs,
        arrangements: arrangementsString.split(',').map((arrangement) => parseInt(arrangement, 10))
    };
};