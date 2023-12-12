import { expandMap, printMap, calculateManhattanDistance, generateGalaxies } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const map: string[] = [];

const execute = () => {
    const expandedMap = expandMap(map);
    printMap(expandedMap);

    const galaxies = generateGalaxies(expandedMap);
    console.log(`There are ${galaxies.length} galaxies in the map.`);

    const shortestPaths: number[] = [];

    galaxies.forEach((galaxy, index) => {
        const otherGalaxies = galaxies.filter((g, i) => i > index);

        const paths = otherGalaxies.map((otherGalaxy, i) => {
            const distance = calculateManhattanDistance(galaxy, otherGalaxy);
            return distance;
        });

        shortestPaths.push(...paths);
    });

    const sumOfAllShortestPaths = shortestPaths.reduce((sum, path) => sum + path, 0);

    console.log(`The sum of all shortest paths is ${sumOfAllShortestPaths}.`);
}

const parseLine = (line: string) => {
   map.push(line);
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