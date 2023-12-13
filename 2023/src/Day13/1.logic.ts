export const determineHorizontalLineOfReflection = (pattern: string[]): number => {
    let indexOfLineOfReflection = -1;
    let isPotentialReflection = false;

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