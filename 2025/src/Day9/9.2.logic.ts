import { XYCoordinate } from '../utils/interfaces/coordinate';

export class Tile {
    coordinate: XYCoordinate;
    isBorder: boolean;
    color: 'red' | 'green' | 'unknown';

    constructor(coordinate: XYCoordinate, color: 'red' | 'green' | 'unknown') {
        this.coordinate = coordinate;
        this.isBorder = false;
        this.color = color;
    }

    getColor(): 'red' | 'green' | 'unknown' {
        return this.color;
    }
    
    setColor(color: 'red' | 'green' | 'unknown') {
        this.color = color;
    }
}

export class Grid {
    tiles: string[][] = [];
    vertices: XYCoordinate[] = [];
    maxX: number;
    maxY: number;

    constructor(maxX: number, maxY: number, vertices: XYCoordinate[]) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.tiles = [];
        this.vertices = vertices;

        for (let y = 0; y < maxY; y++) {
            const row: string[] = [];
            for (let x = 0; x < maxX; x++) {
                row.push('.')
            }
            this.tiles.push(row);
        }

        this.vertices.forEach((vertex) => {
            this.tiles[vertex.y][vertex.x] = '#';
        });

        //this.connectTiles();
        this.drawBorder(this.vertices);
        // this.paintInterior();
    }

    print(): void {
        let line = '';
        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                line += tile;
            });
            line += '\n';
        });
        console.log(line);
    }

    drawBorder(coordinates: XYCoordinate[]): void {
        for (let i = 0; i < coordinates.length; i++) {
            const coordinate = coordinates[i];

            if (i < coordinates.length - 1) {
                // This is a middle pair of coordinates, draw border to the next one in Green
                this.colorGreenBetweenCoordinates(coordinate, coordinates[i + 1]);
            } else {
                // This is the last tile, draw border to the first one in Green
                this.colorGreenBetweenCoordinates(coordinate, coordinates[0]);
            }
        }        
    }

    colorGreenBetweenCoordinates(coordinate: XYCoordinate, nextCoordinate: XYCoordinate): void {
        if (coordinate.x === nextCoordinate.x) {
            // This is a vertical border
            if (coordinate.y > nextCoordinate.y) {
                // This is a border going up
                for (let y = coordinate.y - 1; y > nextCoordinate.y; y--) {
                    this.tiles[y][coordinate.x] = 'X';
                }
            } else {
                // This is a border doing down
                for (let y = coordinate.y + 1; y < nextCoordinate.y; y++) {
                    this.tiles[y][coordinate.x] = 'X';
                }
            }
        } else {
            // This is a horizontal border                
            if (coordinate.x > nextCoordinate.x) {
                // This is a border going left
                for (let x = coordinate.x - 1; x > nextCoordinate.x; x--) {
                    this.tiles[coordinate.y][x] = 'X';
                }
            } else {
                // This is a border going right
                for (let x = coordinate.x + 1; x < nextCoordinate.x; x++) {
                    this.tiles[coordinate.y][x] = 'X';
                }
            }
        }
    }

    // paintInterior(): void {
    //     this.tiles.forEach((row) => {
    //         row.forEach((tile) => {
    //             if (tile.isBorder) {
    //                 return;
    //             }

    //             const minBorderXInRow = this.tiles[tile.coordinate.y].findIndex((t) => t.isBorder);
    //             const maxBorderXInRow = this.tiles[tile.coordinate.y].length - [...this.tiles[tile.coordinate.y]].reverse().findIndex((t) => t.isBorder);

    //             if ((minBorderXInRow > tile.coordinate.x) || (tile.coordinate.x > maxBorderXInRow)) {
    //                 return;
    //             }

    //             let count = 0;
    //             for (let i = tile.coordinate.x; i < this.maxX; i++) {
    //                 const tileToCheck = this.tiles[tile.coordinate.y][i];
    //                 if (tileToCheck.isBorder) {
    //                     count++;
    //                 }
    //             }

    //             if (count % 2 === 1) {
    //                 tile.setColor('green');
    //             }
    //         });
    //     });
    // }

    isInterior(coordinate: XYCoordinate): boolean {
        // Use ray casting algorithm to determine if the coordinate is inside the polygon
        let intersections = 0;

        console.log(`Checking coordinate ${coordinate.x},${coordinate.y}`);

        for (let i = 0; i < this.vertices.length; i++) {
            const vertex = this.vertices[i];

            console.log(`Checking vertex ${vertex.x},${vertex.y} against coordinate ${coordinate.x},${coordinate.y}`);
            if ((vertex.y === coordinate.y) && (vertex.x >= coordinate.x)) {
                intersections++;
            }
        }

        console.log(`Intersections: ${intersections}`);

        return intersections % 2 === 1;
    }
}