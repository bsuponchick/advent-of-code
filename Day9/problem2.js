class Knot {
    constructor() {
        this.x = null;
        this.y = null;
        this.neighbor = null;
        this.coordinatesVisited = [];
    }

    moveTo = (x, y) => {
        this.x = x;
        this.y = y;

        if (this.coordinatesVisited.indexOf(`${x},${y}`) === -1) {
            this.coordinatesVisited.push(`${x},${y}`);
        }

        if (this.neighbor) {
            this.pull(this.neighbor);
        }
    }

    south = () => {
        this.moveTo(this.x, this.y - 1);
    }

    west = () => {
        this.moveTo(this.x - 1, this.y);
    }

    east = () => {
        this.moveTo(this.x + 1, this.y);
    }

    north = () => {
        this.moveTo(this.x, this.y + 1);
    }

    northeast = () => {
        this.moveTo(this.x + 1, this.y + 1);
    }

    northwest = () => {
        this.moveTo(this.x - 1, this.y + 1);
    }

    southeast = () => {
        this.moveTo(this.x + 1, this.y - 1);
    }

    southwest = () => {
        this.moveTo(this.x - 1, this.y - 1);
    }

    pull = (knot) => {
        const distance = this.determineDistance(knot);
        console.log(`Distince to knot is ${distance}`);

        if (distance > 1) {
            // Need to pull
            if ((this.x === knot.x) && (this.y === knot.y)) {
                // no op
                console.log(`Same node, don't move`);
            } else if (this.x === knot.x) {
                // Same row, pull knot 1 space closer
                if (this.y > knot.y) {
                    console.log('Move tail north');
                    knot.north();
                } else {
                    console.log('Move tail south');
                    knot.south();
                }
            } else if (this.y === knot.y) {
                // Same column, pull knot 1 space closer
                if (this.x > knot.x) {
                    console.log('Move tail east');
                    knot.east();
                } else {
                    console.log('Move tail west');
                    knot.west();
                }
            } else {
                // Diagonal time
                if ((this.x > knot.x) && (this.y > knot.y)) {
                    console.log('Move tail northeast');
                    knot.northeast();
                } else if ((this.x < knot.x) && (this.y > knot.y)) {
                    console.log('Move tail northwest');
                    knot.northwest();
                } else if ((this.y < knot.y) && (this.x < knot.x)) {
                    console.log('Move tail southwest');
                    knot.southwest();
                } else if ((this.x > knot.x) && (this.y < knot.y)) {
                    console.log('Move tail southeast');
                    knot.southeast();
                }
            }
        }
    }

    determineDistance = (knot) => {
        const diffX = Math.abs(this.x - knot.x);
        const diffY = Math.abs(this.y - knot.y);
    
        if (diffX > diffY) {
            return diffX;
        } else {
            return diffY;
        }
    }
}

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

const head = new Knot();
const knot2 = new Knot();
const knot3 = new Knot();
const knot4 = new Knot();
const knot5 = new Knot();
const knot6 = new Knot();
const knot7 = new Knot();
const knot8 = new Knot();
const knot9 = new Knot();
const tail = new Knot();

head.neighbor = knot2;
knot2.neighbor = knot3;
knot3.neighbor = knot4;
knot4.neighbor = knot5;
knot5.neighbor = knot6;
knot6.neighbor = knot7;
knot7.neighbor = knot8; 
knot8.neighbor = knot9;
knot9.neighbor = tail;

head.moveTo(0,0);
knot2.moveTo(0,0);
knot3.moveTo(0,0);
knot4.moveTo(0,0);
knot5.moveTo(0,0);
knot6.moveTo(0,0);
knot7.moveTo(0,0);
knot8.moveTo(0,0);
knot9.moveTo(0,0);
tail.moveTo(0,0);

lineReader.on('line', (line) => {
    const parts = line.split(' ');
    const direction = parts[0];
    const distance = Number.parseInt(parts[1]);

    for (let i = 0; i < distance; i++) {
        switch (direction) {
            case 'L':
                head.west();
                break;
            case 'R':
                head.east();
                break;
            case 'U':
                head.north();
                break;
            case 'D':
                head.south();
                break;
            default:
                console.log(`Detected invalid direction ${direction}`);
                break;
        }
    }
}).on('close', () => {
    console.log(`The tail visited ${tail.coordinatesVisited.length} distinct nodes.`);
});
