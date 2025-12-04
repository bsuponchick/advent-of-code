export const isPossiblyValid = (triangle: string): boolean => {
    const sides = triangle.trim().split(/\s+/).map(Number);
    return (sides[0] + sides[1] > sides[2]) && (sides[1] + sides[2] > sides[0]) && (sides[2] + sides[0] > sides[1]);
}