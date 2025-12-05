export interface LineSegments {
    hypernet: string[];
    regular: string[];
}

export class AbbaDetector {
    public static isAbba(input: string): boolean {
        const results = input.match(/([a-z])([a-z])\2\1/g);

        if (results === null) {
            return false;
        }

        return results.some((result) => result[0] !== result[1]);
    }

    public static parseLine(line: string): LineSegments {
        const lineSegments: LineSegments = {
            hypernet: [],
            regular: []
        };

        const parts = line.split(']');

        parts.forEach((part, index) => {
            if (part.includes('[')) {
                const innerParts = part.split('[');
                lineSegments.regular.push(innerParts[0]);
                lineSegments.hypernet.push(innerParts[1]);
            } else {
                lineSegments.regular.push(part.trim());
            }
        });

        return lineSegments;
    }

    public static isTlsSupported(lineSegments: LineSegments): boolean {
        return !lineSegments.hypernet.some((hypernet) => AbbaDetector.isAbba(hypernet)) &&
            lineSegments.regular.some((regular) => AbbaDetector.isAbba(regular));
    }
}