class Terrain {
    constructor(letter, id) {
        if (letter === 'S') {
            this.elevation = 'a'.charCodeAt(0) - 96;
        } else if (letter === 'E') {
            this.elevation = 'z'.charCodeAt(0) - 96;
        } else {
            this.elevation = letter.charCodeAt(0) - 96;
        }
        this.isStart = !!(letter === 'S');
        this.isEnd = !!(letter === 'E');
        this.north = null;
        this.south = null;
        this.east = null;
        this.west = null;
        this.visited = false;
        this.distance = Number.MAX_VALUE;
        this.id = id;
    }

    visit = () => {
        this.visited = true;

        if (this.canMoveNorth()) {
            this.north.distance = this.distance + 1;
        }

        if (this.canMoveSouth()) {
            this.south.distance = this.distance + 1;
        }

        if (this.canMoveEast()) {
            this.east.distance = this.distance + 1;
        }

        if (this.canMoveWest()) {
            this.west.distance = this.distance + 1;
        }
    }

    canMoveNorth = () => {
        return !!(this.north && this.canVisit(this.north));
    }

    canMoveSouth = () => {
        return !!(this.south && this.canVisit(this.south));
    }

    canMoveEast = () => {
        return !!(this.east && this.canVisit(this.east));
    }

    canMoveWest = () => {
        return !!(this.west && this.canVisit(this.west));
    }

    canVisit = (destination) => {
        return !!((destination.visited === false) && (destination.elevation - this.elevation <= 1));
    }

    report = () => {
        console.log(`Terrain ${this.id}:`);
        console.log(`North: ${this.north ? `${this.north.id}, visited: ${this.north.visited}` : 'null'}`);
        console.log(`South: ${this.south ? `${this.south.id}, visited: ${this.south.visited}` : 'null'}`);
        console.log(`East: ${this.east ? `${this.east.id}, visited: ${this.east.visited}` : 'null'}`);
        console.log(`West: ${this.west ? `${this.west.id}, visited: ${this.west.visited}` : 'null'}`);
        console.log(`Distance: ${this.distance}`);
        console.log(`Visited: ${this.visited}`);
        if (this.isStart) {
            console.log(`>>> This is the Starting Terrain <<<`);
        }

        if (this.isEnd) {
            console.log(`!!! This is the Ending Terrain !!!`);
        }
    }
}

class Hiker {
    constructor() {
        this.currentPosition = null;
        this.unvisitedTerrain = [];
    }

    navigate = (terrain) => {
        terrain.visit();

        if (terrain.isEnd) {
            console.log(`Woot woot I've hit the goal.  Checking ${terrain.distance} steps.`);
            if (fewestStepsToVictory > terrain.distance) {
                fewestStepsToVictory = terrain.distance;
            }
        } else {
            this.unvisitedTerrain.splice(this.unvisitedTerrain.indexOf(terrain), 1);
            this.moveToGoal();
        }
    }

    sortUnvisitedTerrain = () => {
        this.unvisitedTerrain.sort((a, b) => {
            if (a.distance < b.distance) {
                return -1;
            } else if (a.distance > b.distance) {
                return 1;
            } else { 
                return 0;
            }
        });
    }

    moveToGoal = () => {
        this.sortUnvisitedTerrain();
        if (this.unvisitedTerrain[0].distance === Number.MAX_VALUE) {
            console.log(`Oh no, I can't seem to find a path.`);
        } else {
            this.navigate(this.unvisitedTerrain[0]);
        }
    }
}

let counter = 0;
const map = [];
const potentialStartingNodes = [];
let fewestStepsToVictory = Number.MAX_VALUE;

const resetMap = () => {
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            map[row][column].visited = false;
            map[row][column].distance = Number.MAX_VALUE;
            map[row][column].isStart = false;
        }
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    const row = [];
    
    for (let i = 0; i < line.length; i++) {
        const terrain = new Terrain(line.charAt(i), counter++);
        row.push(terrain);
        if (terrain.elevation === 1) {
            potentialStartingNodes.push(terrain);
        }
    }

    map.push(row);
}).on('close', () => {
    // Generate Graph Connections
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            const currentNode = map[row][column];

            // Establish West Connection
            if (column > 0) {
                const potentialWestNode = map[row][column - 1];
                if (currentNode.canVisit(potentialWestNode)) {
                    currentNode.west = potentialWestNode;
                }
            }

            // Establish East Connection
            if (column < (map[row].length - 1)) {
                const potentialEastNode =  map[row][column + 1];
                if (currentNode.canVisit(potentialEastNode)) {
                    currentNode.east = potentialEastNode;
                }
            }

            // Establish North Connection
            if (row > 0) {
                const potentialNorthNode = map[row - 1][column];
                if (currentNode.canVisit(potentialNorthNode)) {
                    currentNode.north = potentialNorthNode;
                }
            }

            // Establish South Connection
            if (row < (map.length - 1)) {
                const potentialSouthNode = map[row + 1][column];
                if (currentNode.canVisit(potentialSouthNode)) {
                    currentNode.south = potentialSouthNode;
                }
            }
        }
    }

    const hiker = new Hiker();

    console.log(`There are ${potentialStartingNodes.length} potential starting nodes.`);

    potentialStartingNodes.forEach((startingTerrain) => {
        resetMap();
        hiker.unvisitedTerrain = [];

        map.forEach((row) => {
            hiker.unvisitedTerrain = hiker.unvisitedTerrain.concat(row);
        });

        hiker.currentPosition = startingTerrain;
        startingTerrain.distance = 0;
        hiker.moveToGoal();
    });

    console.log(`The shortest path is ${fewestStepsToVictory} steps.`);
});