const DEBUG = {
    ALL: 3,
    TRACE: 2,
    INFO: 1,
    NONE: 0
};

let debug = DEBUG.NONE;

let nextLineIsInstructions = false;
let instructions;

const map = [];

class Navigator {
    constructor (params) {
        this.x = params.x;
        this.y = params.y;
        this.facing = params.facing;
    }

    print = () => {
        console.log(`>>>>>>> Navigator <<<<<<<<<`);
        console.log(`X: ${this.x}`);
        console.log(`Y: ${this.y}`);
        console.log(`Facing: ${this.facing}`);
    }

    rotate = (direction) => {
        if (debug > DEBUG.INFO) {
            console.log(`Rotating ${direction} from facing ${this.facing}`);
        }

        if (direction === 'R') {
            // Clockwise
            switch (this.facing) {
                case 'north':
                    this.facing = 'east';
                    break;
                case 'east':
                    this.facing = 'south';
                    break;
                case 'south':
                    this.facing = 'west';
                    break;
                case 'west':
                    this.facing = 'north';
                    break;
                default:
                    break;
            }
        } else if (direction === 'L') {
            // Counter clockwise
            switch (this.facing) {
                case 'north':
                    this.facing = 'west';
                    break;
                case 'east':
                    this.facing = 'north';
                    break;
                case 'south':
                    this.facing = 'east';
                    break;
                case 'west':
                    this.facing = 'south';
                    break;
                default:
                    break;
            }
        } else {
            throw new Error(`Invalid direction detected: ${direction}`);
        }
    }

    move = (distance) => {
        if (debug > DEBUG.INFO) {
            console.log(`Moving ${distance} to the ${this.facing}`);
        }

        switch (this.facing) {
            case 'north':
                this.north(distance);
                break;
            case 'east':
                this.east(distance);
                break;
            case 'south':
                this.south(distance);
                break;
            case 'west':
                this.west(distance);
                break;
            default:
                break;
        }

        if (debug > DEBUG.INFO) {
            this.print();
        }
    }

    east = (distance) => {
        let counter = 0;

        const wrapAround = () => {
            if (debug > DEBUG.INFO) {
                console.log(`Wrapping around to the east at ${this.x},${this.y}`);
            }
            const indexOfFirstOpenSpace = map[this.x].indexOf('.');
            if (indexOfFirstOpenSpace === 0) {
                // This is the first space, go there
                this.y = 0;
            } else {
                // Check to see if there's a wall to your left
                if (map[this.x][(indexOfFirstOpenSpace - 1)] === '#') {
                    // Do nothing, you hit a wall
                    if (debug > DEBUG.INFO) {
                        console.log(`Hit a wall going east at ${this.x},${this.y}`);
                    }
                    return;
                } else {
                    // Go to the first open space in the row
                    this.y = indexOfFirstOpenSpace;
                }
            }
        }

        while (counter < distance) {
            if (this.y < map[this.x].length - 1) {
                // There's more to the map to the east to check
                const nextCharacter = map[this.x][(this.y + 1)];

                if (nextCharacter === '.') {
                    // Move
                    this.y = this.y + 1;
                } else if (nextCharacter === '#') {
                    // Do nothing, you hit a wall
                    if (debug > DEBUG.INFO) {
                        console.log(`Hit a wall going east at ${this.x},${this.y}`);
                    }
                    break;
                } else {
                    // Wrap around
                    wrapAround();
                }
            } else {
                // Wrap around
                wrapAround();
            }

            counter++;
        }
    }

    west = (distance) => {
        let counter = 0;

        const wrapAround = () => {
            if (debug > DEBUG.INFO) {
                console.log(`Wrapping around to the west at ${this.x},${this.y}`);
            }
            const indexOfLastOpenSpace = map[this.x].lastIndexOf('.');
            if (indexOfLastOpenSpace === map[this.x].length - 1) {
                // This is the last space, go there
                this.y = map[this.x].length -1;
            } else {
                // Check to see if there's a wall to your right
                if (map[this.x][(indexOfLastOpenSpace + 1)] === '#') {
                    // Do nothing, you hit a wall
                    if (debug > DEBUG.INFO) {
                        console.log(`Hit a wall going west at ${this.x},${this.y}`);
                    }
                    return;
                } else {
                    // Go to the first open space in the row
                    this.y = indexOfLastOpenSpace;
                }
            }
        }

        while (counter < distance) {
            if (this.y > 0) {
                // There's more to the map to the west to check
                const nextCharacter = map[this.x][(this.y - 1)];

                if (nextCharacter === '.') {
                    // Move
                    this.y = this.y - 1;
                } else if (nextCharacter === '#') {
                    // Do nothing, you hit a wall
                    if (debug > DEBUG.INFO) {
                        console.log(`Hit a wall going west at ${this.x},${this.y}`);
                    }
                    break;
                } else {
                    // Wrap around
                    wrapAround();
                }
            } else {
                // Wrap around
                wrapAround();
            }

            counter++;
        }
    }

    north = (distance) => {
        let counter = 0;
        // Generate an array representing the column values of the map in the the current x coordinate
        const column = map.map((row) => {
            return row[this.y];
        });

        const wrapAround = () => {
            if (debug > DEBUG.INFO) {
                console.log(`Wrapping around to the north at ${this.x},${this.y}`);
            }
            const indexOfLastOpenSpace = column.lastIndexOf('.');
            if (indexOfLastOpenSpace === (column.length - 1)) {
                // This is the first space, go there
                this.x = column.length - 1;
            } else {
                // Check to see if there's a wall to your left
                if (column[(indexOfLastOpenSpace + 1)] === '#') {
                    // Do nothing, you hit a wall
                    if (debug > DEBUG.INFO) {
                        console.log(`Hit a wall going north at ${this.x},${this.y}`);
                    }
                    return;
                } else {
                    // Go to the first open space in the row
                    this.x = indexOfLastOpenSpace;
                }
            }
        }

        while (counter < distance) {
            if (this.x > 0) {
                // There's more to the map to the north to check
                const nextCharacter = column[(this.x - 1)];

                if (nextCharacter === '.') {
                    // Move
                    this.x = this.x - 1;
                } else if (nextCharacter === '#') {
                    // Do nothing, you hit a wall
                    if (debug > DEBUG.INFO) {
                        console.log(`Hit a wall going north at ${this.x},${this.y}`);
                    }
                    break;
                } else {
                    // Wrap around
                    wrapAround();
                }
            } else {
                // Wrap around
                wrapAround();
            }

            counter++;
        }
    }

    south = (distance) => {
        let counter = 0;
        // Generate an array representing the column values of the map in the the current x coordinate
        const column = map.map((row) => {
            return row[this.y];
        });

        const wrapAround = () => {
            if (debug > DEBUG.INFO) {
                console.log(`Wrapping around to the south at ${this.x},${this.y}`);
            }
            const indexOfFirstOpenSpace = column.indexOf('.');
            if (indexOfFirstOpenSpace === 0) {
                // This is the first space, go there
                this.x = 0;
            } else {
                // Check to see if there's a wall to your right
                if (column[(indexOfFirstOpenSpace - 1)] === '#') {
                    // Do nothing, you hit a wall
                    if (debug > DEBUG.INFO) {
                        console.log(`Hit a wall going south at ${this.x},${this.y}`);
                    }
                    return;
                } else {
                    // Go to the first open space in the row
                    this.x = indexOfFirstOpenSpace;
                }
            }
        }

        while (counter < distance) {
            if (this.x < column.length - 1) {
                // There's more to the map to the south to check
                const nextCharacter = column[(this.x + 1)];

                if (nextCharacter === '.') {
                    // Move
                    this.x = this.x + 1;
                } else if (nextCharacter === '#') {
                    // Do nothing, you hit a wall
                    if (debug > DEBUG.INFO) {
                        console.log(`Hit a wall going south at ${this.x},${this.y}`);
                    }
                    break;
                } else {
                    // Wrap around
                    wrapAround();
                }
            } else {
                // Wrap around
                wrapAround();
            }

            counter++;
        }
    }
}

determinePassword = (navigator) => {
    let facingValue = 0;

    switch (navigator.facing) {
        case 'north':
            facingValue = 3;
            break;
        case 'east':
            facingValue = 0;
            break;
        case 'south':
            facingValue = 1;
            break;
        case 'west':
            facingValue = 2;
            break;
        default:
            break;
    }

    return (1000 * (navigator.x + 1)) + (4 * (navigator.y + 1)) + facingValue;
}

parseLine = (line) => {
    if (nextLineIsInstructions) {
        instructions = line.split(/([A-Z])/g);
    } else if (line.length > 0) {
        map.push(line.split(''));
    } else {
        nextLineIsInstructions = true;
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    const navigator = new Navigator({
        x: 0,
        y: map[0].indexOf('.'),
        facing: 'east'
    });
    navigator.print();

    instructions.forEach((instruction) => {
        if (debug > DEBUG.INFO) {
            console.log(`Next instruction is ${instruction}`);
        }

        let number = Number.parseInt(instruction, 10);

        if (isNaN(number)) {
            navigator.rotate(instruction);
        } else {
            navigator.move(number);
        }
    });

    console.log(`Navigator ended up at ${navigator.x},${navigator.y} and facing ${navigator.facing}`);
    console.log(`The password is ${determinePassword(navigator)}`);
});