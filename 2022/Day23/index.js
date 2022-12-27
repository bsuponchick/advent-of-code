const DEBUG = {
    ALL: 3,
    TRACE: 2,
    INFO: 1,
    NONE: 0
};

let debug = DEBUG.TRACE;

class Tile {
    constructor (id) {
        this.id = id;

        this.north = null;
        this.south = null;
        this.east = null;
        this.west = null;

        this.northeast = null;
        this.northwest = null;
        this.southeast = null;
        this.southwest = null;

        this.elf = null;
    }

    setElf = (elf) => {
        this.elf = elf;
    }

    hasElf = () => {
        return this.elf !== null;
    }

    setNorth = (tile) => {
        this.north = tile;
    }

    setSouth = (tile) => {
        this.south = tile;
    }

    setEast = (tile) => {
        this.east = tile;
    }

    setWest = (tile) => {
        this.west = tile;
    }

    setNortheast = (tile) => {
        this.northeast = tile;
    }

    setNorthwest = (tile) => {
        this.northwest = tile;
    }

    setSoutheast = (tile) => {
        this.southeast = tile;
    }

    setSouthwest = (tile) => {
        this.southwest = tile;
    }
}

class Elf {
    constructor () {
        this.tile = null;
        this.nextMove = null;
    }

    moveTo = (tile) => {
        if (this.tile !== null) {
            this.tile.setElf(null);
        }

        tile.setElf(this);
        this.tile = tile;
    }

    proposeMove= (decisionOrder) => {
        this.nextMove = null;

        // Only propose a move if there is an adjacent elf
        if ((this.tile.north && this.tile.north.hasElf()) || 
            (this.tile.south && this.tile.south.hasElf()) || 
            (this.tile.east && this.tile.east.hasElf()) ||
            (this.tile.west && this.tile.west.hasElf()) || 
            (this.tile.northeast && this.tile.northeast.hasElf()) || 
            (this.tile.northwest && this.tile.northwest.hasElf()) ||
            (this.tile.southeast && this.tile.southeast.hasElf()) || 
            (this.tile.southwest && this.tile.southwest.hasElf())) {
            decisionOrder.forEach((direction) => {
                if (this.nextMove === null) {
                    switch (direction) {
                        case 'N':
                            if (this.tile.north === null || this.tile.northeast === null || this.tile.northwest === null) {
                                // Breaking encapsulation...but w/e
                                map.expand();
                            }

                            if (!this.tile.north.hasElf() && !this.tile.northeast.hasElf() && !this.tile.northwest.hasElf()) {
                                this.nextMove = this.tile.north;
                            }
                            break;
                        case 'S':
                            if (this.tile.south === null || this.tile.southeast === null || this.tile.southwest === null) {
                                // Breaking encapsulation...but w/e
                                map.expand();
                            }

                            if (!this.tile.south.hasElf() && !this.tile.southeast.hasElf() && !this.tile.southwest.hasElf()) {
                                this.nextMove = this.tile.south;
                            }
                            break;
                        case 'E':
                            if (this.tile.east === null || this.tile.northeast === null || this.tile.southeast === null) {
                                // Breaking encapsulation...but w/e
                                map.expand();
                            }

                            if (!this.tile.east.hasElf() && !this.tile.northeast.hasElf() && !this.tile.southeast.hasElf()) {
                                this.nextMove = this.tile.east;
                            }
                            break;
                        case 'W':
                            if (this.tile.west === null || this.tile.northwest === null || this.tile.southwest === null) {
                                // Breaking encapsulation...but w/e
                                map.expand();
                            }

                            if (!this.tile.west.hasElf() && !this.tile.northwest.hasElf() && !this.tile.southwest.hasElf()) {
                                this.nextMove = this.tile.west;
                            }
                            break;
                        default:
                            throw new Error(`Invalid direction detected: ${direction}`);
                    }

                    if (this.nextMove !== null) {
                        if (proposedMoveCounts[this.nextMove.id]) {
                            proposedMoveCounts[this.nextMove.id] = proposedMoveCounts[this.nextMove.id] + 1;
                        } else {
                            proposedMoveCounts[this.nextMove.id] = 1;
                        }
                    }
                }
            });
        }
    }
}

class Map {
    constructor () {
        this.rows = [];
    }

    addRow = (row) => {
        this.rows.push(row);
    }

    connectTiles = () => {
        this.rows.forEach((row, rowIndex) => {
            row.forEach((tile, columnIndex) => {
                // Set up east neighbor
                if (columnIndex < row.length - 1) {
                    tile.setEast(row[columnIndex + 1]);
                }
    
                // Set up west neighbor
                if (columnIndex > 0) {
                    tile.setWest(row[columnIndex - 1]);
                }
    
                // Set up north neighbor
                if (rowIndex > 0) {
                    tile.setNorth(this.rows[rowIndex - 1][columnIndex]);

                    // Set up northeast neighbor
                    if (columnIndex < row.length - 1) {
                        tile.setNortheast(this.rows[rowIndex - 1][columnIndex + 1]);
                    }

                    // Set up northwest neighbor
                    if (columnIndex > 0) {
                        tile.setNorthwest(this.rows[rowIndex - 1][columnIndex - 1]);
                    }
                }
    
                // Set up south neighbor
                if (rowIndex < this.rows.length - 1) {
                    tile.setSouth(this.rows[rowIndex + 1][columnIndex]);

                    // Set up southeast neighbor
                    if (columnIndex < row.length - 1) {
                        tile.setSoutheast(this.rows[rowIndex + 1][columnIndex + 1]);
                    }

                    // Set up southwest neighbor
                    if (columnIndex > 0) {
                        tile.setSouthwest(this.rows[rowIndex + 1][columnIndex - 1]);
                    }
                }
            });
        });
    }

    expand = () => {
        const columnCount = this.rows[0].length;

        const newTopRow = [];
        const newBottomRow = [];

        for (let i = 0; i < columnCount + 2; i++) {
            newTopRow.push(new Tile(tileCounter++));
            newBottomRow.push(new Tile(tileCounter++));
        }

        // Expand each existing row east/west
        this.rows.forEach((row) => {
            row.unshift(new Tile(tileCounter++));
            row.push(new Tile(tileCounter++));
        });

        // Add new top and bottom rows
        this.rows.unshift(newTopRow);
        this.rows.push(newBottomRow);

        // Re-connect all the tiles
        this.connectTiles();
    }

    print = () => {
        this.rows.forEach((row) => {
            let characters = '';

            row.forEach((tile) => {
                if (tile.hasElf()) {
                    characters += '#';
                } else {
                    characters += '.';
                }
            });

            console.log(characters);
        });
    }

    trim = () => {
        let foundNorth = false;
        let foundSouth = false;
        let foundEast = false;
        let foundWest = false;

        while (foundNorth === false) {
            this.rows[0].forEach((tile) => {
                if (tile.hasElf()) {
                    foundNorth = true;
                };
            })

            if (foundNorth === false) {
                this.rows.shift();
            }
        }

        while (foundSouth === false) {
            this.rows[this.rows.length - 1].forEach((tile) => {
                if (tile.hasElf()) {
                    foundSouth = true;
                }
            });

            if (foundSouth === false) {
                this.rows.pop();
            }
        }

        while (foundEast === false) {
            const column = this.rows.map((row) => {
                return row[row.length - 1];
            });

            column.forEach((tile) => {
                if (tile.hasElf()) {
                    foundEast = true;
                }
            });

            if (foundEast === false) {
                this.rows.forEach((row) => {
                    row.pop();
                });
            }
        }

        while (foundWest === false) {
            const column = this.rows.map((row) => {
                return row[0];
            });

            column.forEach((tile) => {
                if (tile.hasElf()) {
                    foundWest = true;
                }
            });

            if (foundWest === false) {
                this.rows.forEach((row) => {
                    row.shift();
                });
            }
        }
    }

    getCountOfEmptyTiles = () => {
        let counter = 0;

        this.rows.forEach((row) => {
            row.forEach((tile) => {
                if (!tile.hasElf()) {
                    counter++;
                }
            });
        });

        return counter;
    }
}

cycleDecisionOrder = () => {
    const firstDirection = decisionOrder.shift();
    decisionOrder.push(firstDirection);
} 

const map = new Map();
const elves = [];
let tileCounter = 0;
let decisionOrder = ['N', 'S', 'W', 'E'];
let proposedMoveCounts = {};

parseLine = (line) => {
    const row = line.split('').map((character) => {
        const tile = new Tile(tileCounter++);

        if (character === '#') {
            const elf = new Elf();
            elf.moveTo(tile);
            elves.push(elf);
        }

        return tile;
    });

    map.addRow(row);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    map.connectTiles();
    console.log(`There are ${elves.length} elves on the board.`);

    const MAX_ROUNDS = 10;
    let counter = 1;

    while (counter <= MAX_ROUNDS) {
        // Each elf should propose a next move
        elves.forEach((elf) => {
            elf.proposeMove(decisionOrder);
        });

        // Once all proposals are made, each elf that desires to a tile that no other elf also desires to move to should move to that tile
        elves.forEach((elf) => {
            if (elf.nextMove !== null && proposedMoveCounts[elf.nextMove.id] === 1) {
                elf.moveTo(elf.nextMove);
            }
        });

        if (debug >= DEBUG.TRACE) {
            console.log(`>>>> Round ${counter} <<<<<`);
            map.print();
        }

        // Reset proposedMoveCounts
        proposedMoveCounts = {};

        // Cycle the decision order so the first check goes to the end
        cycleDecisionOrder();

        // Increment the counter
        counter++;
    }

    map.trim();
    if (debug >= DEBUG.TRACE) {
        console.log(`>>>> Trimmed Map <<<<<`);
        map.print();
    }

    console.log(`The map has ${map.getCountOfEmptyTiles()} empty ground tiles`);
});