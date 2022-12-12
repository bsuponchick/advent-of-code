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
        this.beenNorth = false;
        this.beenSouth = false;
        this.beenEast = false;
        this.beenWest = false;
        this.visited = false;

        this.id = id;
    }

    visit = (from) => {
        if (from) {
            console.log(`Moving from ${from.id} to ${this.id}`);
            if (from.north !== null && (this.id === from.north.id)) {
                from.beenNorth = true;
            } else if (from.south !== null && (this.id === from.south.id)) {
                from.beenSouth = true;
            } else if (from.east !== null && (this.id === from.east.id)) {
                from.beenEast = true;
            } else if (from.west !== null && (this.id === from.west.id)) {
                from.beenWest = true;
            }
        }
    }

    canVisitFrom = (from) => {
        // console.log(`Trying to navigate from Terrain ${from.id} of elevation ${from.elevation} to Terrain ${this.id} of elevation ${this.elevation}.`);
        // if (this.visited === true) {
        //     console.log(`You've already been to Terrain ${this.id}`);
        // }

        let roadAlreadyTraveled = false;

        if (this.north !== null && from.id === this.north.id && from.beenSouth) {
            // console.log(`Road Already Traveled From North`);
            roadAlreadyTraveled = true;
        } else if (this.south !== null && from.id === this.south.id && from.beenNorth) {
            // console.log(`Road Already Traveled From South`);
            roadAlreadyTraveled = true;
        } else if (this.east !== null && from.id === this.east.id && from.beenWest) {
            // console.log(`Road Already Traveled From East`);
            roadAlreadyTraveled = true;
        } else if (this.west !== null && from.id === this.west.id && from.beenEast) {
            // console.log(`Road Already Traveled From West`);
            roadAlreadyTraveled = true;
        }

        const assessment = (roadAlreadyTraveled === false) && (Math.abs(this.elevation - from.elevation) <= 1);
        // if (assessment) {
        //     console.log(`Moving to Terrain ${this.id}`);
        // } else {
        //     console.log(`Can't move to Terrain ${this.id}`);
        // }
        return assessment;
    }

    report = () => {
        console.log(`Terrain ${this.id}:`);
        console.log(`North: ${this.north ? `${this.north.id}, visited: ${this.beenNorth}` : 'null'}`);
        console.log(`South: ${this.south ? `${this.south.id}, visited: ${this.beenSouth}` : 'null'}`);
        console.log(`East: ${this.east ? `${this.east.id}, visited: ${this.beenEast}` : 'null'}`);
        console.log(`West: ${this.west ? `${this.west.id}, visited: ${this.beenWest}` : 'null'}`);
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
        this.terrainVisited = [];
        this.potentialDistancesToGoal = [];
    }

    getCurrentPosition = () => {
        return this.terrainVisited[this.terrainVisited.length - 1];
    }

    navigate = (terrain) => {
        const currentPosition = this.getCurrentPosition();
        // console.log(`Terrain visited: ${this.terrainVisited.length}`);
        this.terrainVisited.push(terrain);
        terrain.visit(currentPosition);

        if (terrain.isEnd) {
            console.log(`Woot woot I've hit the goal, adding ${this.terrainVisited.length} to possible routes.`);
            this.potentialDistancesToGoal.push(this.terrainVisited.length);

            // Backup two and keep searching
            //console.log(`Backing up to try and search for shorter routes.`);
            this.backup();
        } else if (this.canMove()) {
            // Moving one space toward goal
            this.moveToGoal();
        } else if (terrain.isStart) {
            terrain.report();
            if (this.terrainVisited.length > 1) {
                this.backup();
            } else {
                this.report();
            }
        } else {
            this.backup();
        }
    }

    getShortestPathToGoal = () => {
        this.potentialDistancesToGoal.sort((a, b) => {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        });

        // Don't count the starting node
        return this.potentialDistancesToGoal[0] - 1;
    }

    report = () => {
        console.log(`The shortest path to the goal is ${this.getShortestPathToGoal()} moves.`);
    }

    canMove = () => {
        // console.log(`Can Move North: ${this.canMoveNorth()}`);
        // console.log(`Can Move South: ${this.canMoveSouth()}`);
        // console.log(`Can Move East: ${this.canMoveEast()}`);
        // console.log(`Can Move West: ${this.canMoveWest()}`);
        return this.canMoveNorth() || this.canMoveSouth() || this.canMoveEast() || this.canMoveWest();
    }

    canMoveNorth = () => {
        const currentPosition = this.getCurrentPosition();
        return !!(currentPosition.north && currentPosition.north.canVisitFrom(currentPosition));
    }

    canMoveSouth = () => {
        const currentPosition = this.getCurrentPosition();
        return !!(currentPosition.south && currentPosition.south.canVisitFrom(currentPosition));
    }

    canMoveEast = () => {
        const currentPosition = this.getCurrentPosition();
        return !!(currentPosition.east && currentPosition.east.canVisitFrom(currentPosition));
    }

    canMoveWest = () => {
        const currentPosition = this.getCurrentPosition();
        return !!(currentPosition.west && currentPosition.west.canVisitFrom(currentPosition));
    }

    backup = () => {
        this.reportMoves();
        const previousTerrain = this.terrainVisited.pop();

        console.log(`Going back to Terrain ${previousTerrain.id}`);
        this.moveToGoal();
    }

    reportMoves = () => {
        const moves = this.terrainVisited.map((terrain) => terrain.id);
        console.log(`Moves is ${JSON.stringify(moves)}`);
    }

    moveToGoal = () => {
        // We'll always try north, then south, then east, then west
        const currentPosition = this.getCurrentPosition();
        currentPosition.report();

        if (this.canMoveNorth()) {
            //console.log(`Moving north to Terrain ${currentPosition.north.id}`);
            this.navigate(currentPosition.north);
        } else if (this.canMoveSouth()) {
            //console.log(`Moving south to Terrain ${currentPosition.south.id}`);
            this.navigate(currentPosition.south);
        } else if (this.canMoveEast()) {
            //console.log(`Moving east to Terrain ${currentPosition.east.id}`);
            this.navigate(currentPosition.east);
        } else if (this.canMoveWest()) {
            //console.log(`Moving west to Terrain ${currentPosition.west.id}`);
            this.navigate(currentPosition.west);
        } else {
            console.log(`I can't move, backing up.`);
            this.backup();
        }
    }
}

let counter = 0;
const map = [];
let startingTerrain = null;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    const row = [];

    for (let i = 0; i < line.length; i++) {
        const terrain = new Terrain(line.charAt(i), counter++);
        row.push(terrain);
        if (terrain.isStart) {
            startingTerrain = terrain;
        }
    }

    map.push(row);
}).on('close', () => {
    // Setup neighbors
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            if (column > 0) {
                map[row][column].west = map[row][column - 1];
            }

            if (column < (map[row].length - 1)) {
                map[row][column].east = map[row][column + 1];
            }

            if (row > 0) {
                map[row][column].north = map[row - 1][column];
            }

            if (row < (map.length - 1)) {
                map[row][column].south = map[row + 1][column];
            }
        }
    }

    const hiker = new Hiker();
    hiker.navigate(startingTerrain);
});