import { calculateLCM } from '../utils/math/lcm';

export class Node {
    id: string = '';
    left: string = '';
    right: string = '';

    constructor(id: string, left: string, right: string) {
        this.id = id;
        this.left = left;
        this.right = right;
    }

    isStartingNode(): boolean {
        return this.id.lastIndexOf('A') === this.id.length - 1;
    }

    isGoalNode(): boolean {
        return this.id.lastIndexOf('Z') === this.id.length - 1;
    }

    print() {
        console.log(`Node ${this.id} has left ${this.left} and right ${this.right}`);
    }
}

interface PathInput {
    nodes: { [id: string]: Node };
    startingNodes: Node[];
    instructions: string[];
}

export const determineStepsInPath = (input: PathInput): number => {
    const { nodes, startingNodes, instructions } = input;
    let indexOfCurrentInstruction = 0;
    
    let currentSteps = 0;
    let stepsRequiredToReachGoalNode: number[] = [];
    let currentNodes = startingNodes;

    while (currentNodes.length > 0) {
        const instruction = instructions[indexOfCurrentInstruction];
        
        if (instruction === 'L') {
            currentNodes = currentNodes.map(node => nodes[node.left]);
        } else {
            currentNodes = currentNodes.map(node => nodes[node.right]);
        }

        // Add the next node to the path
        currentSteps++;

        if (instructions.length - 1 === indexOfCurrentInstruction) {
            indexOfCurrentInstruction = 0;
        } else {
            indexOfCurrentInstruction++;
        }

        const goalNodes = currentNodes.filter(node => node.isGoalNode());
        if (goalNodes.length > 0) {
            stepsRequiredToReachGoalNode.push(currentSteps);
            currentNodes = currentNodes.filter(node => !node.isGoalNode());
        }
    }

    return calculateLCM(stepsRequiredToReachGoalNode);
};

export const determineStartingNodes = (nodes: Node[]): Node[] => {
    return nodes.filter(node => node.isStartingNode());
};

export const areAllNodesGoalNodes = (nodes: Node[]): boolean => {
    return nodes.every(node => node.isGoalNode());
};