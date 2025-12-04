export const isPossiblyValid = (triangle: string): boolean => {
    const sides = triangle.trim().split(/\s+/).map(Number);
    return (sides[0] + sides[1] > sides[2]) && (sides[1] + sides[2] > sides[0]) && (sides[2] + sides[0] > sides[1]);
}

export const identifyTriangles = (triangles: string[]): string[] => {
    const parsedValues: string[][] = [];
    const possibleTriangles: string[] = [];

    triangles.forEach((triangle) => {
        const sides = triangle.trim().split(/\s+/);
        parsedValues.push(sides);
    });

    for (let i = 0; i < parsedValues.length; i+=3) {
        const triangle1 = `${parsedValues[i][0]} ${parsedValues[i+1][0]} ${parsedValues[i+2][0]}`;
        const triangle2 = `${parsedValues[i][1]} ${parsedValues[i+1][1]} ${parsedValues[i+2][1]}`;
        const triangle3 = `${parsedValues[i][2]} ${parsedValues[i+1][2]} ${parsedValues[i+2][2]}`;
        possibleTriangles.push(triangle1, triangle2, triangle3);
    }

    return possibleTriangles;
}