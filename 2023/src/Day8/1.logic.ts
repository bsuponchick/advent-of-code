export class Node {
    id: string = '';
    left: string = '';
    right: string = '';

    constructor(id: string, left: string, right: string) {
        this.id = id;
        this.left = left;
        this.right = right;
    }

    print() {
        console.log(`Node ${this.id} has left ${this.left} and right ${this.right}`);
    }
}

interface PathInput {
    nodes: { [id: string]: Node };
    start: string;
    goal: string;
    instructions: string[];
}

export const determinePath = (input: PathInput): string[] => {
    const { nodes, start, goal, instructions } = input;
    let indexOfCurrentInstruction = 0;
    
    const path: string[] = [];
    let current = nodes[start];

    while (current.id !== goal) {
        const instruction = instructions[indexOfCurrentInstruction];
        
        if (instruction === 'L') {
            current = nodes[current.left];
        } else {
            current = nodes[current.right];
        }

        // Add the next node to the path
        path.push(current.id);

        if (instructions.length - 1 === indexOfCurrentInstruction) {
            indexOfCurrentInstruction = 0;
        } else {
            indexOfCurrentInstruction++;
        }
    }

    return path;
};