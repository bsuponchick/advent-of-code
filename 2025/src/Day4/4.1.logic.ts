import { Coordinate } from '../utils/interfaces/coordinate';

export class Tile {
    north: Tile | null;
    east: Tile | null;
    south: Tile | null;
    west: Tile | null;
    northEast: Tile | null;
    southWest: Tile | null;
    southEast: Tile | null;
    northWest: Tile | null;
    coordinate: Coordinate;
    type: string;

    constructor(coordinate: Coordinate, type: string) {
        this.north = null;
        this.east = null;
        this.south = null;
        this.west = null;
        this.northEast = null;
        this.southWest = null;
        this.southEast = null;
        this.northWest = null;
        this.coordinate = coordinate;
        this.type = type;
    }

    isEmpty(): boolean {
        return this.type === '.';
    }

    isPaper(): boolean {
        return this.type === '@';
    }

    canForkliftAccess(): boolean {
        const neighbors = [this.north, this.east, this.south, this.west, this.northEast, this.southWest, this.southEast, this.northWest];
        const paperNeighbors = neighbors.filter((neighbor) => neighbor !== null && neighbor.isPaper());
        return this.isPaper() && paperNeighbors.length < 4;
    }
}

export class Grid {
    tiles: Tile[][];

    constructor() {
        this.tiles = [];
    }

    addRow(row: Tile[]): void {
        this.tiles.push(row);
    }

    connectTiles(): void {
        this.tiles.forEach((row, y) => {
            row.forEach((tile, x) => {
                if (y > 0) {
                    tile.north = this.tiles[y - 1][x];
                }

                if (y < this.tiles.length - 1) {
                    tile.south = this.tiles[y + 1][x];
                }

                if (x > 0) {
                    tile.west = this.tiles[y][x - 1];
                }

                if (x < row.length - 1) {
                    tile.east = this.tiles[y][x + 1];
                }
            });
        });

        this.connectDiagonals();
    }

    connectDiagonals(): void {
        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                if (tile.north !== null && tile.east !== null) {
                    tile.northEast = this.tiles[tile.coordinate.y - 1][tile.coordinate.x + 1];
                }

                if (tile.south !== null && tile.west !== null) {
                    tile.southWest = this.tiles[tile.coordinate.y + 1][tile.coordinate.x - 1];
                }

                if (tile.south !== null && tile.east !== null) {
                    tile.southEast = this.tiles[tile.coordinate.y + 1][tile.coordinate.x + 1];
                }

                if (tile.north !== null && tile.west !== null) {
                    tile.northWest = this.tiles[tile.coordinate.y - 1][tile.coordinate.x - 1];
                }
            });
        });
    }

    parse(lines: string[]): void {
        lines.forEach((line, lineIndex) => {
            const row: Tile[] = [];
            line.split('').forEach((char, charIndex) => {
                const coordinate: Coordinate = { x: charIndex, y: lineIndex };
                const tile = new Tile(coordinate, char);
                row.push(tile);
            });

            this.addRow(row);
        });

        this.connectTiles();
    }

    print(): void {
        let line = '';

        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                line += tile.type;
            });

            line += '\n';
        });

        console.log(line);
    }

    printWithForkliftAccess(): void {
        let line = '';

        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                line += tile.canForkliftAccess() ? 'X' : tile.type;
            });

            line += '\n';
        });

        console.log(line);
    }
}