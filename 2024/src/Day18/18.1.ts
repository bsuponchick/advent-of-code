import { Coordinate } from '../utils/interfaces/coordinate';
import { MemorySpace } from './18.1.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');
const test2 = args.includes('--test2');

const fallingByteCoordinates: Coordinate[] = [];

const execute = () => {
    const size = test ? 6 : 70;
    const maxFallingBytes = test ? 12 : 1024;

    const memorySpace = new MemorySpace(size);
    memorySpace.initialize();

    fallingByteCoordinates.forEach((coordinate, index) => {
        if (index < maxFallingBytes) {
            memorySpace.corruptNode(coordinate);

            if (debug) {
                console.log(`Falling byte ${index + 1} at ${coordinate.x},${coordinate.y}`);
            }
        }
    });

    const startNode = memorySpace.generateNodeIdFromCoordinate({ x: 0, y: 0 });
    const endNode = memorySpace.generateNodeIdFromCoordinate({ x: size, y: size });

    const shortestPath = memorySpace.getShortestPath(startNode, endNode);

    if (debug) {
        console.log(`Shortest path: ${shortestPath.distance}`);
        memorySpace.print();
    }
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