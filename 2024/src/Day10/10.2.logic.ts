export class Tile {
    north: Tile | null;
    east: Tile | null;
    south: Tile | null;
    west: Tile | null;
    
    elevation: number;

    beenNorth: boolean;
    beenEast: boolean;
    beenSouth: boolean;
    beenWest: boolean;

    visited: boolean;
    timesVisited: number;

    constructor (elevation: number) {
        this.elevation = elevation;
        this.north = null;
        this.east = null;
        this.south = null;
        this.west = null;
        this.beenNorth = false;
        this.beenEast = false;
        this.beenSouth = false;
        this.beenWest = false;
        this.visited = false;
        this.timesVisited = 0;
    }

    setNorth (tile: Tile) {
        this.north = tile;
    }

    setEast (tile: Tile) {
        this.east = tile;
    }

    setSouth (tile: Tile) {
        this.south = tile;
    }

    setWest (tile: Tile) {
        this.west = tile;
    }

    canMoveNorth (): boolean {
        return this.north !== null && (this.north.elevation - this.elevation === 1);
    }

    canMoveEast (): boolean {
        return this.east !== null && (this.east.elevation - this.elevation === 1);
    }

    canMoveSouth (): boolean {
        return this.south !== null && (this.south.elevation - this.elevation === 1);
    }

    canMoveWest (): boolean {
        return this.west !== null && (this.west.elevation - this.elevation === 1);
    }

    hasBeenNorth (): boolean {
        return this.beenNorth;
    }

    hasBeenEast (): boolean {
        return this.beenEast;
    }

    hasBeenSouth (): boolean {
        return this.beenSouth;
    }

    hasBeenWest (): boolean {
        return this.beenWest;
    }

    markBeenNorth (): void {
        this.beenNorth = true;
    }

    markBeenEast (): void {
        this.beenEast = true;
    }

    markBeenSouth (): void {
        this.beenSouth = true;
    }

    markBeenWest (): void {
        this.beenWest = true;
    }

    visit (): void {
        this.visited = true;
        this.timesVisited++;
    }

    isTrailhead (): boolean {
        return this.elevation === 0;
    }

    isSummit (): boolean {
        return this.elevation === 9;
    }

    reset (): void {
        this.beenNorth = false;
        this.beenEast = false;
        this.beenSouth = false;
        this.beenWest = false;
        this.visited = false;
        this.timesVisited = 0;
    }
}

export class Hiker {
    startingTile: Tile;
    currentTile: Tile;
    trail: Tile[];
    debug: boolean;

    constructor (startingTile: Tile, params?: { debug: boolean }) {
        this.startingTile = startingTile;
        this.currentTile = startingTile;
        this.debug = params? params.debug : false;
        this.trail = [];
    }

    hike (): void {
        this.currentTile.visit();
        this.trail.push(this.currentTile);
        this.takeNextStep();
    }

    takeNextStep (): void {
        if (this.currentTile) {
            if (this.debug) {
                console.log(`Current tile is at ${this.currentTile.elevation}...`);
            }
            
            if (this.atSummit()) {
                if (this.debug) {
                    console.log(`We've reached the summit!`);
                }

                // We've hit a goal, pop this tile and backtrack
                this.trail.pop();
                this.backtrack();
            }

            if (this.canMoveNorth()) {
                if (this.debug) {
                    console.log(`Moving north...`);
                }

                this.moveNorth();
                this.takeNextStep();
            } else if (this.canMoveEast()) {
                if (this.debug) {
                    console.log(`Moving east...`);
                }

                this.moveEast();
                this.takeNextStep();
            } else if (this.canMoveSouth()) {
                if (this.debug) {
                    console.log(`Moving south...`);
                }

                this.moveSouth();
                this.takeNextStep();
            } else if (this.canMoveWest()) {
                if (this.debug) {
                    console.log(`Moving west...`);
                }

                this.moveWest();
                this.takeNextStep();
            } else {
                if (this.debug) {
                    console.log(`No more moves...`);
                }
                
                // We've hit a dead end, pop this tile and backtrack
                if (this.trail.length > 1) {
                    // Allow re-entry to the last tile from another direction...
                    let lastTile = this.trail.pop();
                    lastTile.reset();
                    
                    this.backtrack();
                } else {
                    // We're done
                    return;
                }
            }
        }
    }

    canMoveNorth (): boolean {
        return this.currentTile.canMoveNorth() && !this.currentTile.hasBeenNorth();
    }

    canMoveEast (): boolean {
        return this.currentTile.canMoveEast() && !this.currentTile.hasBeenEast();
    }

    canMoveSouth (): boolean {
        return this.currentTile.canMoveSouth() && !this.currentTile.hasBeenSouth();
    }

    canMoveWest (): boolean {
        return this.currentTile.canMoveWest() && !this.currentTile.hasBeenWest();
    }

    moveNorth (): void {
        this.currentTile.markBeenNorth();
        this.currentTile = this.currentTile.north;
        this.currentTile.visit();
        this.trail.push(this.currentTile);
    }

    moveEast (): void {
        this.currentTile.markBeenEast();
        this.currentTile = this.currentTile.east;
        this.currentTile.visit();
        this.trail.push(this.currentTile);
    }

    moveSouth (): void {
        this.currentTile.markBeenSouth();
        this.currentTile = this.currentTile.south;
        this.currentTile.visit();
        this.trail.push(this.currentTile);
    }

    moveWest (): void {
        this.currentTile.markBeenWest();
        this.currentTile = this.currentTile.west;
        this.currentTile.visit();
        this.trail.push(this.currentTile);
    }

    atSummit (): boolean {
        return this.currentTile.isSummit();
    }

    backtrack (): void {
        let previousTile = this.trail[this.trail.length - 1];
        this.currentTile = previousTile;
        this.takeNextStep();
    }
}

export class HikingMap {
    tiles: Tile[][];

    constructor () {
        this.tiles = [];
    }

    addRow (row: Tile[]): void {
        this.tiles.push(row);
    }

    connectTiles (): void {
        this.tiles.forEach((row, rowIndex) => {
            row.forEach((tile, tileIndex) => {
                if (rowIndex > 0) {
                    tile.setNorth(this.tiles[rowIndex - 1][tileIndex]);
                }

                if (tileIndex < row.length - 1) {
                    tile.setEast(row[tileIndex + 1]);
                }

                if (rowIndex < this.tiles.length - 1) {
                    tile.setSouth(this.tiles[rowIndex + 1][tileIndex]);
                }

                if (tileIndex > 0) {
                    tile.setWest(row[tileIndex - 1]);
                }
            });
        });
    }

    reset (): void {
        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                tile.reset();
            });
        });
    }

    print(): void {
        this.tiles.forEach((row) => {
            let line = '';
            row.forEach((tile) => {
                line += `${tile.elevation}`;
            });
            console.log(`${line}`);
        });
    }

    calculateScore (): number {
        let score = 0;

        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                if (tile.isSummit() && tile.visited) {
                    score+= tile.timesVisited;
                }
            });
        });

        return score;
    }
}