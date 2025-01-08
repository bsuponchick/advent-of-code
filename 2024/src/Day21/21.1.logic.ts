import { Node, Edge, Graph } from '../utils/dijkstra/dijkstra';

export const stepComparator = (a: string, b: string): number =>{
    const priorities = ['v', '^', '<', '>', 'A'];

    if (a === b) {
        return 0;
    }

    if (priorities.indexOf(a) < priorities.indexOf(b)) {
        return -1;
    } else {
        return 1;
    }
}

export class NumericKeyPad {
    currentNode: Node;
    graph: Graph;

    constructor() {
        this.graph = new Graph();

        const one = new Node({ id: '1' });
        const two = new Node({ id: '2' });
        const three = new Node({ id: '3' });
        const four = new Node({ id: '4' });
        const five = new Node({ id: '5' });
        const six = new Node({ id: '6' });
        const seven = new Node({ id: '7' });
        const eight = new Node({ id: '8' });
        const nine = new Node({ id: '9' });
        const zero = new Node({ id: '0' });
        const action = new Node({ id: 'A' });

        this.graph.addNode(one);
        this.graph.addNode(two);
        this.graph.addNode(three);
        this.graph.addNode(four);
        this.graph.addNode(five);
        this.graph.addNode(six);
        this.graph.addNode(seven);
        this.graph.addNode(eight);
        this.graph.addNode(nine);
        this.graph.addNode(zero);
        this.graph.addNode(action);

        this.graph.addEdge(new Edge({ start: one, end: two, weight: 1 }));
        this.graph.addEdge(new Edge({ start: one, end: four, weight: 1 }));

        this.graph.addEdge(new Edge({ start: two, end: three, weight: 1 }));
        this.graph.addEdge(new Edge({ start: two, end: zero, weight: 1 }));
        this.graph.addEdge(new Edge({ start: two, end: five, weight: 1 }));

        this.graph.addEdge(new Edge({ start: three, end: action, weight: 1 }));
        this.graph.addEdge(new Edge({ start: three, end: six, weight: 1 }));

        this.graph.addEdge(new Edge({ start: four, end: five, weight: 1 }));
        this.graph.addEdge(new Edge({ start: four, end: seven, weight: 1 }));

        this.graph.addEdge(new Edge({ start: five, end: six, weight: 1 }));
        this.graph.addEdge(new Edge({ start: five, end: eight, weight: 1 }));

        this.graph.addEdge(new Edge({ start: six, end: nine, weight: 1 }));

        this.graph.addEdge(new Edge({ start: seven, end: eight, weight: 1 }));

        this.graph.addEdge(new Edge({ start: eight, end: nine, weight: 1 }));

        this.graph.addEdge(new Edge({ start: zero, end: action, weight: 1 }));

        this.currentNode = action;
    }

    reset() {
        this.graph.reset();
    }

    setCurrentNode(id: string) {
        this.currentNode = this.graph.getNode(id);
    }

    determinePathToNode(id: string): string[] {
        const goal = this.graph.getNode(id);
        const path = this.graph.findShortestPath(this.currentNode, goal).path.map((node) => node.id);
        const directions = [];
        
        if (path.length > 1) {
            let currentNodeId = this.currentNode.id;

            path.forEach((nodeId, index) => {
                if (index > 0) {
                    const step = this.determineStepToNode(currentNodeId, nodeId);
                    if (step !== null) {
                        directions.push(step);
                    }
                    currentNodeId = nodeId;
                }
            });
        }

        return directions.sort(stepComparator);;
    }

    determineStepToNode(startingId: string, targetId: string): string {
        switch (startingId) {
            case '1':
                switch (targetId) {
                    case '2':
                        return '>';
                    case '4':
                        return '^';
                    default:
                        return null;
                }
            case '2':
                switch (targetId) {
                    case '1':
                        return '<';
                    case '3':
                        return '>';
                    case '5':
                        return '^';
                    case '0':
                        return 'v';
                    default:
                        return null;
                }
            case '3':
                switch (targetId) {
                    case '2':
                        return '<';
                    case '6':
                        return '^';
                    case 'A':
                        return 'v';
                    default:
                        return null;
                }
            case '4':
                switch (targetId) {
                    case '1':
                        return 'v';
                    case '5':
                        return '>';
                    case '7':
                        return '^';
                    default:
                        return null;
                }
            case '5':
                switch (targetId) {
                    case '2':
                        return 'v';
                    case '4':
                        return '<';
                    case '6':
                        return '>';
                    case '8':
                        return '^';
                    default:
                        return null;
                }
            case '6':
                switch (targetId) {
                    case '3':
                        return 'v';
                    case '5':
                        return '<';
                    case '9':
                        return '^';
                    default:
                        return null;
                }
            case '7':
                switch (targetId) {
                    case '4':
                        return 'v';
                    case '8':
                        return '>';
                    default:
                        return null;
                }
            case '8':
                switch (targetId) {
                    case '5':
                        return 'v';
                    case '7':
                        return '<';
                    case '9':
                        return '>';
                    default:
                        return null;
                }
            case '9':
                switch (targetId) {
                    case '6':
                        return 'v';
                    case '8':
                        return '<';
                    default:
                        return null;
                }
            case '0':
                switch (targetId) {
                    case '2':
                        return '^';
                    case 'A':
                        return '>';
                    default:
                        return null;
                }
            case 'A':
                switch (targetId) {
                    case '3':
                        return '^';
                    case '0':
                        return '<';
                    default:
                        return null;
                }
            default:
                return null;
        }
    }

    determinePathToSequence(sequence: string): string[] {
        const charactersInSequence = sequence.split('');

        let path = [];

        charactersInSequence.forEach((character) => {
            path = path.concat(this.determinePathToNode(character));
            this.setCurrentNode(character);
            // Add in the needed Action step in between paths
            path.push('A');
        });

        return path;
    }
}

export class DirectionalKeypad {
    currentNode: Node;
    graph: Graph;

    constructor() {
        this.graph = new Graph();

        const up = new Node({ id: '^' });
        const down = new Node({ id: 'v' });
        const left = new Node({ id: '<' });
        const right = new Node({ id: '>' });
        const action = new Node({ id: 'A' });

        this.graph.addNode(up);
        this.graph.addNode(down);
        this.graph.addNode(left);
        this.graph.addNode(right);
        this.graph.addNode(action);

        this.graph.addEdge(new Edge({ start: left, end: down, weight: 1 }));

        this.graph.addEdge(new Edge({ start: down, end: right, weight: 1 }));
        this.graph.addEdge(new Edge({ start: down, end: up, weight: 1 }));

        this.graph.addEdge(new Edge({ start: right, end: action, weight: 1 }));

        this.graph.addEdge(new Edge({ start: up, end: action, weight: 1 }));

        this.currentNode = action;
    }

    reset() {
        this.graph.reset();
    }

    setCurrentNode(id: string) {
        this.currentNode = this.graph.getNode(id);
    }

    determinePathToNode(id: string): string[] {
        const goal = this.graph.getNode(id);
        const path = this.graph.findShortestPath(this.currentNode, goal).path.map((node) => node.id);
        const directions = [];
        
        if (path.length > 1) {
            let currentNodeId = this.currentNode.id;

            path.forEach((nodeId, index) => {
                if (index > 0) {
                    const step = this.determineStepToNode(currentNodeId, nodeId);
                    if (step !== null) {
                        directions.push(step);
                    }
                    currentNodeId = nodeId;
                }
            });
        }

        return directions.sort(stepComparator);
    }

    determineStepToNode(startingId: string, targetId: string): string {
        switch (startingId) {
            case '<':
                switch (targetId) {
                    case 'v':
                        return '>';
                    default:
                        return null;
                }
            case 'v':
                switch (targetId) {
                    case '<':
                        return '<';
                    case '>':
                        return '>';
                    case '^':
                        return '^';
                    default:
                        return null;
                }
            case '>':
                switch (targetId) {
                    case 'v':
                        return '<';
                    case 'A':
                        return '^';
                    default:
                        return null;
                }
            case '^':
                switch (targetId) {
                    case 'v':
                        return 'v';
                    case 'A':
                        return '>';
                    default:
                        return null;
                }
            case 'A':
                switch (targetId) {
                    case '^':
                        return '<';
                    case '>':
                        return 'v';
                    default:
                        return null;
                }
            default:
                return null;
        }
    }

    determinePathToSequence(sequence: string): string[] {
        const charactersInSequence = sequence.split('');

        let path = [];

        charactersInSequence.forEach((character) => {
            path = path.concat(this.determinePathToNode(character));
            // Add in the needed Action step in between paths
            path.push('A');

            this.setCurrentNode(character);
        });

        return path;
    }
}