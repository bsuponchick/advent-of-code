export interface LineSegments {
    hypernet: string[];
    supernet: string[];
}

export interface AbaDecision {
    isAba: boolean;
    a: string;
    b: string;
}

export interface BabDecision {
    isBab: boolean;
    a: string;
    b: string;
}

export class AbaDetector {
    public static getAbas(input: string): AbaDecision[] {
        const results = input.matchAll(/(?=([a-z])([a-z])\1)/g);
        const abas: AbaDecision[] = [];

        if (results === null) {
            return [];
        } else {
            for (const result of results) {
                if (result[1] !== result[2]) {
                    abas.push({ isAba: true, a: result[1], b: result[2] });
                }
            };

            return abas;
        }
    }

    public static getBabs(input: string): BabDecision[] {
        const results = input.matchAll(/(?=([a-z])([a-z])\1)/g);
        const babs: BabDecision[] = [];

        if (results === null) {
            return [];
        } else {
            for (const result of results) {
                if (result[1] !== result[2]) {
                    babs.push({ isBab: true, a: result[2], b: result[1] });
                }
            }

            return babs;
        }
    }

    public static parseLine(line: string): LineSegments {
        const lineSegments: LineSegments = {
            hypernet: [],
            supernet: []
        };

        const parts = line.split(']');

        parts.forEach((part) => {
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

    public static isSslSupported(lineSegments: LineSegments): boolean {
        const babDecisions: BabDecision[] = lineSegments.hypernet.map((hypernet) => AbaDetector.getBabs(hypernet)).flat();
        const abaDecisions: AbaDecision[] = lineSegments.supernet.map((supernet) => AbaDetector.getAbas(supernet)).flat();

        // Only return true if there is at least one BAB and one ABA where the a and b characters match
        return babDecisions.some((babDecision) => abaDecisions.some((abaDecision) => babDecision.a === abaDecision.a && babDecision.b === abaDecision.b));
    }
}