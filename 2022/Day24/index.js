const DEBUG = {
    ALL: 3,
    TRACE: 2,
    INFO: 1,
    NONE: 0
};

let debug = DEBUG.INFO;

class PriorityQueue {
    constructor () {
        this.queue = [];
    }

    push = (item) => {
        this.queue.push(item);
        this.queue.sort((a, b) => {
            if (a.cost < b.cost) {
                return -1;
            } else if (a.cost > b.cost) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    pop = () => {
        return this.queue.shift();
    }
}

class Tile {
    constructor ({id, isWall, isStart, isGoal, x, y}) {
        this.id = id;
        this.isWall = isWall;
        this.isStart = isStart;
        this.isGoal = isGoal;
        this.x = x;
        this.y = y;

        this.north = null;
        this.south = null;
        this.east = null;
        this.west = null;

        this.blizzards = [];
    }

    print = () => {
        console.log(`>>>> Tile ${this.id} <<<<`);
        console.log(`Goal: ${this.isGoal}`);
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
}

class Blizzard {
    constructor ({direction, x, y}) {
        this.direction = direction;
        this.tile = null;
        this.x = x;
        this.y = y;
    }

    moveTo = (tile) => {       
        this.tile = tile;
    }

    determineTile = (time) => {
        let counter = 0;
        let tile = this.tile;

        while (counter < time) {
            tile = this.determineNextTile(tile);
            counter++;
        }

        return tile;
    }

    determineNextTile = (tile) => {
        switch (this.direction) {
            case '>':
                if (tile.east.isWall) {
                    // Wrap around
                    let tileToEvaluate = tile;
                    while (tileToEvaluate.west.isWall === false) {
                        tileToEvaluate = tileToEvaluate.west;
                    }

                    return tileToEvaluate;
                } else {
                    return tile.east;
                }
            case '<':
                if (tile.west.isWall) {
                    // Wrap around
                    let tileToEvaluate = tile;
                    while (tileToEvaluate.east.isWall === false) {
                        tileToEvaluate = tileToEvaluate.east;
                    }

                    return tileToEvaluate;
                } else {
                    return tile.west;
                }
            case '^':
                if (tile.north.isWall) {
                    // Wrap around
                    let tileToEvaluate = tile;
                    while (tileToEvaluate.south.isWall === false) {
                        tileToEvaluate = tileToEvaluate.south;
                    }

                    return tileToEvaluate;
                } else {
                    return tile.north;
                }
            case 'v':
                if (tile.south.isWall) {
                    // Wrap around
                    let tileToEvaluate = tile;
                    while (tileToEvaluate.north.isWall === false) {
                        tileToEvaluate = tileToEvaluate.north;
                    }

                    return tileToEvaluate;
                } else {
                    return tile.south;
                }
            default:
                throw new Error(`Invalid direction detected: ${this.direction}`);
                break;
        }
    }
}

class Map {
    constructor () {
        this.rows = [];
        this.start = null;
        this.goal = null;
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
                }
    
                // Set up south neighbor
                if (rowIndex < this.rows.length - 1) {
                    tile.setSouth(this.rows[rowIndex + 1][columnIndex]);
                }
            });
        });
    }

    markStartingTile = () => {
        this.rows[0].forEach((tile) => {
            if (tile.isWall === false) {
                tile.isStart = true;
                this.start = tile;
            }
        });
    }

    markGoalTile = () => {
        this.rows[this.rows.length - 1].forEach((tile) => {
            if (tile.isWall === false) {
                tile.isGoal = true;
                this.goal = tile;
            }
        });
    }
}

class Wayfinder {
    constructor ({ tile, weatherForecast }) {
        this.tile = tile;
        this.weatherForecast = weatherForecast;
        this.seen = {
            0: [tile]
        };
        this.queue = new PriorityQueue();
        this.queue.push({
            tile,
            cost: 0
        });
    }

    navigate = () => {
        let atGoal = false;

        while (atGoal === false) {
            const location = this.queue.pop();
            
            if (debug >= DEBUG.TRACE) {
                console.log(`Assesing location ${location.tile.id} at time ${location.cost}`);
            }

            if (location.tile.isGoal) {
                console.log(`Goal was hit in ${location.cost} steps.`);
                atGoal = true;
            } else {
                let newCost = location.cost + 1;

                let candidates = [];
                candidates.push({tile: location.tile, cost: newCost});
        
                if (location.tile.north && !location.tile.north.isWall) {
                    candidates.push({ tile: location.tile.north, cost: newCost });
                }
        
                if (location.tile.south && !location.tile.south.isWall) {
                    candidates.push({ tile: location.tile.south, cost: newCost });
                }
        
                if (location.tile.east && !location.tile.east.isWall) {
                    candidates.push({ tile: location.tile.east, cost: newCost });
                }
        
                if (location.tile.west && !location.tile.west.isWall) {
                    candidates.push({ tile: location.tile.west, cost: newCost });
                }
        
                const alreadySeenAtTime = this.seen[newCost];

                if (debug >= DEBUG.TRACE) {
                    if (alreadySeenAtTime) {
                        console.log(`Already seen ${alreadySeenAtTime.length} tiles at time ${newCost}`);
                    } else {
                        console.log(`No tiles seen at time ${newCost}`);
                    }
                }
        
                // Only deal put candidates into the queue that we haven't already seen at time newCost
                if (alreadySeenAtTime) {
                    candidates = candidates.filter((candidate) => {
                        return alreadySeenAtTime.indexOf(candidate.tile) === -1;
                    });
                }
                
                if (debug >= DEBUG.TRACE) {
                    console.log(`Candidates not yet seen are ${JSON.stringify(candidates.map((candidate) => { return `{${candidate.tile.x},${candidate.tile.y}};` }))}`);
                }

                // Remove any candidate tile that will have a blizzard at time newCost
                const blizzardsAtTimeX = this.weatherForecast[newCost % this.weatherForecast.length];

                if (debug >= DEBUG.TRACE) {
                    console.log(`There will be blizzards in tiles ${JSON.stringify(blizzardsAtTimeX)}`);
                }

                if (blizzardsAtTimeX) {
                    candidates = candidates.filter((candidate) => {
                        return blizzardsAtTimeX[candidate.tile.id] === undefined;
                    });
                }
                
                candidates.forEach((candidate) => {
                    if (debug >= DEBUG.TRACE) {
                        console.log(`Adding ${candidate.tile.id} to the queue with cost ${newCost}`);
                    }

                    this.queue.push(candidate);
                });
            }
        }
    }
}

generateWeatherForecast = (blizzards, map) => {
    const weatherForecast = [];
    const repeatingWeatherAfterTurns = map.rows.length * map.rows[0].length;
    let counter = 0;

    console.log(`Calculating weather forecast for ${repeatingWeatherAfterTurns} turns...`);
    while (counter < repeatingWeatherAfterTurns) {
        const tileIdMap = {};
        blizzards.forEach((blizzard) => {
            const tile = blizzard.determineTile(counter);
            tileIdMap[tile.id] = true;
        });

        if (debug >= DEBUG.TRACE) {
            console.log(`Turn ${counter} blizzards: ${JSON.stringify(tileIdMap)}`);
        }

        weatherForecast.push(tileIdMap);

        counter++;
    }

    console.log(`Weather forecast ready!`);
    return weatherForecast;
}

const map = new Map();
const blizzards = [];
let tileCounter = 0;
let rowCounter = 0;

parseLine = (line) => {
    const row = line.split('').map((character, index) => {
        const tile = new Tile({
            id: tileCounter++,
            isStart: false,
            isGoal: false,
            isWall: character === '#',
            x: rowCounter,
            y: index
        });

        if (character === '>' || character === '<' || character === '^' || character === 'v') {
            const blizzard = new Blizzard({
                direction: character,
                x: rowCounter,
                y: index
            });
            blizzard.moveTo(tile);
            blizzards.push(blizzard);
        }

        return tile;
    });

    map.addRow(row);
    rowCounter++;
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    map.connectTiles();
    map.markStartingTile();
    map.markGoalTile();

    const weatherForecast = generateWeatherForecast(blizzards, map);
    wayfinder = new Wayfinder({tile: map.start, weatherForecast});

    if (debug >= DEBUG.INFO) {
        console.log(`There are ${blizzards.length} blizzards`);
    }

    wayfinder.navigate();
});