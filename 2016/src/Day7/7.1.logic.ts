export interface LineSegments {
    hypernet: string[];
    supernet: string[];
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
            supernet: []
        };

        const parts = line.split(']');

        parts.forEach((part, index) => {
            if (part.includes('[')) {
                const innerParts = part.split('[');
                lineSegments.supernet.push(innerParts[0]);
                lineSegments.hypernet.push(innerParts[1]);
            } else {
                lineSegments.supernet.push(part.trim());
            }
        });

        return lineSegments;
    }

    public static isTlsSupported(lineSegments: LineSegments): boolean {
        return !lineSegments.hypernet.some((hypernet) => AbbaDetector.isAbba(hypernet)) &&
            lineSegments.supernet.some((supernet) => AbbaDetector.isAbba(supernet));
    }
}