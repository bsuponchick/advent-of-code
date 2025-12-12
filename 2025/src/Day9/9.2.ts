import { XYCoordinate } from '../utils/interfaces/coordinate';
import { Decider } from './9.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

interface XYCoordinatePair {
    p1: XYCoordinate;
    p2: XYCoordinate;
}

const coordinates: XYCoordinate[] = [];
const potentiallyValidPairs: Map<number, XYCoordinatePair[]> = new Map();

const execute = () => {
    const decider = new Decider();
    const lineSegments = decider.createLineSegmentsFromVertices(coordinates);
    
    // Determine which of the potentialy valid pairs have all 4 corners valid, this will greatly reduce the number of pairs to evaluate
    for (let i = 0; i < coordinates.length; i++) {
        for (let j = i + 1; j < coordinates.length; j++) {
            let allGood = true;

            const cornersOfRectangle = decider.getCornersOfRectangle(coordinates[i], coordinates[j]);
            for (let k = 0; k < cornersOfRectangle.length; k++) {
                if (!decider.isInterior(cornersOfRectangle[k], lineSegments)) {
                    allGood = false;
                    break;
                }
            }

            if (allGood) {
                const area = decider.calculateAreaBetweenCoordinates(coordinates[i], coordinates[j]);

                if (potentiallyValidPairs.has(area)) {
                    const currentPairs = potentiallyValidPairs.get(area);
                    potentiallyValidPairs.set(area, [...currentPairs, { p1: coordinates[i], p2: coordinates[j]}]);
                } else {
                    potentiallyValidPairs.set(area, [{ p1: coordinates[i], p2: coordinates[j] }]);
                }
            } else {
                // console.log(`Coordinates ${coordinates[i].x},${coordinates[i].y} and ${coordinates[j].x},${coordinates[j].y} are not all good`);
            }
        }
    }
    
    // console.log(`The potentially valid pairs are ${JSON.stringify(potentiallyValidPairs)}`);
    // Now we need to evaluate the largest pairs first, this will greatly reduce the number of pairs to evaluate
    const areasToEvaluate = Array.from(potentiallyValidPairs.keys()).sort((a, b) => b - a);

    for (const area of areasToEvaluate) {
        const pairs = potentiallyValidPairs.get(area) || [];

        // Now that we've whittled it down to the largest possible pairs where each corner is valid, we need to check these more thoroughly
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];
            const coordinatesInRectangle = decider.getBorderCoordinatesInRectangle(pair.p1, pair.p2);
            console.log(`Evaluating ${pair.p1.x},${pair.p1.y} and ${pair.p2.x},${pair.p2.y} with potential area is currently ${area}...`);
            let allGood = true;

            for (let j = 0; j < coordinatesInRectangle.length; j++) {
                if (!decider.isInterior(coordinatesInRectangle[j], lineSegments)) {
                    allGood = false;
                    break;
                }
            }

            if (allGood) {
                console.log(`The max area is ${area}`);
                return;
            }
        }
    }
}

const parseLine = (line: string) => {
    const [x, y] = line.split(',').map(Number);
    coordinates.push({ x, y });
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