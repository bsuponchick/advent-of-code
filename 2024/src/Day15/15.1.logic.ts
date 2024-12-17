interface Coordinate {
    x: number;
    y: number;
}

export class Robot {
    tile: MapTile;
    debugMode: boolean;
    
    constructor(tile: MapTile, debugMode: boolean = false) {
        this.tile = tile;
        this.debugMode = debugMode;
    }

    move(direction: string): void {
        switch (direction) {
            case '^':
                this.moveNorth();
                break;
            case '>':
                this.moveEast();
                break;
            case 'v':
                this.moveSouth();
                break;
            case '<':
                this.moveWest();
                break;
            default:
                break;
        }
    }

    moveNorth(): void {
        if (this.debugMode) {
            console.log(`Move ^:`);
        }

        if (this.tile.north === null || this.tile.north.isWall()) {
            return;
        } else if (this.tile.north.isEmpty()) {
            this.tile.type = '.';
            this.tile = this.tile.north;
            this.tile.type = '@';
            return;
        } else if (this.tile.north.isBox()) {
            this.tile.north.pushNorth();

            if (this.tile.north.isEmpty()) {
                this.tile.type = '.';
                this.tile = this.tile.north;
                this.tile.type = '@';
            }

            return;
        }
    }

    moveEast(): void {
        if (this.debugMode) {
            console.log(`Move >:`);
        }

        if (this.tile.east === null || this.tile.east.isWall()) {
            return;
        } else if (this.tile.east.isEmpty()) {
            this.tile.type = '.';
            this.tile = this.tile.east;
            this.tile.type = '@';
            return;
        } else if (this.tile.east.isBox()) {
            this.tile.east.pushEast();

            if (this.tile.east.isEmpty()) {
                this.tile.type = '.';
                this.tile = this.tile.east;
                this.tile.type = '@';
            }

            return;
        }
    }

    moveSouth(): void {
        if (this.debugMode) {
            console.log(`Move v:`);
        }

        if (this.tile.south === null || this.tile.south.isWall()) {
            return;
        } else if (this.tile.south.isEmpty()) {
            this.tile.type = '.';
            this.tile = this.tile.south;
            this.tile.type = '@';
            return;
        } else if (this.tile.south.isBox()) {
            this.tile.south.pushSouth();

            if (this.tile.south.isEmpty()) {
                this.tile.type = '.';
                this.tile = this.tile.south;
                this.tile.type = '@';
            }
            
            return;
        }
    }

    moveWest(): void {
        if (this.debugMode) {
            console.log(`Move <:`);
        }
        
        if (this.tile.west === null || this.tile.west.isWall()) {
            return;
        } else if (this.tile.west.isEmpty()) {
            this.tile.type = '.';
            this.tile = this.tile.west;
            this.tile.type = '@';
            return;
        } else if (this.tile.west.isBox()) {
            this.tile.west.pushWest();

            if (this.tile.west.isEmpty()) {
                this.tile.type = '.';
                this.tile = this.tile.west;
                this.tile.type = '@';
            }

            return;
        }
    }
}

export class MapTile {
    coordinate: Coordinate;
    type: string;
    north: MapTile | null;
    east: MapTile | null;
    south: MapTile | null;
    west: MapTile | null;

    constructor(coordinate: Coordinate, type: string) {
        this.coordinate = coordinate;
        this.type = type;
        this.north = null;
        this.east = null;
        this.south = null;
        this.west = null;
    }

    isWall(): boolean {
        return this.type === '#';
    }

    isBox(): boolean {
        return this.type === 'O';
    }

    isEmpty(): boolean {
        return this.type === '.';
    }

    isRobot(): boolean {
        return this.type === '@';
    }

    calculateGPSCoordinate(): number {
        let gps = 0;

        if (this.isBox()) {
            return this.coordinate.y * 100 + this.coordinate.x;
        }

        return gps;
    }

    pushNorth(): void {
        if (this.north === null || this.north.isWall()) {
            return;
        }

        if (this.north.isEmpty()) {
            this.north.type = 'O';
            this.type = '.';
            return;
        }

        this.north.pushNorth();

        if (this.north.isEmpty()) {
            this.north.type = 'O';
            this.type = '.';
        }
    }

    pushEast(): void {
        if (this.east === null || this.east.isWall()) {
            return;
        }

        if (this.east.isEmpty()) {
            this.east.type = 'O';
            this.type = '.';
            return;
        }

        this.east.pushEast();

        if (this.east.isEmpty()) {
            this.east.type = 'O';
            this.type = '.';
        }
    }

    pushSouth(): void {
        if (this.south === null || this.south.isWall()) {
            return;
        }

        if (this.south.isEmpty()) {
            this.south.type = 'O';
            this.type = '.';
            return;
        }

        this.south.pushSouth();

        if (this.south.isEmpty()) {
            this.south.type = 'O';
            this.type = '.';
        }
    }

    pushWest(): void {
        if (this.west === null || this.west.isWall()) {
            return;
        }

        if (this.west.isEmpty()) {
            this.west.type = 'O';
            this.type = '.';
            return;
        }

        this.west.pushWest();

        if (this.west.isEmpty()) {
            this.west.type = 'O';
            this.type = '.';
        }
    }
}

export class WarehouseMap {
    tiles: MapTile[][];

    constructor() {
        this.tiles = [];
    }

    generateRobot(debugMode: boolean): Robot {
        let robotTile: MapTile | null = null;

        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                if (tile.isRobot()) {
                    robotTile = tile;
                }
            });
        });

        if (robotTile === null) {
            throw new Error('No robot found in warehouse map.');
        }

        return new Robot(robotTile, debugMode);
    }

    addRow(row: MapTile[]): void {
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
    }

    parse(lines: string[]): void {
        lines.forEach((line, lineIndex) => {
            const row: MapTile[] = [];
            line.split('').forEach((char, charIndex) => {
                const coordinate: Coordinate = { x: charIndex, y: lineIndex };
                const tile = new MapTile(coordinate, char);
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
}