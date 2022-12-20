const { syncBuiltinESMExports } = require('module');

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

inRange = (value, min, max) => {
    return ((value >= min) && (value <= max));
}

class Sensor {
    constructor (x, y, beaconX, beaconY) {
        this.x = x;
        this.y = y;
        this.closestBeaconX = beaconX;
        this.closestBeaconY = beaconY;
        this.manhattanDistance = calculateManhattanDistance({x, y}, {x: beaconX, y: beaconY});
    }

    overlapsTargetArea = (x, y) => {
        if (inRange(this.x, x, y) && inRange(this.y, x, y)) {
            return true;
        } else { 
            if (this.x < x) {
                if (this.y < x) {
                    //lower left
                    return ((this.x + this.manhattanDistance > x) || (this.y + this.manhattanDistance > x));
                } else {
                    // upper left
                    return ((this.x + this.manhattanDistance > x) || (this.y - this.manhattanDistance < x));
                }
            } else {
                if (this.y < x) {
                    // lower right
                    return ((this.x - this.manhattanDistance < x) || (this.y + this.manhattanDistance > x));
                } else {
                    // upper right
                    return ((this.x - this.manhattanDistance < y) || (this.y - this.manhattanDistance < y));
                }
            }
        }
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

// findPossibleBeacon = () => {
//     let found = false;
//     let counter = 3500000;
//     let locations = {};

//     const addLocationIfNotBeacon = (location) => {
//         locations[location.x] = location;
//     };

//     while (!found && counter <= 4000000) {
//         sensors.forEach((sensor) => {
//             sensor.calculateKnownEmptyLocations(counter, addLocationIfNotBeacon);
//         });

//         if (Object.keys(locations).length < 4000000) {
//             found = true;
//             console.log(`Possible beacon location is in row ${counter}`);
//         } else {
//             console.log(`Row ${counter} is not a possiblity`);
//             delete locations;
//             locations = {};
//             counter++;
            
//             setTimeout(() => {
//                 findPossibleBeacon(counter);
//             });
//         }
//     }
// }

findPossibleRows = () => {
    let minPossible = MAX_VALUE;
    let maxPossible = MIN_VALUE;

    sensors.forEach((sensor) => {
        console.log(`Evaluating sensor at ${sensor.x},${sensor.y} with distance of ${sensor.manhattanDistance}`);

        const widthAtSensor = 2 * sensor.manhattanDistance + 1;
        const leftMostPosition = sensor.x - sensor.manhattanDistance;
        const rightMostPosition = sensor.x + sensor.manhattanDistance;
        
        console.log(`Width at sensor is ${widthAtSensor}`);
        console.log(`Left most position is ${leftMostPosition}`);
        console.log(`Right most position is ${rightMostPosition}`);

        if (widthAtSensor > MAX_VALUE && sensor.overlapsTargetArea()) {             
            if (leftMostPosition < MIN_VALUE && rightMostPosition > MAX_VALUE) {
                console.log(`Row is full`);
                const leftOfZero = 0 - leftMostPosition;
                const rightOfMax = rightMostPosition - MAX_VALUE;

                if (leftOfZero < rightOfMax) {
                    // use leftOfZero
                    let newMinSafeRow = sensor.x - leftOfZero;
                    if ((newMinSafeRow > MIN_VALUE) && (newMinSafeRow < minPossible)) {
                        minPossible = newMinSafeRow;
                    }

                    let newMaxSafeRow = sensor.x + leftOfZero;
                    if ((newMaxSafeRow < MAX_VALUE) && (newMaxSafeRow > maxPossible)) {
                        maxPossible = new newMaxSafeRow;
                    }
                } else {
                    // use rightOfMax
                    let newMinSafeRow = sensor.x - rightOfMax;
                    if ((newMinSafeRow > MIN_VALUE) && (newMinSafeRow < minPossible)) {
                        minPossible = newMinSafeRow;
                    }

                    let newMaxSafeRow = sensor.x + rightOfMax;
                    if ((newMaxSafeRow < MAX_VALUE) && (newMaxSafeRow > maxPossible)) {
                        maxPossible = new newMaxSafeRow;
                    }
                }
            }
        }
    });

    console.log(`min possible is ${minPossible}`);
    console.log(`max possible is ${maxPossible}`);
}

bruteForce = () => {
    let done = false;
    let count = 0;

    for (let row = 0; (done === false) && (row <= MAX_VALUE); row++) {
        console.log(`Checking row ${row}`);
        for (let column = 0; (done === false) && (column <= MAX_VALUE); column++) {
            const results = sensors.map((sensor) => {
                return sensor.overlapsTargetArea(row, column);
            });

            if (results.indexOf(true) < 0) {
                done = true;
                console.log(`Found safe place at ${row},${column}`);
            }
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
    sensors.sort((a, b) => {
        if (a.manhattanDistance > b.manhattanDistance) {
            return -1;
        } else if (a.manhattanDistance < b.manhattanDistance) {
            return 1
        } else {
            return 0;
        }
    });

    // start killing rows based upon largest distance
    bruteForce();
});