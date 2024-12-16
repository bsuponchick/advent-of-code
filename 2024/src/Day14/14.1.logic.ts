interface Coordinate {
    x: number;
    y: number;
}

export class Robot {
    id: string;
    position: Coordinate;
    velocity: Coordinate;
    previousPositions: Coordinate[];
    positionCache: Map<string, number>;

    constructor(position: Coordinate, velocity: Coordinate) {
        this.id = this.generatePositionKey(position);
        this.position = position;
        this.velocity = velocity;
        this.previousPositions = [];
        this.positionCache = new Map();

        this.previousPositions.push(position);
        this.positionCache.set(this.generatePositionKey(position), 0);
    }

    // Only move if the robot has not been in this position before.
    move(mapBoundary: Coordinate): boolean {
        // Move the robot to the next position
        let nextPosition: Coordinate = {
            x: this.position.x + this.velocity.x,
            y: this.position.y + this.velocity.y
        };

        // Check if the robot is out of bounds
        if (nextPosition.x < 0) {
            nextPosition.x = mapBoundary.x - (Math.abs(nextPosition.x));
        } else if (nextPosition.x >= mapBoundary.x) {
            nextPosition.x = nextPosition.x - mapBoundary.x;
        }

        if (nextPosition.y < 0) {
            nextPosition.y = mapBoundary.y - (Math.abs(nextPosition.y));
        } else if (nextPosition.y >= mapBoundary.y) {
            nextPosition.y = nextPosition.y - mapBoundary.y;
        }


        if (this.positionCache.has(this.generatePositionKey(nextPosition))) {
            // We have been here before...don't need to move anymore
            return false;
        } else {
            this.previousPositions.push(nextPosition);
            this.position = nextPosition;
            this.positionCache.set(this.generatePositionKey(nextPosition), this.previousPositions.length - 1);
            return true;
        }
    }

    moveXTimes(mapBoundary: Coordinate, times: number): void {
        for (let i = 0; i < times; i++) {
            const robotMoved = this.move(mapBoundary);
            if (!robotMoved) {
                return;
            }
        }
    }

    generatePositionKey(coordinate: Coordinate): string {
        return `${coordinate.x},${coordinate.y}`;
    }

    determinePositionAtTime(time: number): Coordinate {
        if (time < this.previousPositions.length) {
            return this.previousPositions[time];
        } else {
            const positionIndex = time % this.previousPositions.length;
            return this.previousPositions[positionIndex];
        }
    }

    determineQuadrantFromCoordinate(coordinate: Coordinate, mapBoundary: Coordinate): number {
        // The map will always be divided into 4 quadrants, but will be an odd length. Ignore the middle row and column
        const middleX = Math.floor(mapBoundary.x / 2);
        const middleY = Math.floor(mapBoundary.y / 2);

        if (coordinate.x === middleX || coordinate.y === middleY) {
            return -1;
        }

        if (coordinate.x < middleX) {
            if (coordinate.y < middleY) {
                return 1;
            } else {
                return 3;
            }
        } else {
            if (coordinate.y < middleY) {
                return 2;
            } else {
                return 4;
            }
        }
    }
}
