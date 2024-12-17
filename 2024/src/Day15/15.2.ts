import { Robot, WarehouseMap } from "./15.2.logic";
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');
const test2 = args.includes('--test2');

const warehouseMap = new WarehouseMap();
const mapLines: string[] = [];
let directions: string[] = [];

const execute = () => {
    warehouseMap.parse(mapLines);
    const robot = warehouseMap.generateRobot(debug);

    console.log(`Robot is at ${robot.tile.coordinate.x}, ${robot.tile.coordinate.y}`);
    console.log(`There are ${directions.length} directions to follow`);

    directions.forEach((direction, index) => {
        robot.move(direction);

        if (debug) {
            console.log(`Step ${index + 1}`);
            warehouseMap.detectAnomalies();
            warehouseMap.print();
        }
    });

    console.log(`Final Status:`);
    warehouseMap.print();

    let sumOfGPSCoordinates = 0;

    warehouseMap.tiles.forEach((row) => {
        row.forEach((tile) => {
            sumOfGPSCoordinates += tile.calculateGPSCoordinate();
        });
    });

    console.log(`Sum of GPS coordinates: ${sumOfGPSCoordinates}`);
}

const parseLine = (line: string) => {
    if (line.indexOf('#') > -1) {
        mapLines.push(line);
    } else {
        directions = directions.concat(line.split(''));
    }
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