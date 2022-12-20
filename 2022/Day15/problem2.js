const calculateManhattanDistance = (left, right) => {
    const result = Math.abs(left.x - right.x) + Math.abs(left.y - right.y)
    return result;
}

const MIN_VALUE = 0;
const MAX_VALUE = 4000000;

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

    calculateKnownEmptyLocations = (targetY, addLocationIfNotBeacon) => {
        if (calculateManhattanDistance({x: this.x, y: this.y}, {x: this.x, y: targetY}) <= this.manhattanDistance) {
            //console.log(`Point ${this.x},${this.y} is within Manhattan Distance ${this.manhattanDistance} of target ${this.x},${targetY}`);

            if (this.y === targetY) {
                // Only need to do this row
                //console.log(`Just this row...its on the target Y: ${targetY}`);

                if ((this.x >= MIN_VALUE) && (this.x <= MAX_VALUE)) {
                    addLocationIfNotBeacon(new Location(this.x, this.y, false));
                }
                
                for (let i = 0; i <= this.manhattanDistance; i++) {
                    if ((x + i >= MIN_VALUE) && (x + i <= MAX_VALUE)) {
                        addLocationIfNotBeacon(new Location(this.x + i, this.y, (this.x + i === this.closestBeaconX) && (this.y === this.closestBeaconY)));
                    }

                    if ((x - i >= MIN_VALUE) && (x - i <= MAX_VALUE)) {
                        addLocationIfNotBeacon(new Location(this.x - i, this.y, (this.x + i === this.closestBeaconX) && (this.y === this.closestBeaconY)));
                    }
                }
            } else {
                // Only need to go up
                //console.log(`${this.y} is less than ${targetY}, only filling upwards`);
                const distanceToTarget = calculateManhattanDistance({x: this.x, y: this.y}, {x: this.x, y: targetY});
                const widthAtDistance = Math.abs((2 * this.manhattanDistance + 1) - (2 * distanceToTarget));
                //console.log(`Should be width ${widthAtDistance} possible locations`);
                
                let count = 1;
                let column = 1;

                if ((this.x >= MIN_VALUE && this.x <= MAX_VALUE)) {
                    addLocationIfNotBeacon(new Location(this.x, targetY, (this.x === this.closestBeaconX) && (targetY === this.closestBeaconY)));
                }

                while (count < widthAtDistance) {
                    if ((this.x + column >= MIN_VALUE) && (this.x + column <= MAX_VALUE)) {
                        addLocationIfNotBeacon(new Location(this.x + column, targetY, (this.x + column === this.closestBeaconX) && (targetY === this.closestBeaconY)));
                    }
                    
                    if ((this.x - column >= MIN_VALUE) && (this.x - column <= MAX_VALUE)) {
                        addLocationIfNotBeacon(new Location(this.x - column, targetY, (this.x - column === this.closestBeaconX) && (targetY === this.closestBeaconY)));
                    }

                    count += 2;
                    column++;
                }
            }
        }
    }
}

findPossibleBeacon = () => {
    let found = false;
    let counter = 0;
    let locations = {};

    const addLocationIfNotBeacon = (location) => {
        locations[location.x] = location;
    };

    while (!found && counter <= 4000000) {
        sensors.forEach((sensor) => {
            sensor.calculateKnownEmptyLocations(counter, addLocationIfNotBeacon);
        });

        if (Object.keys(locations).length < 4000000) {
            found = true;
            console.log(`Possible beacon location is in row ${counter}`);
        } else {
            console.log(`Row ${counter} is not a possiblity`);
            delete locations;
            locations = {};
            counter++;
            
            setTimeout(() => {
                findPossibleBeacon(counter);
            });
        }
    }
}

// const TARGET_Y = 2000000;
// const TARGET_Y = 10;
const sensors = [];

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

    
    sensors.push(new Sensor(sensorX, sensorY, beaconX, beaconY));
}).on('close', () => {
    findPossibleBeacon();
});