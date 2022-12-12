class Knot {
    constructor() {
        this.x = null;
        this.y = null;
        this.coordinatesVisited = [];
    }

    moveTo = (x, y) => {
        this.x = x;
        this.y = y;

        if (this.coordinatesVisited.indexOf(`${x},${y}`) === -1) {
            this.coordinatesVisited.push(`${x},${y}`);
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

describe('When pull is called', () => {
    let head;
    let tail;

    beforeEach(() => {
        head = new Knot();
        tail = new Knot();

        head.moveTo(0,0);
        tail.moveTo(0,0);
    });

    it('Should pull east when the head is 2 east of the tail.', () => {
        head.moveTo(2,0);
        head.pull(tail);

        expect(tail.x).toBe(1);
        expect(tail.y).toBe(0);
    });

    it('Should pull west when the head is 2 west of the tail.', () => {
        head.moveTo(-2,0);
        head.pull(tail);

        expect(tail.x).toBe(-1);
        expect(tail.y).toBe(0);
    });

    it('Should pull north when the head is 2 north of the tail.', () => {
        head.moveTo(0,2);
        head.pull(tail);

        expect(tail.x).toBe(0);
        expect(tail.y).toBe(1);
    });

    it('Should pull south when the head is 2 south of the tail.', () => {
        head.moveTo(0,-2);
        head.pull(tail);

        expect(tail.x).toBe(0);
        expect(tail.y).toBe(-1);
    });

    it('Should pull northeast when the head is 2 north and 1 east of the tail.', () => {
        head.moveTo(1,2);
        head.pull(tail);

        expect(tail.x).toBe(1);
        expect(tail.y).toBe(1);
    });

    it('Should pull northeast when the head is 2 east and 1 north of the tail.', () => {
        head.moveTo(2,1);
        head.pull(tail);

        expect(tail.x).toBe(1);
        expect(tail.y).toBe(1);
    });

    it('Should pull southeast when the head is 2 south and 1 east of the tail.', () => {
        head.moveTo(1,-2);
        head.pull(tail);

        expect(tail.x).toBe(1);
        expect(tail.y).toBe(-1);
    });

    it('Should pull southeast when the head is 2 east and 1 south of the tail.', () => {
        head.moveTo(2,-1);
        head.pull(tail);

        expect(tail.x).toBe(1);
        expect(tail.y).toBe(-1);
    });

    it('Should pull northwest when the head is 2 north and 1 west of the tail.', () => {
        head.moveTo(-1,2);
        head.pull(tail);

        expect(tail.x).toBe(-1);
        expect(tail.y).toBe(1);
    });

    it('Should pull northwest when the head is 2 west and 1 north of the tail.', () => {
        head.moveTo(-2,1);
        head.pull(tail);

        expect(tail.x).toBe(-1);
        expect(tail.y).toBe(1);
    });

    it('Should pull southwest when the head is 2 south and 1 west of the tail.', () => {
        head.moveTo(-1,-2);
        head.pull(tail);

        expect(tail.x).toBe(-1);
        expect(tail.y).toBe(-1);
    });

    it('Should pull southwest when the head is 2 west and 1 south of the tail.', () => {
        head.moveTo(-2,-1);
        head.pull(tail);

        expect(tail.x).toBe(-1);
        expect(tail.y).toBe(-1);
    });
});