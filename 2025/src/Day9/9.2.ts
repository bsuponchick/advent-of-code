import { XYCoordinate } from '../utils/interfaces/coordinate';
import { Decider } from './9.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const coordinates: XYCoordinate[] = [];

const execute = () => {
    const decider = new Decider();
    const lineSegments = decider.createLineSegmentsFromVertices(coordinates);

    let maxArea = 0;
    for (let i = 0; i < coordinates.length; i++) {
        for (let j = i + 1; j < coordinates.length; j++) {
            let allGood = true;

            const coordinatesInRectangle = decider.getAllXYCoordinatesInRectangle(coordinates[i], coordinates[j]);
            for (let k = 0; k < coordinatesInRectangle.length; k++) {
                if (!decider.isInterior(coordinatesInRectangle[k], lineSegments)) {
                    allGood = false;
                    break;
                }
            }

            if (allGood) {
                // console.log(`Coordinates ${coordinates[i].x},${coordinates[i].y} and ${coordinates[j].x},${coordinates[j].y} are all good`);
                const area = decider.calculateAreaBetweenCoordinates(coordinates[i], coordinates[j]);
                if (area > maxArea) {
                    console.log(`New max area: ${area}`);
                    maxArea = area;
                }
            } else {
                // console.log(`Coordinates ${coordinates[i].x},${coordinates[i].y} and ${coordinates[j].x},${coordinates[j].y} are not all good`);
            }
        }
    }
    console.log(`The max area is ${maxArea}`);
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