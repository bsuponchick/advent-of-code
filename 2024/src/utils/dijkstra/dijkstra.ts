export class Node {
    id: string;
    edges: Edge[];
    visited: boolean;

    constructor({id}) {
        this.id = id;
        this.edges = [];
        this.visited = false;
    }

    addEdge(edge: Edge) {
        this.edges.push(edge);
    }

    removeEdge(edge: Edge) {
        this.edges = this.edges.filter((e) => e !== edge);
    }

    visit() {
        this.visited = true;
    }

    reset() {
        this.visited = false;
    }
}

interface EdgeConstructor {
    start: Node;
    end: Node;
    weight: number;
}

export class Edge {
    start: Node;
    end: Node;
    weight: number;

    constructor({start, end, weight}: EdgeConstructor) {
        this.start = start;
        this.end = end;
        this.weight = weight;
    }
}

export class Graph {
    nodes: Node[];
    edges: Edge[];

    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    getNode(id: string) {
        return this.nodes.find((node) => node.id === id);
    }

    addNode(node: Node) {
        this.nodes.push(node);
    }

    removeNode(node: Node) {
        this.nodes = this.nodes.filter((n) => n !== node);
        node.edges.forEach((edge) => {
            this.removeEdge(edge);
        });
    }

    addEdge(edge: Edge) {
        this.edges.push(edge);
        edge.start.addEdge(edge);
        edge.end.addEdge(edge);
    }

    removeEdge(edge: Edge) {
        this.edges = this.edges.filter((e) => e !== edge);
        edge.start.removeEdge(edge);
        edge.end.removeEdge(edge);
    }

    reset() {
        this.nodes.forEach((node) => node.reset());
    }

    findShortestPath(start: Node, end: Node): {distance: number, path: Node[]} {
        const distance = {};
        const previous = {};
        const unvisited: Node[] = [];
    
        this.nodes.forEach((node) => {
            distance[node.id] = Infinity;
            previous[node.id] = null;
            unvisited.push(node);
        });
    
        distance[start.id] = 0;
    
        while (unvisited.length > 0) {
            const current = unvisited.reduce((min, node) => {
                if (distance[node.id] < distance[min.id]) {
                    return node;
                } else {
                    return min;
                }
            }, unvisited[0]);
    
            unvisited.splice(unvisited.indexOf(current), 1);
    
            current.edges.forEach((edge) => {
                const neighbor = edge.start === current ? edge.end : edge.start;
                const alt = distance[current.id] + edge.weight;
    
                if (alt < distance[neighbor.id]) {
                    distance[neighbor.id] = alt;
                    previous[neighbor.id] = current;
                }
            });
        }
    
        const path: Node[] = [];
        let current: Node = end;
    
        //console.log(`Start: ${start.id}`);
        //console.log(`End: ${end.id}`);
        
        while (current !== start) {
            // console.log(`Trying to push ${current.id}`);
            path.push(current);
            current = previous[current.id];
        }
    
        path.push(start);

        path.forEach((node) => {
            node.visit();
        });
    
        return {
            distance: distance[end.id],
            path: path.reverse()
        };
    };
}