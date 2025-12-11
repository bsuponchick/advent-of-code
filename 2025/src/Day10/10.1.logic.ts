export class Node {
    state: string;
    children: Node[];

    constructor(state: string) {
        this.state = state;
        this.children = [];
    }

    addChild(child: Node) {
        this.children.push(child);
    }

    getChildren(): Node[] {
        return this.children;
    }

    getState(): string {
        return this.state;
    }

    setState(state: string) {
        this.state = state;
    }

    setChildren(children: Node[]) {
        this.children = children;
    }
}

export class Tree {
    root: Node;

    constructor(root: Node) {
        this.root = root;
    }

    getRoot(): Node {
        return this.root;
    }

    print(): void {
        console.log(`Root state: ${this.root.getState()}`);
        console.log('--------------------------------');
    }

    addChild(parent: Node, child: Node) {
        parent.addChild(child);
    }

    findShortestPathToGoalState(goalState: string): number {
        // Use breadth first search to find the shortest path to the goal state;
        const queue: Node[] = [this.root];
        const result: string[] = [];

        while (queue.length > 0) {
            const currentNode = queue.shift();
            
            result.push(currentNode.getState());

            for (let i = 0; i < currentNode.getChildren().length; i++) {
                queue.push(currentNode.getChildren()[i]);
            }
        }

        return result.indexOf(goalState) !== -1 ? result.indexOf(goalState) + 1 : -1;
    }
}

export class Button {
    wires: number[];

    constructor(wires: number[]) {
        this.wires = wires;
    }
}

export class Machine {
    goalState: string;
    buttons: Button[];
    joltage: number[];
    initialState: string;

    constructor(goalState: string, buttons: Button[], joltage: number[]) {
        this.goalState = goalState;
        this.buttons = buttons;
        this.joltage = joltage;
        this.initialState = '.'.repeat(goalState.length);
    }

    print(): void {
        console.log(`Goal state: ${this.goalState}`);
        console.log(`Buttons: ${this.buttons.map(button => button.wires.join(',')).join(' ')}`);
        console.log(`Joltage: ${this.joltage.join(',')}`);
        console.log('--------------------------------');
    }

    pressButton(currentState: string,button: Button): string {
        let newState = ``;
        // Pressing a button will change the current state of the machine by flipping each bit in the button's wires
        for (let i = 0; i < currentState.length; i++) {
            if (button.wires.includes(i)) {
                newState += currentState.charAt(i) === '.' ? '#' : '.';
            } else {
                newState += currentState.charAt(i);
            }
        }
        return newState;
    }

    findShortestPathToGoalState(): number {
        if (this.initialState === this.goalState) {
            return 0;
        }

        const cache: Map<string, boolean> = new Map<string, boolean>();

        let steps = 0;
        let goalReached = false;
        let statesToEvaluate: string[] = [this.initialState];

        while (goalReached === false) {
            const statesThisRound: string[] = [];

            statesToEvaluate.forEach(state => {
                if (!cache.has(state)) {
                    cache.set(state, true);

                    const newStates = this.buttons.map(button => this.pressButton(state, button));
                    if (newStates.indexOf(this.goalState) !== -1) {
                        goalReached = true;
                    }

                    statesThisRound.push(...newStates);
                }
            });

            statesToEvaluate = statesThisRound;
            steps++;
        }

        return steps;
    }
}