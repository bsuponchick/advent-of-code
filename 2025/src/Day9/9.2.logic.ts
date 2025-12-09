import { XYCoordinate } from '../utils/interfaces/coordinate';

export interface LineSegment {
    p1: XYCoordinate;
    p2: XYCoordinate;
}

export class Decider {
    cache: Map<string, boolean>;

    constructor() {
        this.cache = new Map<string, boolean>();
    }

    calculateAreaBetweenCoordinates = (a: XYCoordinate, b: XYCoordinate): number => {
        const xDistance = Math.sqrt(Math.pow(a.x - b.x, 2)) + 1;
        const yDistance = Math.sqrt(Math.pow(a.y - b.y, 2)) + 1;

        return xDistance * yDistance;
    };

    isInterior = (coordinate: XYCoordinate, lineSegments: LineSegment[]): boolean => {
        const cacheKey = `${coordinate.x},${coordinate.y}`;

        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        // Use ray casting algorithm to determine if the coordinate is inside the polygon
        let intersections: XYCoordinate[] = [];

        const maxX = 9999999999999;

        // console.log(`Checking coordinate ${coordinate.x},${coordinate.y}`);

        const ray: LineSegment = {
            p1: coordinate,
            p2: {
                x: maxX + 1,
                y: coordinate.y,
            },
        };

        for (let i = 0; i < lineSegments.length; i++) {
            const segment = lineSegments[i];

            // console.log(`Checking if point ${coordinate.x},${coordinate.y} is on segment ${segment.p1.x},${segment.p1.y} to ${segment.p2.x},${segment.p2.y}`);
            if (this.isPointOnSegment(coordinate, segment)) {
                // console.log(`Point on segment detected at ${coordinate.x},${coordinate.y}`);
                this.cache.set(cacheKey, true);
                return true;
            }

            // console.log(`Checking if segment ${segment.p1.x},${segment.p1.y} to ${segment.p2.x},${segment.p2.y} intersects with ray ${ray.p1.x},${ray.p1.y} to ${ray.p1.x + ray.p2.x},${ray.p1.y + ray.p2.y}`);
            const intersection = this.intersects(segment, ray);
            if (intersection !== null) {
                if (intersections.some((i) => i.x === intersection.x && i.y === intersection.y)) {
                    continue;
                } else {
                    intersections.push(intersection);
                    // console.log(`Intersection detected at ${intersection.x},${intersection.y}`);
                }
            }
        }

        // console.log(`Intersections: ${JSON.stringify(intersections)}`);

        this.cache.set(cacheKey, intersections.length % 2 === 1);
        return intersections.length % 2 === 1;
    };

    createLineSegmentsFromVertices = (vertices: XYCoordinate[]): LineSegment[] => {
        const segments = [];

        for (let i = 0; i < vertices.length; i++) {
            const coordinate = vertices[i];

            if (i < vertices.length - 1) {
                segments.push({
                    p1: coordinate,
                    p2: vertices[i + 1],
                });
            } else {
                segments.push({
                    p1: coordinate,
                    p2: vertices[0],
                });
            }
        }

        return segments;
    };

    intersects = (segment: LineSegment, ray: LineSegment): XYCoordinate | null => {
        // console.log(`Checking if segment ${segment.p1.x},${segment.p1.y} to ${segment.p2.x},${segment.p2.y} intersects with ray ${ray.p1.x},${ray.p1.y} to ${ray.p2.x},${ray.p2.y}`);
        const x1 = segment.p1.x,
            y1 = segment.p1.y;
        const x2 = segment.p2.x,
            y2 = segment.p2.y;

        const x3 = ray.p1.x,
            y3 = ray.p1.y;
        const x4 = ray.p1.x + ray.p2.x,
            y4 = ray.p1.y + ray.p2.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den === 0) {
            return null; // Lines are parallel or collinear
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t >= 0 && t <= 1 && u >= 0) {
            return {
                x: x1 + t * (x2 - x1),
                y: y1 + t * (y2 - y1),
            };
        }
        return null;
    };

    isPointOnSegment = (point: XYCoordinate, segment: LineSegment): boolean => {
        // 1. Check for collinearity using the cross product
        // (p.y - a.y) * (b.x - a.x) - (p.x - a.x) * (b.y - a.y) should be approximately 0
        // for floating-point comparisons, use a small epsilon for tolerance
        const crossProduct =
            (point.y - segment.p1.y) * (segment.p2.x - segment.p1.x) -
            (point.x - segment.p1.x) * (segment.p2.y - segment.p1.y);
        if (Math.abs(crossProduct) > 1e-9) {
            // Using a small tolerance for floating-point comparisons
            return false; // Not collinear
        }

        // 2. Check if the point is within the bounding box of the segment
        const minX = Math.min(segment.p1.x, segment.p2.x);
        const maxX = Math.max(segment.p1.x, segment.p2.x);
        const minY = Math.min(segment.p1.y, segment.p2.y);
        const maxY = Math.max(segment.p1.y, segment.p2.y);

        return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
    };

    getAllXYCoordinatesInRectangle = (p1: XYCoordinate, p2: XYCoordinate): XYCoordinate[] => {
        const minX = Math.min(p1.x, p2.x);
        const maxX = Math.max(p1.x, p2.x);
        const minY = Math.min(p1.y, p2.y);
        const maxY = Math.max(p1.y, p2.y);

        const coordinates: XYCoordinate[] = [];
        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                coordinates.push({ x, y });
            }
        }
        return coordinates;
    };
}
