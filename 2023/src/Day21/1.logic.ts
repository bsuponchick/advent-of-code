export enum TerrainType {
    Garden = '.',
    Rock = '#',
    Unknown = '?'
}

export class Terrain {
    type: TerrainType = TerrainType.Unknown;
    startingPoint: boolean = false;
    north: Terrain | null = null;
    south: Terrain | null = null;
    east: Terrain | null = null;
    west: Terrain | null = null;
    visited: boolean = false;
    traverals: number[] = [];

    constructor(type: TerrainType, isStartingPoint: boolean = false) {
        this.type = type;
        this.startingPoint = isStartingPoint;
    }

    isStartingPoint(): boolean {
        return this.startingPoint;
    }

    setNorth(terrain: Terrain) {
        this.north = terrain;
    }

    setSouth(terrain: Terrain) {
        this.south = terrain;
    }

    setEast(terrain: Terrain) {
        this.east = terrain;
    }

    setWest(terrain: Terrain) {
        this.west = terrain;
    }

    canMoveNorth(): boolean {
        return this.north !== null && this.north.type !== TerrainType.Rock;
    };

    canMoveSouth(): boolean {
        return this.south !== null && this.south.type !== TerrainType.Rock;
    };

    canMoveEast(): boolean {
        return this.east !== null && this.east.type !== TerrainType.Rock;
    };

    canMoveWest(): boolean {
        return this.west !== null && this.west.type !== TerrainType.Rock;
    };

    areAllNeighborsVisited(): boolean {
        return (this.north === null || this.north.visited) &&
            (this.south === null || this.south.visited) &&
            (this.east === null || this.east.visited) &&
            (this.west === null || this.west.visited);
    }

    traverse(steps: number) {
        this.traverals.push(steps);
    }

    hasBeenTraversedInSteps(steps: number): boolean {
        return this.traverals.includes(steps);
    }

    visit(): void {
        this.visited = true;
    }
}

export class Map {
    terrain: Terrain[][] = [];

    constructor() {
        this.terrain = [];
    }

    initialize(input: string[]) {
        input.forEach((line) => {
            const row: Terrain[] = [];
            line.split('').forEach((char) => {
                const type = char === '#' ? TerrainType.Rock : TerrainType.Garden;
                row.push(new Terrain(type, char === 'S'));
            });

            this.terrain.push(row);
        });

        this.establishConnections();
    }

    establishConnections = () => {
        this.terrain.forEach((row, rowIndex) => {
            row.forEach((terrain, columnIndex) => {
                if (rowIndex > 0) {
                    const neighbor = this.terrain[rowIndex - 1][columnIndex];
                    terrain.setNorth(neighbor);
                }

                if (columnIndex > 0) {
                    const neighbor = row[columnIndex - 1];
                    terrain.setWest(neighbor);
                }

                if (rowIndex < this.terrain.length - 1) {
                    const neighbor = this.terrain[rowIndex + 1][columnIndex];
                    terrain.setSouth(neighbor);
                }

                if (columnIndex < row.length - 1) {
                    const neighbor = row[columnIndex + 1];
                    terrain.setEast(neighbor);
                }
            });
        });
    };

    getStartingPoint(): Terrain {
        for (let x = 0; x < this.terrain.length; x++) {
            for (let y = 0; y < this.terrain[x].length; y++) {
                if (this.terrain[x][y].isStartingPoint()) {
                    return this.terrain[x][y];
                }
            }
        }

        throw new Error('Could not find starting point');
    }

    print() {
        let output = '';
        this.terrain.forEach((row) => {
            row.forEach((terrain) => {
                output += terrain.isStartingPoint() ? 'S' : terrain.type;
            });
            output += '\n';
        });

        console.log(output);
    }

    printVisited() {
        let output = '';
        this.terrain.forEach((row) => {
            row.forEach((terrain) => {
                output += terrain.visited ? 'O' : terrain.isStartingPoint() ? 'S' : terrain.type;
            });
            output += '\n';
        });

        console.log(output);
    }

    countVisited(): number {
        let count = 0;
        this.terrain.forEach((row) => {
            row.forEach((terrain) => {
                if (terrain.visited) {
                    count++;
                }
            });
        });

        return count;
    }
}

export class Elf {
    map: Map;

    constructor(map: Map) {
        this.map = map;
    }

    takePotentialSteps(maxSteps: number, terrain: Terrain): void {
        if (maxSteps > 0) {
            terrain.traverse(maxSteps);

            // We only care about the potential destinations, not each step along the way.
            if (maxSteps === 1) {
                this.visitNeighbors(terrain);
            }

            if (terrain.canMoveNorth()) {
                if (terrain.north?.hasBeenTraversedInSteps(maxSteps - 1) === false) {
                    this.takePotentialSteps(maxSteps - 1, terrain.north as Terrain);
                }
            }

            if (terrain.canMoveSouth()) {
                if (terrain.south?.hasBeenTraversedInSteps(maxSteps - 1) === false) {
                    this.takePotentialSteps(maxSteps - 1, terrain.south as Terrain);
                }
            }

            if (terrain.canMoveEast()) {
                if (terrain.east?.hasBeenTraversedInSteps(maxSteps - 1) === false) {
                    this.takePotentialSteps(maxSteps - 1, terrain.east as Terrain);
                }
            }

            if (terrain.canMoveWest()) {
                if (terrain.west?.hasBeenTraversedInSteps(maxSteps - 1) === false) {
                    this.takePotentialSteps(maxSteps - 1, terrain.west as Terrain);
                }
            }
        }
    }

    visitNeighbors(terrain: Terrain) {     
        if (terrain.canMoveNorth()) {
            terrain.north?.visit();
        }
        
        if (terrain.canMoveSouth()) {
            terrain.south?.visit();
        }
        
        if (terrain.canMoveEast()) {
            terrain.east?.visit();           
        }
        
        if (terrain.canMoveWest()) {
            terrain.west?.visit();
        }
    }
}