export const determineHorizontalLineOfReflection = (pattern: string[]): number => {
    let indexOfLineOfReflection = -1;
    let isPotentialReflection = false;
    let hasFixedSmudge = false;

    for (let i = 0; i < pattern.length; i++) {
        if (i < pattern.length - 1) {
            if (pattern[i] === pattern[i + 1]) {
                isPotentialReflection = true;
                indexOfLineOfReflection = i;

                // Potential line of reflection, go outward until you hit an edge or don't match
                for (let j = 1; j <= i; j++) {
                    if (i + j + 1 >= pattern.length) {
                        // Reflection confirmed
                        break;
                    } else {
                        // Evaluate for continued reflection
                        if (pattern[i - j] === pattern[i + j + 1]) {
                            continue;
                        } else {
                            const differences = getDifferencesInCharacters(pattern[i - j], pattern[i + j + 1]);

                            if ((hasFixedSmudge === false) && (differences.count === 1)) {
                                // Smudge detected, fix it
                                const indexOfDifference = differences.indicesOfDifferences[0];
                                const newLine = pattern[i - j].substring(0, indexOfDifference) + (pattern[i - j][indexOfDifference] === '.' ? '#' : '.') + pattern[i - j].substring(indexOfDifference + 1);
                                pattern[i - j] = newLine;
                                hasFixedSmudge = true;
                                continue;
                            } else {
                                // No match, so not a reflection
                                indexOfLineOfReflection = -1;
                                isPotentialReflection = false;
                            }
                        }
                    }
                }

                if (isPotentialReflection) {
                    // Reflection confirmed
                    break;
                }
            } else {
                const differences = getDifferencesInCharacters(pattern[i], pattern[i + 1]);

                if ((hasFixedSmudge === false) && (differences.count === 1)) {
                    // Smudge detected, fix it
                    const indexOfDifference = differences.indicesOfDifferences[0];
                    const newLine = pattern[i].substring(0, indexOfDifference) + (pattern[i][indexOfDifference] === '.' ? '#' : '.') + pattern[i].substring(indexOfDifference + 1);
                    pattern[i] = newLine;
                    hasFixedSmudge = true;

                    if (i === 0) {
                        return 1;
                    } else {
                        continue;
                    }
                }
            }
        }
    }

    if (indexOfLineOfReflection === -1) {
        return indexOfLineOfReflection;
    } else {
        return indexOfLineOfReflection + 1;
    }
};

export const getDifferencesInCharacters = (pattern1: string, pattern2: string): { count: number, indicesOfDifferences: number[] } => {
    let differences = 0;
    let indicesOfDifferences: number[] = [];

    for (let i = 0; i < pattern1.length; i++) {
        if (pattern1[i] !== pattern2[i]) {
            differences++;
            indicesOfDifferences.push(i);
        }
    }

    return {count: differences, indicesOfDifferences};
};

export const determineVerticalLineOfReflection = (pattern: string[]): number => {
    const columns = getColumnsAsRows(pattern);
    return determineHorizontalLineOfReflection(columns);
};

export const getColumnsAsRows = (pattern: string[]): string[] => {
    const columns: string[] = [];

    pattern.forEach((row) => {
        row.split('').forEach((char, index) => {
            if (columns[index] === undefined) {
                columns[index] = '';
            }

            columns[index] += char;
        });
    });

    return columns;
};