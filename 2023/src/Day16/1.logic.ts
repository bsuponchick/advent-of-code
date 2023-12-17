import { v4 as uuidv4 } from 'uuid';

export class Tile {
    id: string = '';
    symbol: string = '';
    beams: Beam[] = [];
    north: Tile | null = null;
    east: Tile | null = null;
    south: Tile | null = null;
    west: Tile | null = null;
    energized: boolean = false;
    beamCache: string[] = [];

    constructor(symbol: string) {
        this.id = uuidv4();
        this.symbol = symbol;
    }

    addBeam(beam: Beam) {
        if (this.beamCache.indexOf(beam.direction) === -1) {
            this.beamCache.push(beam.direction);

            this.beams.push(beam);
            beam.setTile(this);
            this.energized = true;
        }
    }

    removeBeam(beam: Beam) {
        this.beams = this.beams.filter((b) => b.id !== beam.id);
    }

    isEnergized() {
        return this.energized;
    }

    reset() {
        this.beams = [];
        this.energized = false;
        this.beamCache = [];
    }
}

export class Beam {
    id: string = '';
    direction: string = '';
    tile: Tile | null = null;

    constructor(direction: string) {
        this.id = uuidv4();
        this.direction = direction;
    }

    setTile(tile: Tile) {
        this.tile = tile;

        if (this.tile !== null) {
            if (this.direction === 'north') {
                if (tile.symbol === '/') {
                    this.direction = 'east';
                } else if (tile.symbol === '\\') {
                    this.direction = 'west';
                } else if (tile.symbol === '-') {
                    this.direction = 'east';
                    this.tile.addBeam(new Beam('west'));
                }
            } else if (this.direction === 'east') {
                if (tile.symbol === '/') {
                    this.direction = 'north';
                } else if (tile.symbol === '\\') {
                    this.direction = 'south';
                } else if (tile.symbol === '|') {
                    this.direction = 'north';
                    this.tile.addBeam(new Beam('south'));
                }
            } else if (this.direction === 'south') {
                if (tile.symbol === '/') {
                    this.direction = 'west';
                } else if (tile.symbol === '\\') {
                    this.direction = 'east';
                } else if (tile.symbol === '-') {
                    this.direction = 'west';
                    this.tile.addBeam(new Beam('east'));
                }
            } else if (this.direction === 'west') {
                if (tile.symbol === '/') {
                    this.direction = 'south';
                } else if (tile.symbol === '\\') {
                    this.direction = 'north';
                } else if (tile.symbol === '|') {
                    this.direction = 'south';
                    this.tile.addBeam(new Beam('north'));
                }
            }
        }
    }

    move() {
        if (this.tile !== null) {
            if (this.direction === 'north') {
                if (this.tile.north !== null) {
                    const target = this.tile.north;
                    this.tile.removeBeam(this);
                    target.addBeam(this);
                } else {
                    // console.log(`Removing beam ${this.id} from tile ${this.tile.id}`);
                    this.tile.removeBeam(this);
                }
            } else if (this.direction === 'east') {
                if (this.tile.east !== null) {
                    const target = this.tile.east;
                    this.tile.removeBeam(this);
                    target.addBeam(this);                    
                } else {
                    // console.log(`Removing beam ${this.id} from tile ${this.tile.id}`);
                    this.tile.removeBeam(this);
                }
            } else if (this.direction === 'south') {
                if (this.tile.south !== null) {
                    const target = this.tile.south;
                    this.tile.removeBeam(this);
                    target.addBeam(this);
                } else {
                    // console.log(`Removing beam ${this.id} from tile ${this.tile.id}`);
                    this.tile.removeBeam(this);
                }
            } else if (this.direction === 'west') {
                if (this.tile.west !== null) {
                    const target = this.tile.west;
                    this.tile.removeBeam(this);
                    target.addBeam(this);
                } else {
                    // console.log(`Removing beam ${this.id} from tile ${this.tile.id}`);
                    this.tile.removeBeam(this);
                }
            }
        }
    }
}

export const parseMap = (map: string[]): Tile[][] => {
    const result: Tile[][] = [];

    map.forEach((row) => {
        const tiles: Tile[] = [];

        row.split('').forEach((value) => {
            tiles.push(new Tile(value));
        });

        result.push(tiles);
    });

    establishConnections(result);

    return result;
};

export const establishConnections = (map: Tile[][]) => {
    map.forEach((row, rowIndex) => {
        row.forEach((tile, columnIndex) => {
            if (rowIndex > 0) {
                const neighbor = map[rowIndex - 1][columnIndex];
                tile.north = neighbor;
            }

            if (columnIndex > 0) {
                const neighbor = row[columnIndex - 1];
                tile.west = neighbor;
            }

            if (rowIndex < map.length - 1) {
                const neighbor = map[rowIndex + 1][columnIndex];
                tile.south = neighbor;
            }

            if (columnIndex < row.length - 1) {
                const neighbor = row[columnIndex + 1];
                tile.east = neighbor;
            }
        });
    });
};

export const getCountOfBeams = (map: Tile[][]) => {
    return getAllBeams(map).length;
};

export const getAllBeams = (map: Tile[][]) => {
    const result: Beam[] = [];

    map.forEach((row) => {
        row.forEach((tile) => {
            result.push(...tile.beams);
        });
    });

    return result;
};

export const printMap = (map: Tile[][]) => {
    let result = '';

    map.forEach((row) => {
        row.forEach((tile) => {
            result += tile.symbol;
        });

        result += '\n';
    });

    console.log(result);
};

export const printEnergizedMap = (map: Tile[][]) => {
    let result = '';

    map.forEach((row) => {
        row.forEach((tile) => {
            result += tile.energized ? '#' : '.';
        });

        result += '\n';
    });

    console.log(result);
};

export const reset = (map: Tile[][]) => {
    map.forEach((row) => {
        row.forEach((tile) => {
            tile.reset();
        });
    });
};

export const getCountEnergizedTiles = (map: Tile[][]): number => {
    while (getCountOfBeams(map) > 0) {
        getAllBeams(map).forEach((beam) => {
            beam.move();
        });
    }

    let countEnergizedTiles = 0;
    map.forEach((row) => {
        row.forEach((tile) => {
            if (tile.isEnergized()) {
                countEnergizedTiles++;
            }
        });
    });

    return countEnergizedTiles;
};