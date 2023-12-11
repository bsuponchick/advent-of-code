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

        if (this.value === '.' || this.value === '~') {
            this.value = 'O';
        }
    }

    isConnectedToOutside(): boolean {
        return this.connectedToOutside;
    }

    setInternal = () => {
        this.value = 'I';
    }

    isPipe = () => {
        return (this.value === '|') || (this.value === '-') || (this.value === 'F') || (this.value === '7') || (this.value === 'J') || (this.value === 'L');
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
                    if ((characters[index - 1] === 'F') || (characters[index - 1] === 'L') || (characters[index - 1] === '-')) {
                        expandedLine += `-${character}`;
                    } else {
                        expandedLine += `~${character}`;
                    }
                } else if (character === 'J') {
                    if ((characters[index - 1] === 'F') || (characters[index - 1] === 'L') || (characters[index - 1] === '-')) {
                        expandedLine += `-${character}`;
                    } else {
                        expandedLine += `~${character}`;
                    }
                } else if (character === 'L') {
                    expandedLine += `~${character}`;
                } else if (character === '-') {
                    if ((characters[index - 1] === 'F') || (characters[index - 1] === 'L') || (characters[index - 1] === '-')) {
                        expandedLine += `-${character}`;
                    } else {
                        expandedLine += `~${character}`;
                    }              
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
    const squaresToCheck = getSquaresToCheck(map);

    squaresToCheck.forEach((square, index) => {
        if (index === 0) {
            // On the first square, any . or ~ tile has a path
            square.forEach((node) => {
                if (node.value === '.' || node.value === '~') {
                    node.connectToOutside();
                }
            });
        } else {
            // On subsequent squares, a . or ~ tile has a path if it is adjacent to a tile that has a path
            square.forEach(node => {
                if (node.value === '.' || node.value === '~') {
                    const neighbors = node.getNeighbors();
                    if (neighbors.some(neighbor => neighbor.isConnectedToOutside())) {
                        node.connectToOutside();
                    }
                }
            });
        }
    });

    console.log(`Initial Sweep Complete`);
    map.forEach(row => {
        console.log(row.map(node => node.value).join(''));
    });

    let countAdditionalPathsFound = 0;
    let startedFinalPasses = false;

    while (countAdditionalPathsFound !== 0 || startedFinalPasses === false) {
        countAdditionalPathsFound = 0;
        startedFinalPasses = true;

        squaresToCheck.forEach((square) => {
            square.forEach((node) => {
                if (node.value === '.' || node.value === '~') {
                    const neighbors = node.getNeighbors();
                    if (neighbors.some(neighbor => neighbor.isConnectedToOutside())) {
                        node.connectToOutside();
                        countAdditionalPathsFound++;
                    }
                }
            });
        });
    }

    console.log(`Moving Inward Complete`);
    map.forEach(row => {
        console.log(row.map(node => node.value).join(''));
    });

    map.forEach(row => {
        row.forEach(node => {
            if (node.isConnectedToOutside()) {
                node.neighbors.forEach(neighbor => {
                    neighbor.connectToOutside();
                });
            }
        });
    });

    console.log(`Moving Inward Complete`);
    map.forEach(row => {
        console.log(row.map((node) => {
            if (node.value === 'O') {
                return node.value;
            } else if (node.visited) {
                return '#';
            } else if (node.isConnectedToOutside()) {
                return 'X';
            } else {
                return node.value;
            }
        }).join(''));
    });

    // Set all external nodes to the left as connected to the outside
    map.forEach(row => {
        let hitWall = false;

        row.forEach((node, index) => {
            if (hitWall === false) {
                if (index < row.length - 1) {
                    if (node.visited === false || node.value === '~') {
                        node.connectToOutside();
                    }

                    if (row[index + 1].visited === true) {
                        hitWall = true;                        
                    }
                }
            }
        });
    });

    // Set all external nodes to the right as connected to the outside
    map.forEach(row => {
        let hitWall = false;

        row.reverse().forEach((node, index) => {
            if (hitWall === false) {
                if (index < row.length - 1) {
                    if (node.visited === false || node.value === '~') {
                        node.connectToOutside();
                    }

                    if (row[index + 1].visited === true) {
                        hitWall = true;                        
                    }
                }
            }
        });

        row.reverse();
    });

    console.log(`Moving Inward From Left and Right Complete`);
    map.forEach(row => {
        console.log(row.map((node) => {
            if (node.value === 'O') {
                return node.value;
            } else if (node.visited) {
                return '#';
            } else if (node.isConnectedToOutside()) {
                return 'X';
            } else {
                return node.value;
            }
        }).join(''));
    });



    const tilesSurroundedByPipes: Node[] = [];
    map.forEach(row => {
        row.forEach(node => {
            if ((node.isConnectedToOutside() === false) && (node.visited === false) && (node.value !== '~')) {
                node.setInternal();
                tilesSurroundedByPipes.push(node);
                node.value = 'I';
            }
        });
    });

    return tilesSurroundedByPipes;
};

export const getSquaresToCheck = (map: Node[][]): Node[][] => {
    let left = 0;
    let right = map[0].length - 1;

    const squaresToCheck: Node[][] = [];

    while (left <= right) {
        const square: Node[] = [];

        const topNodes = map[left];
        const bottomNodes = map[map.length - left - 1];

        const leftNodes = map.map(row => row[left]);
        const rightNodes = map.map(row => row[right]);

        if (topNodes !== undefined) {
            topNodes.forEach((node, index) => {
                if (index >= left && index <= right) {
                    square.push(node);
                }
            });
        }

        if (rightNodes !== undefined) {
            rightNodes.forEach((node, index) => {
                // Top right node already added in previous loop
                if (index > left && index <= right) {
                    square.push(node);
                }
            });
        }

        if (bottomNodes !== undefined) {
            bottomNodes.forEach((node, index) => {
                // Bottom right node already added in previous loop
                if (index >= left && index < right) {
                    square.push(node);
                }
            });
        }

        if (leftNodes !== undefined) {
            leftNodes.forEach((node, index) => {
                // Top left and bottom right nodes already added in previous loops
                if (index > left && index < right) {
                    square.push(node);
                }
            });
        }

        squaresToCheck.push(square);

        left++;
        right--;
    }

    return squaresToCheck;
};