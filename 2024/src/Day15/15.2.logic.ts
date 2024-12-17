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

    constructor(type: string) {
        this.coordinate = null;
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
        return this.type === '[' || this.type === ']';
    }

    isEmpty(): boolean {
        return this.type === '.';
    }

    isRobot(): boolean {
        return this.type === '@';
    }

    setCoordinate(coordinate: Coordinate): void {
        this.coordinate = coordinate;
    }

    calculateGPSCoordinate(): number {
        let gps = 0;

        if (this.isBox() && this.type === '[') {
            return this.coordinate.y * 100 + this.coordinate.x;
        }

        return gps;
    }

    canPushNorth(): boolean {
        if (this.north === null || this.north.isWall()) {
            return false;
        }

        if (this.north.isEmpty()) {
            return true;
        }

        return this.north.canPushNorth();
    }

    canPushEast(): boolean {
        if (this.east === null || this.east.isWall()) {
            return false;
        }

        if (this.east.isEmpty()) {
            return true;
        }

        return this.east.canPushEast();
    }

    canPushSouth(): boolean {
        if (this.south === null || this.south.isWall()) {
            return false;
        }

        if (this.south.isEmpty()) {
            return true;
        }

        return this.south.canPushSouth();
    }

    canPushWest(): boolean {
        if (this.west === null || this.west.isWall()) {
            return false;
        }

        if (this.west.isEmpty()) {
            return true;
        }

        return this.west.canPushWest();
    }

    pushNorth(): void {
        if (!this.canPushNorth()) {
            return;
        }

        if (this.type === '[') {
            // Need to be able to push both this tile and the tile to the right of it
            if (!this.canPushNorth() || !this.east.canPushNorth()) {
                return;
            }

            // Both tiles can be pushed...
            if (this.north.isEmpty() && this.east.north.isEmpty()) {
                this.north.type = '[';
                this.east.north.type = ']';
                this.type = '.';
                this.east.type = '.';
                return;
            }

            this.north.pushNorth();
            this.north.east.pushNorth();

            if (this.north.isEmpty() && this.east.north.isEmpty()) {
                this.north.type = '[';
                this.east.north.type = ']';
                this.type = '.';
                this.east.type = '.';
            }
        } else if (this.type === ']') {
            if (!this.canPushNorth() || !this.west.canPushNorth()) {
                return;
            }

            // We're only going to worry about pushing the left tile, so pass the buck to the left tile
            this.west.pushNorth();
        }
    }

    pushEast(): void {
        if (this.type === '[') {
            // We're only going to worry about pushing the right tile, so pass the buck to the right tile
            this.east.pushEast();
        } else if (this.type === ']') {
            if (!this.canPushEast()) {
                return;
            }

            if (this.east.isEmpty()) {
                this.east.type = ']';
                this.type = '[';
                this.west.type = '.';
                return;
            }

            this.east.pushEast();

            if (this.east.isEmpty()) {
                this.east.type = ']';
                this.type = '[';
                this.west.type = '.';
            }
        } 
    }

    pushSouth(): void {
        if (!this.canPushSouth()) {
            return;
        }

        if (this.type === '[') {
            // Need to be able to push both this tile and the tile to the right of it
            if (!this.canPushSouth() || !this.east.canPushSouth()) {
                return;
            }

            // Both tiles can be pushed...
            if (this.south.isEmpty() && this.east.south.isEmpty()) {
                this.south.type = '[';
                this.east.south.type = ']';
                this.type = '.';
                this.east.type = '.';
                return;
            }

            this.south.pushSouth();
            this.south.east.pushSouth();

            if (this.south.isEmpty() && this.east.south.isEmpty()) {
                this.south.type = '[';
                this.east.south.type = ']';
                this.type = '.';
                this.east.type = '.';
            }
        } else if (this.type === ']') {
            if (!this.canPushSouth() || !this.west.canPushSouth()) {
                return;
            }
            
            // We're only going to worry about pushing the left tile, so pass the buck to the left tile
            this.west.pushSouth();
        }
    }

    pushWest(): void {
        if (this.type === ']') {
            // We're only going to worry about pushing the left tile, so pass the buck to the left tile
            this.west.pushWest();
        } else if (this.type === '[') {
            if (!this.canPushWest()) {
                return;
            }

            if (this.west.isEmpty()) {
                this.west.type = '[';
                this.type = ']';
                this.east.type = '.';
                return;
            }

            this.west.pushWest();

            if (this.west.isEmpty()) {
                this.west.type = '[';
                this.type = ']';
                this.east.type = '.';
            }
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
                tile.setCoordinate({ x, y });

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
        lines.forEach((line) => {
            const row: MapTile[] = [];
            line.split('').forEach((char) => {
                if (char === '@') {
                    const tile1 = new MapTile(char);
                    const tile2 = new MapTile('.');
                    
                    row.push(tile1);
                    row.push(tile2);
                } else if (char === '#') {
                    const tile1 = new MapTile(char);
                    const tile2 = new MapTile(char);
                    
                    row.push(tile1);
                    row.push(tile2);
                } else if (char === '.') {
                    const tile1 = new MapTile(char);
                    const tile2 = new MapTile(char);
                    
                    row.push(tile1);
                    row.push(tile2);
                } else {
                    const tile1 = new MapTile('[');
                    const tile2 = new MapTile(']');
                    
                    row.push(tile1);
                    row.push(tile2);
                }
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

    detectAnomalies(): void {
        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                if (tile.type === '[' && tile.east.type !== ']') {
                    console.log(`Anomaly detected at ${tile.coordinate.x}, ${tile.coordinate.y}`);
                    this.print();
                    throw new Error(`Anomaly detected at ${tile.coordinate.x}, ${tile.coordinate.y}`);
                }
            });
        });

    }
}