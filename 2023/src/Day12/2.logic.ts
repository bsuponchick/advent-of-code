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
    const goal = arrangements.map((num) => {
        return Array(num).fill('#').join('') + '.';
    }).join('');

    const finalSprings = springs.replace(/\.+/g, ' ').trim();
    const finalGoal = goal.replace(/\.+/g, ' ').trim();

    return finalSprings === finalGoal;
};

export const parseSprings = (line: string): { springs: string, arrangements: number[] } => {
    const [springs, arrangementsString] = line.split(' ');

    // Can reduce the number of characters by ignoring subsequent .'s
    const reducedSprings = springs.replace(/\.+/g, '.');

    const springs5x = `${reducedSprings}?${reducedSprings}?${reducedSprings}?${reducedSprings}?${reducedSprings}`;
    const arrangementsArray = arrangementsString.split(',').map((arrangement) => parseInt(arrangement, 10));
    const arrangements5x = [...arrangementsArray, ...arrangementsArray, ...arrangementsArray, ...arrangementsArray, ...arrangementsArray]
    
    return {
        springs: springs5x,
        arrangements: arrangements5x
    };
};