export const determineHorizontalLineOfReflection = (pattern: string[]): number => {
    let indexOfLineOfReflection = -1;
    let isPotentialReflection = false;

    for (let i = 0; i < pattern.length; i++) {
        if (i < pattern.length - 1) {
            if (pattern[i] === pattern[i + 1]) {
                isPotentialReflection = true;
                indexOfLineOfReflection = i;

                if (i === 0) {
                    // The first two lines match, reflection confirmed
                    //console.log(`First two lines match.`);
                    break;
                }

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
                            // No match, so not a reflection
                            indexOfLineOfReflection = -1;
                            isPotentialReflection = false;
                        }
                    }
                }

                if (isPotentialReflection) {
                    // Reflection confirmed
                    break;
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

export const determineHorizontalLineOfReflectionIfSmudgeExists = (pattern: string[]): number => {
    let horizontalLineOfReflection = determineHorizontalLineOfReflection(pattern);
    let result = horizontalLineOfReflection;

    pattern.forEach((line, index) => {
        line.split('').forEach((char, charIndex) => {
            const newPattern = [...pattern];
            newPattern[index] = line.substring(0, charIndex) + (char === '.' ? '#' : '.') + line.substring(charIndex + 1);

            // console.log(`Trying new pattern:\n${newPattern.join('\n')}`);
            const newHorizontalLineOfReflection = determineHorizontalLineOfReflection(newPattern);
            // console.log(`New horizontal line of reflection: ${newHorizontalLineOfReflection}`);
            if ((newHorizontalLineOfReflection !== -1) && (newHorizontalLineOfReflection !== horizontalLineOfReflection)) {
                result = newHorizontalLineOfReflection;
            }
        });
    });

    return result;
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

export const determineVerticalLineOfReflectionIfSmudgeExists = (pattern: string[]): number => {
    const columns = getColumnsAsRows(pattern);

    let horizontalLineOfReflection = determineHorizontalLineOfReflection(columns);
    let result = horizontalLineOfReflection;

    columns.forEach((line, index) => {
        line.split('').forEach((char, charIndex) => {
            const newPattern = [...columns];
            newPattern[index] = line.substring(0, charIndex) + (char === '.' ? '#' : '.') + line.substring(charIndex + 1);

            // console.log(`Trying new pattern:\n${newPattern.join('\n')}`);
            const newHorizontalLineOfReflection = determineHorizontalLineOfReflection(newPattern);
            // console.log(`New horizontal line of reflection: ${newHorizontalLineOfReflection}`);
            if ((newHorizontalLineOfReflection !== -1) && (newHorizontalLineOfReflection !== horizontalLineOfReflection)) {
                result = newHorizontalLineOfReflection;
            }
        });
    });

    return result;
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