import { determineEmptyRowsAndColumnIndicess, updateGalaxyPositionsGivenEmptyRowsAndColumns, calculateManhattanDistance, generateGalaxies } from "./2.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const map: string[] = [];

const execute = () => {
    const {emptyRowIndices, emptyColumnIndices} = determineEmptyRowsAndColumnIndicess(map);
    const galaxies = generateGalaxies(map);
    const updatedGalaxies = updateGalaxyPositionsGivenEmptyRowsAndColumns(galaxies, emptyRowIndices, emptyColumnIndices);
    const shortestPaths: number[] = [];

    updatedGalaxies.forEach((galaxy, index) => {
        const otherGalaxies = updatedGalaxies.filter((g, i) => i > index);

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