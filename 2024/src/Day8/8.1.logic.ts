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

    getAntiNodeCoordinates (otherNode: Node): Coordinate[] {
        const antiNodeCoordinates: Coordinate[] = [];

        let diffX = Math.abs(this.coordinate.x - otherNode.coordinate.x);
        let diffY = Math.abs(this.coordinate.y - otherNode.coordinate.y);

        if (this.coordinate.x < otherNode.coordinate.x) {
            if (this.coordinate.y < otherNode.coordinate.y) {
                // Top left to lower right
                antiNodeCoordinates.push({
                    x: this.coordinate.x - diffX,
                    y: this.coordinate.y - diffY
                });

                antiNodeCoordinates.push({
                    x: otherNode.coordinate.x + diffX,
                    y: otherNode.coordinate.y + diffY
                });
            } else if (this.coordinate.y > otherNode.coordinate.y) {
                // Lower left to top right
                antiNodeCoordinates.push({
                    x: this.coordinate.x - diffX,
                    y: this.coordinate.y + diffY
                });

                antiNodeCoordinates.push({
                    x: otherNode.coordinate.x + diffX,
                    y: otherNode.coordinate.y - diffY
                });
            } else {
                // Left to right
                antiNodeCoordinates.push({
                    x: this.coordinate.x - diffX,
                    y: this.coordinate.y
                });

                antiNodeCoordinates.push({
                    x: otherNode.coordinate.x + diffX,
                    y: otherNode.coordinate.y
                });
            }
        } else if (this.coordinate.x > otherNode.coordinate.x) {
            if (this.coordinate.y < otherNode.coordinate.y) {
                // Top right to lower left
                antiNodeCoordinates.push({
                    x: this.coordinate.x + diffX,
                    y: this.coordinate.y - diffY
                });

                antiNodeCoordinates.push({
                    x: otherNode.coordinate.x - diffX,
                    y: otherNode.coordinate.y + diffY
                });
            } else if (this.coordinate.y > otherNode.coordinate.y) {
                // Lower right to top left
                antiNodeCoordinates.push({
                    x: this.coordinate.x + diffX,
                    y: this.coordinate.y + diffY
                });

                antiNodeCoordinates.push({
                    x: otherNode.coordinate.x - diffX,
                    y: otherNode.coordinate.y - diffY
                });
            } else {
                // Right to left
                antiNodeCoordinates.push({
                    x: this.coordinate.x + diffX,
                    y: this.coordinate.y
                });

                antiNodeCoordinates.push({
                    x: otherNode.coordinate.x - diffX,
                    y: otherNode.coordinate.y
                });
            }
        } else {
            if (this.coordinate.y < otherNode.coordinate.y) {
                // Top to bottom
                antiNodeCoordinates.push({
                    x: this.coordinate.x,
                    y: this.coordinate.y - diffY
                });

                antiNodeCoordinates.push({
                    x: otherNode.coordinate.x,
                    y: otherNode.coordinate.y + diffY
                });
            } else if (this.coordinate.y > otherNode.coordinate.y) {
                // Bottom to top
                antiNodeCoordinates.push({
                    x: this.coordinate.x,
                    y: this.coordinate.y + diffY
                });

                antiNodeCoordinates.push({
                    x: otherNode.coordinate.x,
                    y: otherNode.coordinate.y - diffY
                });
            } else {
                // Same coordinates
            }
        }

        return antiNodeCoordinates
    }
}