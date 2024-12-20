import { Node, Edge, Graph } from '../utils/dijkstra/dijkstra';
import { Coordinate } from '../utils/interfaces/coordinate';

class MemorySpaceNode extends Node {
    corrupted: boolean;

    constructor(id) {
        super(id);
        this.corrupted = false;
    }

    corrupt() {
        this.corrupted = true;
    }
}

export class MemorySpace {
    graph: Graph;
    size: number;

    constructor(size: number) {
        this.graph = new Graph();
        this.size = size;
    }

    initialize() {
        for (let x = 0; x <= this.size; x++) {
            for (let y = 0; y <= this.size; y++) {
                const idToAdd = this.generateNodeIdFromCoordinate({ x, y });
                this.graph.addNode(new MemorySpaceNode({ id: idToAdd }));
            }
        }

        for (let x = 0; x <= this.size; x++) {
            for (let y = 0; y <= this.size; y++) {
                const id = this.generateNodeIdFromCoordinate({ x, y });

                // Add edges to adjacent nodes

                // Add left edge
                if (x > 0) {
                    this.addEdge(id, this.generateNodeIdFromCoordinate({ x: x - 1, y }), 1);
                }

                // Add top edge
                if (y > 0) {
                    this.addEdge(id, this.generateNodeIdFromCoordinate({ x, y: y - 1 }), 1);
                }

                // Add right edge
                if (x < this.size - 1) {
                    this.addEdge(id, this.generateNodeIdFromCoordinate({ x: x + 1, y }), 1);
                }

                // Add bottom edge
                if (y < this.size - 1) {
                    this.addEdge(id, this.generateNodeIdFromCoordinate({ x, y: y + 1 }), 1);
                }
            }
        }
    }

    generateNodeIdFromCoordinate(coordinate: Coordinate): string {
        return `${coordinate.x},${coordinate.y}`;
    }

    corruptNode(coordinate: Coordinate) {
        let nodeToCorrupt =  this.graph.getNode(this.generateNodeIdFromCoordinate(coordinate));

        nodeToCorrupt.edges.forEach((edge) => {
            edge.start.removeEdge(edge);
            edge.end.removeEdge(edge);
            this.graph.removeEdge(edge);
            (nodeToCorrupt as MemorySpaceNode).corrupt();
        });
    }

    addEdge(startId: string, endId: string, weight: number) {
        const startNode = this.graph.getNode(startId);
        const endNode = this.graph.getNode(endId);

        this.graph.addEdge(new Edge({
            start: startNode,
            end: endNode,
            weight
        }));
    }

    getShortestPath(startId, endId) {
        const startNode = this.graph.getNode(startId);
        const endNode = this.graph.getNode(endId);

        return this.graph.findShortestPath(startNode, endNode);
    }

    reset() {
        this.graph = new Graph();
        this.initialize();
    }

    print() {
        let output = '';
        for (let y = 0; y <= this.size; y++) {
            for (let x = 0; x <= this.size; x++) {
                const node = this.graph.getNode(this.generateNodeIdFromCoordinate({ x, y }));

                if ((node as MemorySpaceNode).corrupted) {
                    output += '#';
                } else if (node.visited) {
                    output += 'O';
                } else {
                    output += '.';
                }
            }
            
            output += '\n';
        }

        console.log(output);
    }
}