import { v4 as uuidv4 } from 'uuid';

export class Node {
    id: string = '';
    north: Node | null = null;
    south: Node | null = null;
    east: Node | null = null;
    west: Node | null = null;
    northwest: Node | null = null;
    northeast: Node | null = null;
    southwest: Node | null = null;
    southeast: Node | null = null;
    value: number | null = null;
    isSymbol: boolean = false;
    symbol: string = '';
    isBlank: boolean = false;
    adjacentNumbers: number[] = [];

    constructor(character: string) {
        this.id = uuidv4();

        if (character === '.') {
            this.isBlank = true;
        } else if (!Number.isNaN(Number.parseInt(character, 10))) {
            this.value = Number.parseInt(character, 10);
        } else {
            this.isSymbol = true;
            this.symbol = character;
        }
    }

    getNeighbors(): Node[] {
        return [
            this.north,
            this.south,
            this.east,
            this.west,
            this.northwest,
            this.northeast,
            this.southwest,
            this.southeast,
        ].filter((node): node is Node => node !== null);
    }

    getNeighborValues(): number[] {
        return this.getNeighbors()
            .map((node) => node.value)
            .filter((value): value is number => value !== null);
    }

    setNorth(node: Node) {
        this.north = node;
        node.south = this;
    }

    setSouth(node: Node) {
        this.south = node;
        node.north = this;
    }

    setEast(node: Node) {
        this.east = node;
        node.west = this;
    }

    setWest(node: Node) {
        this.west = node;
        node.east = this;
    }

    updateDiagonals = () => {
        if (this.north !== null && this.north.west !== null) {
            this.northwest = this.north.west;
        }

        if (this.north !== null && this.north.east !== null) {
            this.northeast = this.north.east;
        }

        if (this.south !== null && this.south.west !== null) {
            this.southwest = this.south.west;
        }

        if (this.south !== null && this.south.east !== null) {
            this.southeast = this.south.east;
        }
    };

    isAdjacentToSymbol = () => {
        return this.getNeighbors().some((node) => node.isSymbol);
    };

    getAdjacentSymbols = () => {
        return this.getNeighbors().filter((node) => node.isSymbol);
    };

    addAdjacentNumber = (num: number) => {
        this.adjacentNumbers.push(num);
    };

    print = () => {
        if (this.isBlank) {
            console.log(`Node [${this.id}]: Blank, Connections: ${this.getNeighborValues()}`);
        } else if (this.isSymbol) {
            console.log(`Node [${this.id}]: Symbol, Connections: ${this.getNeighborValues()}`);
        } else {
            console.log(`Node: ${this.value}, Connections: ${this.getNeighborValues()}`);
        }
    };

    isGear = (): boolean => {
        if (this.isSymbol && this.symbol === '*') {
            if (this.adjacentNumbers.length === 2) {
                return true;
            }
        }

        return false;
    };

    calculateGearRatio = (): number => {
        if (this.isGear()) {
            const [num1, num2] = this.adjacentNumbers;
            return num1 * num2;
        }

        return 0;
    };
}

export const establishConnections = (grid: Node[][]) => {
    grid.forEach((row, rowIndex) => {
        row.forEach((node, columnIndex) => {
            if (rowIndex > 0) {
                if (node.north === null) {
                    node.setNorth(grid[rowIndex - 1][columnIndex]);
                }
            }

            if (rowIndex < grid.length - 1) {
                if (node.south === null) {
                    node.setSouth(grid[rowIndex + 1][columnIndex]);
                }
            }

            if (columnIndex > 0) {
                if (node.west === null) {
                    node.setWest(grid[rowIndex][columnIndex - 1]);
                }
            }

            if (columnIndex < row.length - 1) {
                if (node.east === null) {
                    node.setEast(grid[rowIndex][columnIndex + 1]);
                }
            }
        });
    });

    grid.forEach((row) => {
        row.forEach((node) => {
            node.updateDiagonals();
        });
    });
};

export const getNumbersAdjacentToSymbols = (nodes: Node[]): number[] => {
    const numbersAdjacentToSymbols: number[] = [];
    const consecutiveNumberNodes: Node[][] = [];
    let index = 0;

    nodes.forEach((node) => {
        if (node.isBlank === false && node.isSymbol === false) {
            if (consecutiveNumberNodes[index] === undefined) {
                consecutiveNumberNodes[index] = [];
            }

            consecutiveNumberNodes[index].push(node);
        } else {
            index++;
        }
    });

    consecutiveNumberNodes.forEach((nodes) => {
        const adjacentSymbols: Node[] = [];

        nodes.forEach((node) => {
            if (node.isAdjacentToSymbol()) {
                if (adjacentSymbols.find((node) => node.id === node.id) === undefined) {
                    adjacentSymbols.push(...node.getAdjacentSymbols());
                }
            }
        });

        if (adjacentSymbols.length > 0) {
            let numberString = '';
            nodes.forEach((node) => {
                numberString += node.value;
            });

            numbersAdjacentToSymbols.push(Number.parseInt(numberString, 10));

            adjacentSymbols.forEach((node) => {
                node.addAdjacentNumber(Number.parseInt(numberString, 10));
            });
        }
    });

    return numbersAdjacentToSymbols;
};
