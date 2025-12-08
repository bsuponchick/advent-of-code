export class Tile {
    value: string;
    north: Tile | null;
    east: Tile | null;
    south: Tile | null;
    west: Tile | null;
    hasSplit: boolean;
    visitedLeft: boolean;
    visitedRight: boolean;

    constructor(value: string) {
        this.value = value;
        this.north = null;
        this.east = null;
        this.south = null;
        this.west = null;
        this.hasSplit = false;
        this.visitedLeft = false;
        this.visitedRight = false;
    }

    setNorth(tile: Tile) {
        this.north = tile;
    }

    setEast(tile: Tile) {
        this.east = tile;
    }
    
    setSouth(tile: Tile) {
        this.south = tile;
    }

    setWest(tile: Tile) {
        this.west = tile;
    }

    getNorth(): Tile | null {
        return this.north;
    }

    getEast(): Tile | null {
        return this.east;
    }

    getSouth(): Tile | null {
        return this.south;
    }
    
    getWest(): Tile | null {
        return this.west;
    }

    isEmpty(): boolean {
        return this.value === '.';
    }
    
    isSplitter(): boolean {
        return this.value === '^';
    }

    isTachyon(): boolean {
        return this.value === '|';
    }

    isStart(): boolean {
        return this.value === 'S';
    }

    makeTachyon(): void {
        this.value = '|';
    }

    split(): void {
        if (!this.hasSplit) {
            if (this.getWest() !== null && this.west.isEmpty()) {
                this.getWest().makeTachyon();
            }

            if (this.getEast() !== null && this.east.isEmpty()) {
                this.getEast().makeTachyon();
            }
            this.hasSplit = true;
        }
    }

    visitLeft(): void {
        this.visitedLeft = true;
    }

    hasVisitedLeft(): boolean {
        return this.visitedLeft;
    }

    visitRight(): void {
        this.visitedRight = true;
    }

    hasVisitedRight(): boolean {
        return this.visitedRight;
    }

    clearVisits(): void {
        this.visitedLeft = false;
        this.visitedRight = false;
    }
}

export class QuantumTachyonManifold {
    tiles: Tile[][];
    start: Tile | null;
    splitters: Tile[];
    tachyons: Tile[];

    constructor() {
        this.tiles = [];
        this.start = null;
        this.splitters = [];
        this.tachyons = [];
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
    }

    parse(lines: string[]): void {
        lines.forEach((line) => {
            const row: Tile[] = [];
            line.split('').forEach((char) => {
                const tile = new Tile(char);
                row.push(tile);

                if (tile.isStart()) {
                    this.start = tile;
                }

                if (tile.isSplitter()) {
                    this.splitters.push(tile);
                }
            });
            this.addRow(row);
        });
    }

    print(): void {
        let line = '';

        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                line += tile.value;
            });

            line += '\n';
        });

        console.log(line);
    }

    printPath(path: Tile[]): void {
        let line = '';

        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                if (tile.isSplitter()) {
                    line += tile.value;
                } else if (path.includes(tile)) {
                    line += 'X';
                } else {
                    line += tile.value;
                }
            });
            line += '\n';
        });

        console.log(line);
    }

    simulate(): number {
        let countOfPossiblePaths = 0;
        const path: Tile[] = [this.start, this.start.getSouth()];
        let currentTile = this.start.getSouth();

        while (currentTile !== this.start) {
            if (currentTile.isEmpty()) {
                if (currentTile.getSouth() === null) {
                    // This is a goal state
                    countOfPossiblePaths++;
                    console.log(`Reached a goal state, count of possible paths: ${countOfPossiblePaths}`);

                    this.printPath(path);

                    // Navigate back up until you hit a splitter

                    while (!currentTile.isSplitter() && !currentTile.isStart()) {
                        currentTile = path.pop();
                    }
                } else {
                    // console.log(`Going south`);
                    path.push(currentTile.getSouth());
                    currentTile = currentTile.getSouth();
                }
            } else if (currentTile.isSplitter()) {
                // There's a splitter on the current tile
                // console.log(`There's a splitter on the current tile`);
                if (currentTile.getWest() !== null && !currentTile.hasVisitedLeft()) {
                    // console.log(`Going left`);
                    currentTile.visitLeft();
                    path.push(currentTile.getWest());
                    currentTile = currentTile.getWest();
                } else if (currentTile.getEast() !== null && !currentTile.hasVisitedRight()) {
                    // console.log(`Going right`);
                    currentTile.visitRight();
                    path.push(currentTile.getEast());
                    currentTile = currentTile.getEast();
                } else {
                    // console.log(`Been both ways, going back`);
                    currentTile.clearVisits();
                    currentTile = path.pop();
                }
            }
        }

        return countOfPossiblePaths;
    }
}