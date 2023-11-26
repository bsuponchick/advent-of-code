export class Node {
    constructor({id}) {
        this.id = id;
        this.edges = [];
        this.visited = false;
    }

    addEdge(edge) {
        this.edges.push(edge);
    }

    removeEdge(edge) {
        this.edges = this.edges.filter((e) => e !== edge);
    }

    visit() {
        this.visited = true;
    }

    reset() {
        this.visited = false;
    }
}

export class Edge {
    constructor({start, end, weight}) {
        this.start = start;
        this.end = end;
        this.weight = weight;
    }
}

export class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    getNode(id) {
        return this.nodes.find((node) => node.id === id);
    }

    addNode(node) {
        this.nodes.push(node);
    }

    removeNode(node) {
        this.nodes = this.nodes.filter((n) => n !== node);
        node.edges.forEach((edge) => {
            this.removeEdge(edge);
        });
    }

    addEdge(edge) {
        this.edges.push(edge);
        edge.start.addEdge(edge);
        edge.end.addEdge(edge);
    }

    removeEdge(edge) {
        this.edges = this.edges.filter((e) => e !== edge);
        edge.start.removeEdge(edge);
        edge.end.removeEdge(edge);
    }

    reset() {
        this.nodes.forEach((node) => node.reset());
    }
}

export const findShortestPath = ({graph, start, end}) => {
    const distance = {};
    const previous = {};
    const unvisited = [];

    graph.nodes.forEach((node) => {
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

    const path = [];
    let current = end;

    while (current !== start) {
        path.push(current);
        current = previous[current.id];
    }

    path.push(start);

    return {
        distance: distance[end.id],
        path: path.reverse()
    };
}