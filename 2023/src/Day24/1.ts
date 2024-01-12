import { Line } from './1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const lines: Line[] = [];
const TARGET_AREA_MIN = 200000000000000;
const TARGET_AREA_MAX = 400000000000000;

// const TARGET_AREA_MIN = 7;
// const TARGET_AREA_MAX = 27;

const execute = () => {
    let intersections: { x: number; y: number }[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let j = i + 1; j < lines.length; j++) {
            const line2 = lines[j];
            const intersection = line.determineIntersection(line2);

            if (intersection !== null) {
                if (debug) {
                    console.log(`Hailstone ${i} and ${j} intersect at ${intersection.x},${intersection.y}`);
                }

                // Need to determine if the intersection is in the past or future
                const distancesToIntersection1 = line.determineDistancesToIntersecton(intersection);
                const distancesToIntersection2 = line2.determineDistancesToIntersecton(intersection);

                if ((distancesToIntersection1.x1 > distancesToIntersection1.x2) && (distancesToIntersection2.x1 > distancesToIntersection2.x2)) {
                    // This is a valid intersection
                    intersections.push(intersection);
                } else {
                    if (debug) {
                        console.log(`Hailstone ${i} and ${j} intersect in the past`);
                    }
                }
            } else {
                if (debug) {
                    console.log(`Hailstone ${i} and ${j} do not intersect`);
                }
            }
        }
    }

    intersections = intersections.filter((intersection, index) => {
        for (let i = 0; i < index; i++) {
            const intersection2 = intersections[i];
            if (
                intersection.x === intersection2.x &&
                intersection.y === intersection2.y
            ) {
                return false;
            }
        }

        return true;
    });

    console.log(`There are a total of ${intersections.length} unique intersections.`);

    let countIntersectionsInTargetArea = 0;

    intersections.forEach((intersection) => {
        if (
            intersection.x >= TARGET_AREA_MIN &&
            intersection.x <= TARGET_AREA_MAX &&
            intersection.y >= TARGET_AREA_MIN &&
            intersection.y <= TARGET_AREA_MAX
        ) {
            countIntersectionsInTargetArea++;
        }
    });

    console.log(`Part 1: ${countIntersectionsInTargetArea}`);
};

const parseLine = (line: string) => {
    let parts = line.split(' @ ');
    let [x, y, z] = parts[0].split(',').map((part) => parseInt(part, 10));
    let [vx, vy, vz] = parts[1].split(',').map((part) => parseInt(part, 10));

    lines.push(new Line(x, y, x + vx, y + vy));
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : './input.txt'),
});

lineReader
    .on('line', (line) => {
        parseLine(line);
    })
    .on('close', () => {
        execute();
    });

export {};
