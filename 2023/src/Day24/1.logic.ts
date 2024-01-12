interface Point {
    x: number;
    y: number;
}

export class Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    a: number;
    b: number;
    c: number;

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.a = y2 - y1;
        this.b = x1 - x2;
        this.c = y1 * (x2 - x1) - x1 * (y2 - y1);
    }

    determineIntersection(line: Line): Point | null {
        const det = this.a * line.b - line.a * this.b;
        if (det === 0) {
            return null;
        }

        const x = (this.b * line.c - line.b * this.c) / det;
        const y = (line.a * this.c - this.a * line.c) / det;

        return { x, y };
    }

    determineDistancesToIntersecton(point: Point): { x1: number; x2: number } | null {
        const distance1 = Math.sqrt(Math.pow(point.x - this.x1, 2) + Math.pow(point.y - this.y1, 2));
        const distance2 = Math.sqrt(Math.pow(point.x - this.x2, 2) + Math.pow(point.y - this.y2, 2));

        return { x1: distance1, x2: distance2 };
    }
}