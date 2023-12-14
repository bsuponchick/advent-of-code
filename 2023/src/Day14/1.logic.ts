export class Tile {
    value: string = '';
    north: Tile | null = null;
    south: Tile | null = null;
    east: Tile | null = null;
    west: Tile | null = null;

    constructor (value: string) {
        this.value = value;
    }

    isEmpty(): boolean {
        return this.value === '.';
    }

    isCubeShaped(): boolean {
        return this.value === '#';
    }

    isRoundShaped(): boolean {
        return this.value === 'O';
    }

    canMoveNorth(): boolean {
        return (this.north !== null) && (this.isCubeShaped() === false) && (this.north.isEmpty());
    }

    canMoveSouth(): boolean {
        return (this.south !== null) && (this.isCubeShaped() === false) && (this.south.isEmpty());
    }

    canMoveEast(): boolean {
        return (this.east !== null) && (this.isCubeShaped() === false) && (this.east.isEmpty());
    }

    canMoveWest(): boolean {
        return (this.west !== null) && (this.isCubeShaped() === false) && (this.west.isEmpty());
    }

    moveNorth(): void {
        if (this.canMoveNorth()) {
            this.north!.value = this.value;
            this.value = '.';
        }
    }

    moveSouth(): void {
        if (this.canMoveSouth()) {
            this.south!.value = this.value;
            this.value = '.';
        }
    }

    moveEast(): void {
        if (this.canMoveEast()) {
            this.east!.value = this.value;
            this.value = '.';
        }
    }

    moveWest(): void {
        if (this.canMoveWest()) {
            this.west!.value = this.value;
            this.value = '.';
        }
    }
}

export const tiltNorth = (map: Tile[][]) => {
    for (let i = 0; i < map.length; i++) {
        map.forEach((row) => {
            row.forEach((tile) => {
                if (tile.canMoveNorth()) {
                    tile.moveNorth();
                }
            });
        });
    }
};

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

export const calculateLoad = (map: Tile[][]) => {
    let load = 0;

    map.forEach((row, index) => {
        row.forEach((tile) => {
            if (tile.isRoundShaped()) {
                load+= map.length - index;
            }
        });
    });

    return load;
};

export const generateMapString = (map: Tile[][]) => {
    let result = '';

    map.forEach((row) => {
        let line = '';
        row.forEach((tile) => {
            line += tile.value;
        });

        result += `${line}\n`;
    });

    return result;
};

export const printMap = (map: Tile[][]) => {
    console.log(`${generateMapString(map)}`);
};