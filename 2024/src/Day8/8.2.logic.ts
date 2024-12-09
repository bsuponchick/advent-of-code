interface Coordinate {
    x: number;
    y: number;
}

export class Node {
    symbol: string;
    antiNodes: string[];
    coordinate: Coordinate;

    constructor (symbol: string, coordinate: Coordinate) {
        this.symbol = symbol;
        this.coordinate = coordinate;
        this.antiNodes = [];
    }

    addAntiNode (node: string) {
        if (!this.antiNodes.includes(node)) {
            this.antiNodes.push(node);
        }
    }

    hasAntiNode (): boolean {
        return this.antiNodes.length > 0;
    }

    getAntiNodeCoordinates (otherNode: Node, bottomRightCoordinate: Coordinate): Coordinate[] {
        const antiNodeCoordinates: Coordinate[] = [];

        let diffX = Math.abs(this.coordinate.x - otherNode.coordinate.x);
        let diffY = Math.abs(this.coordinate.y - otherNode.coordinate.y);

        if (this.coordinate.x < otherNode.coordinate.x) {
            if (this.coordinate.y < otherNode.coordinate.y) {
                // Top left to lower right
                let newX = this.coordinate.x;
                let newY = this.coordinate.y;

                while (newX >= 0 && newY >= 0) {
                    newX = newX - diffX;
                    newY = newY - diffY;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }

                newX = otherNode.coordinate.x;
                newY = otherNode.coordinate.y;

                while (newX <= bottomRightCoordinate.x && newY <= bottomRightCoordinate.y) {
                    newX = newX + diffX;
                    newY = newY + diffY;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }
            } else if (this.coordinate.y > otherNode.coordinate.y) {
                // Lower left to top right
                let newX = this.coordinate.x;
                let newY = this.coordinate.y;

                while (newX >= 0 && newY <= bottomRightCoordinate.y) {
                    newX = newX - diffX;
                    newY = newY + diffY;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }

                newX = otherNode.coordinate.x;
                newY = otherNode.coordinate.y;

                while (newX <= bottomRightCoordinate.x && newY >= 0) {
                    newX = newX + diffX;
                    newY = newY - diffY;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }
            } else {
                // Left to right

                let newX = this.coordinate.x;
                let newY = this.coordinate.y;

                while (newX >= 0) {
                    newX = newX - diffX;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }

                newX = otherNode.coordinate.x;
                newY = otherNode.coordinate.y;

                while (newX <= bottomRightCoordinate.x) {
                    newX = newX + diffX;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }
            }
        } else if (this.coordinate.x > otherNode.coordinate.x) {
            if (this.coordinate.y < otherNode.coordinate.y) {
                // Top right to lower left
                let newX = this.coordinate.x;
                let newY = this.coordinate.y;

                while (newX <= bottomRightCoordinate.x && newY >= 0) {
                    newX = newX + diffX;
                    newY = newY - diffY;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }

                newX = otherNode.coordinate.x;
                newY = otherNode.coordinate.y;

                while (newX >= 0 && newY <= bottomRightCoordinate.y) {
                    newX = newX - diffX;
                    newY = newY + diffY;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }
            } else if (this.coordinate.y > otherNode.coordinate.y) {
                // Lower right to top left
                let newX = this.coordinate.x;
                let newY = this.coordinate.y;

                while (newX <= bottomRightCoordinate.x && newY <= bottomRightCoordinate.y) {
                    newX = newX + diffX;
                    newY = newY + diffY;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }

                newX = otherNode.coordinate.x;
                newY = otherNode.coordinate.y;

                while (newX >= 0 && newY >= 0) {
                    newX = newX - diffX;
                    newY = newY - diffY;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }
            } else {
                // Right to left
                let newX = this.coordinate.x;
                let newY = this.coordinate.y;

                while (newX <= bottomRightCoordinate.x) {
                    newX = newX + diffX;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }

                newX = otherNode.coordinate.x;
                newY = otherNode.coordinate.y;

                while (newX >= 0) {
                    newX = newX - diffX;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }
            }
        } else {
            if (this.coordinate.y < otherNode.coordinate.y) {
                // Top to bottom
                let newX = this.coordinate.x;
                let newY = this.coordinate.y;

                while (newY >= 0) {
                    newY = newY - diffY;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }

                newY = otherNode.coordinate.y;

                while (newY <= bottomRightCoordinate.y) {
                    newY = newY + diffY;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }
            } else if (this.coordinate.y > otherNode.coordinate.y) {
                // Bottom to top
                let newX = this.coordinate.x;
                let newY = this.coordinate.y;

                while (newY <= bottomRightCoordinate.y) {
                    newY = newY + diffY;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }

                newY = otherNode.coordinate.y;

                while (newY >= 0) {
                    newY = newY - diffY;

                    antiNodeCoordinates.push({
                        x: newX,
                        y: newY
                    });
                }
            } else {
                // Same coordinates
            }
        }

        return antiNodeCoordinates
    }
}