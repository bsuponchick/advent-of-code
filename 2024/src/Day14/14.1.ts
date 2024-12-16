import { Robot } from './14.1.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const robots: Robot[] = [];
const quadrantCounts: number[] = [0, 0, 0, 0];

const execute = () => {
    const mapBoundary = test ? { x: 11, y: 7 } : { x: 101, y: 103 };

    robots.forEach((robot) => {
        robot.moveXTimes(mapBoundary, 100);
        const coordinateAfter100Seconds = robot.determinePositionAtTime(100);
        const quadrant = robot.determineQuadrantFromCoordinate(coordinateAfter100Seconds, mapBoundary);

        if (debug) {
            console.log(`Robot ${robot.id} is at ${coordinateAfter100Seconds.x},${coordinateAfter100Seconds.y} after 100 seconds, is in quadrant ${quadrant}`);
        }

        quadrantCounts[quadrant - 1] += 1;
    });

    if (debug) {
        console.log(`Quadrant 1: ${quadrantCounts[0]}`);
        console.log(`Quadrant 2: ${quadrantCounts[1]}`);
        console.log(`Quadrant 3: ${quadrantCounts[2]}`);
        console.log(`Quadrant 4: ${quadrantCounts[3]}`);
    }

    const productOfQuadrantCounts = quadrantCounts.reduce((acc, count) => acc * count, 1);

    console.log(`The safety factor after 100 seconds is ${productOfQuadrantCounts}`);
}

const parseLine = (line: string) => {
    const [position, velocity] = line.split(' ');
    const [xPos, yPos] = position.slice(2).split(',').map((s) => Number.parseInt(s, 10));
    const [xVel, yVel] = velocity.slice(2).split(',').map((s) => Number.parseInt(s, 10));

    robots.push(new Robot({ x: xPos, y: yPos }, { x: xVel, y: yVel }));
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};