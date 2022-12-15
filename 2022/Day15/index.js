const calculateManhattanDistance = (left, right) => {
    const result = Math.abs(left.x - right.x) + Math.abs(left.y - right.y)
    return result;
}

class Location {
    constructor (x, y, isBeacon) {
        this.x = x;
        this.y = y;
        this.isBeacon = isBeacon;
    }
}

class Sensor {
    constructor (x, y, beaconX, beaconY) {
        this.x = x;
        this.y = y;
        this.closestBeaconX = beaconX;
        this.closestBeaconY = beaconY;
        this.manhattanDistance = calculateManhattanDistance({x, y}, {x: beaconX, y: beaconY});
    }

    calculateKnownEmptyLocations = (targetY) => {
        if (calculateManhattanDistance({x: this.x, y: this.y}, {x: this.x, y: targetY}) <= this.manhattanDistance) {
            console.log(`Point ${this.x},${this.y} is within Manhattan Distance ${this.manhattanDistance} of target ${this.x},${targetY}`);

            if (this.y === targetY) {
                // Only need to do this row
                console.log(`Just this row...its on the target Y: ${targetY}`);
                addLocationIfNotBeacon(new Location(this.x, this.y, false));
                
                for (let i = 0; i <= this.manhattanDistance; i++) {
                    addLocationIfNotBeacon(new Location(this.x + i, this.y, (this.x + i === this.closestBeaconX) && (this.y === this.closestBeaconY)));
                    addLocationIfNotBeacon(new Location(this.x - i, this.y, (this.x + i === this.closestBeaconX) && (this.y === this.closestBeaconY)));
                }
            } else {
                // Only need to go up
                console.log(`${this.y} is less than ${targetY}, only filling upwards`);
                const distanceToTarget = calculateManhattanDistance({x: this.x, y: this.y}, {x: this.x, y: targetY});
                const widthAtDistance = Math.abs((2 * this.manhattanDistance + 1) - (2 * distanceToTarget));
                console.log(`Should be width ${widthAtDistance} possible locations`);
                
                let count = 1;
                let column = 1;
                addLocationIfNotBeacon(new Location(this.x, targetY, (this.x === this.closestBeaconX) && (targetY === this.closestBeaconY)));
                while (count < widthAtDistance) {
                    addLocationIfNotBeacon(new Location(this.x + column, targetY, (this.x + column === this.closestBeaconX) && (targetY === this.closestBeaconY)));
                    addLocationIfNotBeacon(new Location(this.x - column, targetY, (this.x - column === this.closestBeaconX) && (targetY === this.closestBeaconY)));

                    count += 2;
                    column++;
                }
            }
        }
    }
}

const locations = {};

addLocationIfNotBeacon = (location) => {
    if (location.isBeacon === false) {
        locations[location.x] = location;
    }
};

const TARGET_Y = 2000000;
// const TARGET_Y = 10;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    const parts = line.split(': ');
    const leftPart = parts[0].substring(10);
    const rightPart = parts[1].substring(21);

    const leftPartCoords = leftPart.split(', ');
    const rightPartCoords = rightPart.split(', ');

    const sensorX = Number.parseInt(leftPartCoords[0].substring(2), 10);
    const sensorY = Number.parseInt(leftPartCoords[1].substring(2), 10);

    const beaconX = Number.parseInt(rightPartCoords[0].substring(2), 10);
    const beaconY = Number.parseInt(rightPartCoords[1].substring(2), 10);

    
    const sensor = new Sensor(sensorX, sensorY, beaconX, beaconY);
    sensor.calculateKnownEmptyLocations(TARGET_Y);
}).on('close', () => {
    console.log(`There are ${Object.keys(locations).length} positions at row ${TARGET_Y} which cannot be a beacon`);
});