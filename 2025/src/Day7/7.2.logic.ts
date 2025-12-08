export class Tile {
    id: number;
    value: string;
    north: Tile | null;
    east: Tile | null;
    south: Tile | null;
    west: Tile | null;
    hasSplit: boolean;

    constructor(id: number,value: string) {
        this.id = id;
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

export class QuantumTachyonManifold {
    tiles: Tile[][];
    start: Tile | null;
    splitters: Tile[];
    tachyons: Tile[];
    cache: Map<number, number>;

    constructor() {
        this.tiles = [];
        this.start = null;
        this.cache = new Map<number, number>();
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
        let index = 0;
        lines.forEach((line) => {
            const row: Tile[] = [];
            line.split('').forEach((char) => {
                const tile = new Tile(index, char);
                index++;
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
        return this.getCountOfPossiblePaths(this.start.getSouth());
    }

    getCountOfPossiblePaths(tile: Tile): number { 
        if (this.cache.has(tile.id)) {
            return this.cache.get(tile.id);
        }

        if (tile.isEmpty()) {
            let nextTile = tile.getSouth();

            if (nextTile === null) {
                this.cache.set(tile.id, 1);

                return 1;
            }

            const count = this.getCountOfPossiblePaths(nextTile);
            
            this.cache.set(tile.id, count);
            return count;
        } else if (tile.isSplitter()) {
            if (this.cache.has(tile.id)) {
                return this.cache.get(tile.id);
            }

            const leftCount = this.cache.get(tile.getWest().id) ? this.cache.get(tile.getWest().id) : this.getCountOfPossiblePaths(tile.getWest());
            const rightCount = this.cache.get(tile.getEast().id) ? this.cache.get(tile.getEast().id) : this.getCountOfPossiblePaths(tile.getEast());
            
            this.cache.set(tile.id, leftCount + rightCount);
            
            return leftCount + rightCount;
        }
    }
}