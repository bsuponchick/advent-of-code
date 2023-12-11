import { v4 as uuidv4 } from 'uuid';

export class Node {
    id: string = '';
    value: string = '';
    neighbors: Node[] = [];
    visited: boolean = false;

    constructor(value: string) {
        this.id = uuidv4();
        this.value = value;
    }

    addNeighbor(node: Node) {
        this.neighbors.push(node);
    }

    getNeighbors(): Node[] {
        return this.neighbors;
    }

    isStartingNode(): boolean {
        return this.value === 'S';
    }

    connectsNorth(): boolean {
        return (this.value === '|') || (this.value === 'L') || (this.value === 'J');
    }

    connectsEast(): boolean {
        return (this.value === '-') || (this.value === 'F') || (this.value === 'L');
    }

    connectsWest(): boolean {
        return (this.value === '-') || (this.value === '7') || (this.value === 'J');
    }

    connectsSouth(): boolean {
        return (this.value === '|') || (this.value === '7') || (this.value === 'F');
    }

    visit() {
        this.visited = true;
    }
}

export const establishConnections = (map: Node[][]) => {
    map.forEach((row, rowIndex) => {
        row.forEach((node, columnIndex) => {
            if (node.value === '.') {
                return;
            }

            if (node.value === 'S') {
                // Need to determine connections based upon neighbors
                // If there is a neighbor to the north that connects south, then we can connect north
                if (rowIndex > 0) {
                    const neighbor = map[rowIndex - 1][columnIndex];
                    if (neighbor.connectsSouth()) {
                        node.addNeighbor(neighbor);
                    }
                }

                // If there is a neighbor to the south that connects north, then we can connect south
                if (rowIndex < map.length - 1) {
                    const neighbor = map[rowIndex + 1][columnIndex];
                    if (neighbor.connectsNorth()) {
                        node.addNeighbor(neighbor);
                    }
                }

                // If there is a neighbor to the west that connects east, then we can connect west
                if (columnIndex > 0) {
                    const neighbor = row[columnIndex - 1];
                    if (neighbor.connectsEast()) {
                        node.addNeighbor(neighbor);
                    }
                }

                // If there is a neighbor to the east that connects west, then we can connect east
                if (columnIndex < row.length - 1) {
                    const neighbor = row[columnIndex + 1];
                    if (neighbor.connectsWest()) {
                        node.addNeighbor(neighbor);
                    }
                }
            } else {
                // Just another node, determine connections based upon its value
                if (rowIndex > 0) {
                    if (node.connectsNorth()) {
                        const neighbor = map[rowIndex - 1][columnIndex];
                        node.addNeighbor(neighbor);
                    }
                }
    
                if (columnIndex > 0) {
                    if (node.connectsWest()) {
                        const neighbor = row[columnIndex - 1];
                        node.addNeighbor(neighbor);
                    }
                }
    
                if (rowIndex < map.length - 1) {
                    if (node.connectsSouth()) {
                        const neighbor = map[rowIndex + 1][columnIndex];
                        node.addNeighbor(neighbor);
                    }
                }
    
                if (columnIndex < row.length - 1) {
                    if (node.connectsEast()) {
                        const neighbor = row[columnIndex + 1];
                        node.addNeighbor(neighbor);
                    }
                }
            }
        });
    });
};

export const parseNodes = (line: string): Node[] => {
    const nodes: Node[] = [];

    const values = line.split('');
    values.forEach(value => {
        const node = new Node(value);
        nodes.push(node);
    });

    return nodes;
};

export const getCircuit = (node: Node): Node[] => {
    const circuit: Node[] = [];
    let currentNode: Node = node;

    while (currentNode.visited === false) {
        circuit.push(currentNode);
        currentNode.visit();

        const neighbors = currentNode.getNeighbors();
        if (neighbors[0].visited === false) {
            currentNode = neighbors[0];
        } else if (neighbors[1].visited === false) {
            currentNode = neighbors[1];
        }
    }

    return circuit;
};

export const findStartingNode = (map: Node[][]): Node | null => {
    let startingNode: Node | null = null;
    map.forEach(row => {
        row.forEach(node => {
            if (node.isStartingNode()) {
                startingNode = node;
            }
        });
    });

    return startingNode;
};