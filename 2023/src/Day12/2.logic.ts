export const determinePossibleValidArrangements = (line: string): number => {
    const { springs, arrangements } = parseSprings(line);
    const goal = generateGoalString(arrangements);

    const possibleConfigurations = determinePossibleConfigurations(springs, goal);
    return possibleConfigurations.length;
}

export const determinePossibleConfigurations = (inputString: string, goal: string): string[] => {
    const permutations: string[] = [];
    const chars = ['.', '#'];

    const stack: Array<{ currentString: string; index: number }> = [];
    stack.push({ currentString: '', index: 0 });

    while (stack.length > 0) {
        const { currentString, index } = stack.pop()!;

        if ((index === inputString.length) && determineValidity(currentString, goal)) {
            permutations.push(currentString);
        } else {
            if (inputString[index] === '?') {
                for (const char of chars) {
                    const nextString = currentString + char;
                    if (isPotentiallyValid(nextString, goal)) {
                        stack.push({ currentString: currentString + char, index: index + 1 });
                    }
                }
            } else {
                if (isPotentiallyValid(currentString + inputString[index], goal)) {
                    stack.push({ currentString: currentString + inputString[index], index: index + 1 });
                }
            }
        }
    }

    return permutations;
};

export const isPotentiallyValid = (permutation: string, goal: string): boolean => {
    const current = permutation.replace(/\.+/g, ' ').trim();
    return goal.indexOf(current) === 0;
};

export const determineValidity = (springs: string, goal: string): boolean => {
    const finalSprings = springs.replace(/\.+/g, ' ').trim();
    return finalSprings === goal;
};

export const generateGoalString = (arrangements: number[]): string => {
    return arrangements.map((num) => {
        return Array(num).fill('#').join('') + ' ';
    }).join('').trim();
};

export const parseSprings = (line: string): { springs: string, arrangements: number[] } => {
    const [springs, arrangementsString] = line.split(' ');

    const springs5x = `${springs}?${springs}?${springs}?${springs}?${springs}`;

    // Can reduce the number of characters by ignoring subsequent .'s
    const reducedSprings = springs5x.replace(/\.+/g, '.');

    const arrangementsArray = arrangementsString.split(',').map((arrangement) => parseInt(arrangement, 10));
    const arrangements5x = [...arrangementsArray, ...arrangementsArray, ...arrangementsArray, ...arrangementsArray, ...arrangementsArray]
    
    return {
        springs: reducedSprings,
        arrangements: arrangements5x
    };
};