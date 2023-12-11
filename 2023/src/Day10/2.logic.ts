import { start } from 'repl';
import { v4 as uuidv4 } from 'uuid';

export class Node {
    id: string = '';
    value: string = '';
    neighbors: Node[] = [];
    visited: boolean = false;
    connectedToOutside: boolean = false;

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

    connectToOutside() {
        this.connectedToOutside = true;

        // if (this.value === '.' || this.value === '~') {
        //     this.value = 'O';
        // }
    }

    isConnectedToOutside(): boolean {
        return this.connectedToOutside;
    }

    setInternal = () => {
        this.value = 'I';
    }

    isPipe = () => {
        return (this.value === '|') || (this.value === '-') || (this.value === 'F') || (this.value === '7') || (this.value === 'J') || (this.value === 'L') || (this.value === 'S');
    }
}

export const establishConnections = (map: Node[][]) => {
    map.forEach((row, rowIndex) => {
        row.forEach((node, columnIndex) => {
            if (node.value === '.' || node.value === '~') {
                if (rowIndex > 0) {
                    const neighbor = map[rowIndex - 1][columnIndex];
                    node.addNeighbor(neighbor);
                }

                // If there is a neighbor to the south that connects north, then we can connect south
                if (rowIndex < map.length - 1) {
                    const neighbor = map[rowIndex + 1][columnIndex];
                    node.addNeighbor(neighbor);
                }

                // If there is a neighbor to the west that connects east, then we can connect west
                if (columnIndex > 0) {
                    const neighbor = row[columnIndex - 1];
                    node.addNeighbor(neighbor);
                }

                // If there is a neighbor to the east that connects west, then we can connect east
                if (columnIndex < row.length - 1) {
                    const neighbor = row[columnIndex + 1];
                    node.addNeighbor(neighbor);
                }
            } else if (node.value === 'S') {
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

                        if (neighbor.connectsSouth() || neighbor.isStartingNode()) {
                            node.addNeighbor(neighbor);
                        }
                    }
                }
    
                if (columnIndex > 0) {
                    if (node.connectsWest()) {
                        const neighbor = row[columnIndex - 1];

                        if (neighbor.connectsEast() || neighbor.isStartingNode()) {
                            node.addNeighbor(neighbor);
                        }
                    }
                }
    
                if (rowIndex < map.length - 1) {
                    if (node.connectsSouth()) {
                        const neighbor = map[rowIndex + 1][columnIndex];

                        if (neighbor.connectsNorth() || neighbor.isStartingNode()) {
                            node.addNeighbor(neighbor);
                        }
                    }
                }
    
                if (columnIndex < row.length - 1) {
                    if (node.connectsEast()) {
                        const neighbor = row[columnIndex + 1];

                        if(neighbor.connectsWest() || neighbor.isStartingNode()) {
                            node.addNeighbor(neighbor);
                        }
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

export const expandMap = (map: string[]): string[] => {
    const expandedMap: string[] = [];

    map.forEach((line) => {
        const characters = line.split('');
        let expandedLine: string = '';

        characters.forEach((character, index) => {
            if (index === 0) {
                expandedLine += `~${character}`;
            } else {
                if (character === '.') {
                    expandedLine += `~${character}`;
                } else if (character === 'F') {
                    expandedLine += `~${character}`;
                } else if (character === '7') {
                    expandedLine += `-${character}`;
                } else if (character === 'J') {
                    expandedLine += `-${character}`;
                } else if (character === 'L') {
                    expandedLine += `~${character}`;
                } else if (character === '-') {
                    expandedLine += `-${character}`;                
                } else if (character === '|') {
                    expandedLine += `~${character}`;
                } else if (character === 'S') {
                    if ((characters[index - 1] === 'F') || (characters[index - 1] === 'L') || (characters[index - 1] === '-')) {
                        expandedLine += `-${character}`;
                    } else {
                        expandedLine += `~${character}`;
                    }
                }
            }

            if (index === characters.length - 1) {
                expandedLine += '~';
            }
        });

        expandedMap.push(expandedLine);
    });

    expandedMap.unshift('~'.repeat(expandedMap[0].length));
    expandedMap.push('~'.repeat(expandedMap[0].length));

    return expandedMap;
};

export const identifyTilesSurroundedByPipes = (map: Node[][]): Node[] => {
    establishConnections(map);
    getCircuit(findStartingNode(map) as Node);

    let found = 0;
    let started = false;
    let round = 0;

    while (found > 0 || started === false) {
        found = 0;
        round++;
        started = true;

        console.log(`Starting round ${round}`);

        for (let row = 0; row < map.length; row++) {
            for (let column = 0; column < map[0].length; column++) {
                const node = map[row][column];
                
                if ((node.visited === false) && (node.isConnectedToOutside() === false)) {
                    if ((row === 0) || (row === map.length - 1) || (column === 0) || (column === map[0].length - 1)) {
                        node.connectToOutside();
                        found++;
                    } else {
                        const neighbors: Node[] = [];

                        if (row > 0) {
                            neighbors.push(map[row - 1][column]);
                        }

                        if (row < map.length - 1) {
                            neighbors.push(map[row + 1][column]);
                        }

                        if (column > 0) {
                            neighbors.push(map[row][column - 1]);
                        }

                        if (column < map[0].length - 1) {
                            neighbors.push(map[row][column + 1]);
                        }

                        if (neighbors.some(neighbor => neighbor.isConnectedToOutside())) {
                            node.connectToOutside();
                            found++;
                        }
                    }
                }
            }
        }

        console.log(`Found ${found} new with paths to the outside`);
    }

    console.log(`Completed looking for paths to the outside.`);
    printTileValues(map);

    // Contract map to remove all of the filler nodes
    const contractedMap = contractMap(map);

    // Contracted Map
    console.log(`Contracted Map`);
    printMap(contractedMap);

    const tilesSurroundedByPipes: Node[] = [];
    contractedMap.forEach(row => {
        row.forEach((node, index) => {
            if ((node.isConnectedToOutside() === false) && (node.visited === false) && (node.value !== '~')) {
                node.setInternal();
                tilesSurroundedByPipes.push(node);
                node.value = 'I';
            }
        });
    });

    return tilesSurroundedByPipes;
};

export const contractMap = (map: Node[][]): Node[][] => {
    // Contract map to remove all of the filler nodes
    const contractedMap = map.map((row) => {
        return row.filter((node, index) => {
        return index % 2 === 1; 
        });
    });

    contractedMap.shift();
    contractedMap.pop();

    return contractedMap;
};

export const printMap = (map: Node[][]) => {
    map.forEach(row => {
        console.log(row.map(node => node.value).join(''));
    });
};

export const printTileValues = (map: Node[][]) => {
    map.forEach(row => {
        console.log(row.map((node) => {
            if (node.value === 'O') {
                return 'O';
            } else if (node.visited) {
                return '#';
            } else if (node.isConnectedToOutside()) {
                return 'O';
            } else {
                return node.value;
            }
        }).join(''));
    });
};

export const printVisitedNodes = (map: Node[][]) => {
    map.forEach(row => {
        console.log(row.map(node => node.visited ? '#' : ' ').join(''));
    });
};