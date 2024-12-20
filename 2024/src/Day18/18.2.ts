import { Coordinate } from '../utils/interfaces/coordinate';
import { MemorySpace } from './18.1.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');
const test2 = args.includes('--test2');

const fallingByteCoordinates: Coordinate[] = [];

const execute = () => {
    let previous = 0;
    let max = fallingByteCoordinates.length;
    let current = Math.floor((previous + max) / 2);

    const size = test ? 6 : 70;

    const memorySpace = new MemorySpace(size);

    while (current !== previous) {
        let currentFallingBytes = fallingByteCoordinates.slice(0, current);

        memorySpace.reset();

        currentFallingBytes.forEach((coordinate, index) => {
            memorySpace.corruptNode(coordinate);
        });

        const startNode = memorySpace.generateNodeIdFromCoordinate({ x: 0, y: 0 });
        const endNode = memorySpace.generateNodeIdFromCoordinate({ x: size, y: size });

        try {
            const shortestPath = memorySpace.getShortestPath(startNode, endNode).distance;

            if (debug) {
                console.log(`Path found...`);
                memorySpace.print();
            }
            // There is a shortest path, need to add to the number of falling bytes, keep the last currentMax, and try again
            previous = current;
            current = Math.floor((previous + max) / 2);
        } catch (error) {
            // There is no path, need to reduce currentMax by half the distance to the next index and try again
            max = current;
            current = Math.floor((previous + max) / 2);

            if (debug) {
                console.log(`No path found...`);
                memorySpace.print();
            }
        }
    }

    console.log(`The final block is ${previous}`);
    console.log(`The coordinate there is ${fallingByteCoordinates[previous].x},${fallingByteCoordinates[previous].y}`);
}

const parseLine = (line: string) => {
    const parts = line.split(',');
    fallingByteCoordinates.push({ x: parseInt(parts[0]), y: parseInt(parts[1]) });
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : test2 ? './test2.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};