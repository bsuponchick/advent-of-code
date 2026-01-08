import { Graph, Node, Edge } from '../utils/dijkstra/dijkstra';

export const createGraph = (maxX: number, maxY: number, favoriteNumber: number): Graph => {
    const graph = new Graph();

    const map: Node[][] = [];

    for (let y = 0; y <= maxY; y++) {
        const row: Node[] = [];

        for (let x = 0; x <= maxX; x++) {
            if (isOpenSpace(x, y, favoriteNumber)) {
                const node = new Node({id: `${x},${y}`});
                row.push(node);
            } else {
                row.push(null);
            }
        }

        map.push(row);
    }

    // Need to add edges between nodes
    for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x <= maxX; x++) {
            if (map[y][x] !== null) {
                graph.addNode(map[y][x]);

                if (x < maxX && map[y][x+1] !== null) {
                    graph.addEdge(new Edge({start: map[y][x], end: map[y][x+1], weight: 1}));
                }

                if (y < maxY && map[y+1][x] !== null) {
                    graph.addEdge(new Edge({start: map[y][x], end: map[y+1][x], weight: 1}));
                }

                if (x > 0 && map[y][x-1] !== null) {
                    graph.addEdge(new Edge({start: map[y][x], end: map[y][x-1], weight: 1}));
                }

                if (y > 0 && map[y-1][x] !== null) {
                    graph.addEdge(new Edge({start: map[y][x], end: map[y-1][x], weight: 1}));
                }
            }
        }
    }

    console.log(`Graph has ${graph.nodes.length} nodes and ${graph.edges.length} edges`);
    console.log(`========================================`);

    map.forEach((row) => {
        let rowString = '';
        row.forEach((node) => {
            if (node === null) {
                rowString += '#';
            } else {
                rowString += '.';
            }
        });
        console.log(`${rowString}`);
    });
    return graph;
}

export const isOpenSpace = (x: number, y: number, favoriteNumber: number) => {
    const value = (x*x) + (3*x) + (2*x*y) + y + (y*y) + favoriteNumber;
    const binary = value.toString(2);
    const ones = binary.split('').filter((bit) => bit === '1').length;
    return ones % 2 === 0;
}