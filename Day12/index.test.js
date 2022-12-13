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
        this.report();

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
        console.log(`Trying to visit ${terrain.id}`);
        terrain.visit();

        if (terrain.isEnd) {
            console.log(`Woot woot I've hit the goal.  The shortest route is ${terrain.distance}.`);
        } else {
            console.log(`Index of current terrain is ${this.unvisitedTerrain.indexOf(terrain)}`);
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

describe('When the Hiker moves', () => {
    it('Should have a path of 26 when on a board with only 27 Terrains, starting on the left and ending on the right.', () => {
        const map = [];
        let id = 0;
        map.push(new Terrain('S', id));
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].forEach((letter) => {
            map.push(new Terrain(letter, ++id));
        });
        map.push(new Terrain('E', ++id));

        map.forEach((terrain, index) => {
            if (index < map.length - 1) {
                terrain.east = map[index + 1];
            }

            if (index > 0) {
                terrain.west = map[index - 1];
            }
        });

        const hiker = new Hiker();
        hiker.currentPosition = map[0];
        hiker.unvisitedTerrain = map;
        map[0].distance = 0;
        hiker.moveToGoal();
    });
});