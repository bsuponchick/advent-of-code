export class Tile {
    value: string;
    north: Tile | null;
    east: Tile | null;
    south: Tile | null;
    west: Tile | null;
    hasSplit: boolean;

    constructor(value: string) {
        this.value = value;
        this.north = null;
        this.east = null;
        this.south = null;
        this.west = null;
        this.hasSplit = false;
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
}

export class TachyonManifold {
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

    simulate(): number {
        const iterations = this.tiles.length;
        let countOfSplits = 0;

        for (let i = 0; i < iterations; i++) {
            // Start by making the tile south of the start tile a tachyon
            if (this.start !== null && this.start.south !== null && this.start.south.isEmpty()) {
                this.start.south.makeTachyon();
                this.tachyons.push(this.start.south);
            }

            // Then we continue to propagate the tachyons south
            this.tachyons.forEach((tachyon) => {
                if (tachyon.south !== null && tachyon.south.isEmpty()) {
                    tachyon.south.makeTachyon();
                    this.tachyons.push(tachyon.south);
                }
            });

            // Then we split the splitters
            this.splitters.forEach((splitter) => {
                if (splitter.getNorth() !== null && splitter.north.isTachyon()) {
                    if (!splitter.hasSplit) {
                        splitter.split();
                        if (splitter.getWest() !== null && splitter.west.isTachyon()) {
                            this.tachyons.push(splitter.west);
                        }
                        if (splitter.getEast() !== null && splitter.east.isTachyon()) {
                            this.tachyons.push(splitter.east);
                        }

                        countOfSplits++;
                    }
                }
            });

            // Print the current state of the manifold
            console.log(`Iteration ${i}:`);
            this.print();
        }

        return countOfSplits;
    }
}   