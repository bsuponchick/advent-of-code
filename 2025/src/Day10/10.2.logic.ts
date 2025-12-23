export class Button {
    id: string;
    wires: number[];

    constructor(id: string,wires: number[]) {
        this.id = id;
        this.wires = wires;
    }
}

export class GraphNode {
    id: number;
    state: number[];
    depth: number;
    children: GraphNode[] = [];
    
    constructor(id: number, state: number[], depth: number) {
        this.id = id;
        this.state = state;
        this.depth = depth;
        this.children = [];
    }

    addChild(child: GraphNode) {
        this.children.push(child);
    }

    isGoalState(): boolean {
        return this.state.every((value) => value === 0);
    }

    isValidState(): boolean {
        return this.state.every((value) => value >= 0);
    }
}

export class Machine {
    buttons: Button[];
    initialStateMask: string;
    targetJoltages: number[];

    constructor(targetJoltages: number[], buttons: Button[]) {
        this.targetJoltages = targetJoltages;
        this.buttons = buttons;
        this.initialStateMask = targetJoltages.map(() => '.').join('');
    }

    print(): void {
        console.log(`Goal state: ${this.targetJoltages.join(',')}`);
        console.log(`Initial state: ${this.initialStateMask}`);
        console.log(`Buttons: ${this.buttons.map((button) => button.wires.join(',')).join(' ')}`);
        console.log('--------------------------------');
    }

    pressButton(currentState: number[], button: Button): number[] {
        let newState: number[] = [];

        // Pressing a button will change the current state of the machine by flipping each bit in the button's wires
        for (let i = 0; i < currentState.length; i++) {
            if (button.wires.includes(i)) {
                newState[i] = currentState[i] - 1;
            } else {
                newState[i] = currentState[i];
            }
        }
        return newState;
    }

    pressButtonTwice(currentState: number[], button: Button): number[] {
        let newState = this.pressButton(currentState, button);
        return this.pressButton(newState, button);
    }

    allZeroes(state: number[]): boolean {
        return state.every((value) => value === 0);
    }

    determineEndStateMask(): string {
        let mask = '';

        this.targetJoltages.forEach((joltage) => {
            if (joltage % 2 === 0) {
                mask += '.';
            } else {
                mask += '#';
            }
        });

        return mask;
    }

    determineStateMaskFromButtonPress(button: Button, currentStateMask: string): string {
        let newStateMask = ``;
        // Pressing a button will change the current state of the machine by flipping each bit in the button's wires
        for (let i = 0; i < currentStateMask.length; i++) {
            if (button.wires.includes(i)) {
                newStateMask += currentStateMask.charAt(i) === '.' ? '#' : '.';
            } else {
                newStateMask += currentStateMask.charAt(i);
            }
        }
        return newStateMask;
    }

    determineOneButtonPressesToEndStateMask(): Button[][] {
        const endStateMask = this.determineEndStateMask();
        const buttonsToPress: Button[][] = [];

        // Track the path of button presses to get to the end state mask where each button can only be pressed zero or one time to get there.
        const permutations = this.getAllPermutationsOfButtons();
        permutations.forEach(permutation => {
            let currentStateMask = this.initialStateMask;
            permutation.forEach(button => {
                currentStateMask = this.determineStateMaskFromButtonPress(button, currentStateMask);
            });
            if (currentStateMask === endStateMask) {
                const sortedPermutation = permutation.sort((a, b) => a.id.localeCompare(b.id));

                // Don't add the permutation if a similar permutation has already been added.
                if (buttonsToPress.some(p => p.every((button, index) => button.id === sortedPermutation[index].id))) {
                    return;
                }
                buttonsToPress.push(permutation.sort((a, b) => a.id.localeCompare(b.id)));
            }
        });
        return buttonsToPress;
    }

    getAllPermutationsOfButtons(): Button[][] {
        const permutations: Button[][] = [];

        function permute(currentPerm: Button[], remaining: Button[]) {
            if (remaining.length === 0) {
                permutations.push(currentPerm);
                return;
            }

            for (let i = 0; i < remaining.length; i++) {
                // Choose the next element
                const nextElement = remaining[i];
                // Create new arrays for the next recursive call
                const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
                const newPerm = currentPerm.concat(nextElement);

                permutations.push(newPerm);

                permute(newPerm, newRemaining);
            }
        }

        permute([], this.buttons);
        return permutations;
    }

    findShortestPathToGoalState(): number {
        let remainingJoltages = this.targetJoltages.map((target) => target);

        // Next, determine all of the ways you can press each button at most once to get to the end state mask
        const initialButtonPresses = this.determineOneButtonPressesToEndStateMask();
        let fewestButtonPresses = 9999999999;

        // Next, for each of these ways, start off by pressing those buttons.  Then we need to find a way to press the remaining buttons an even number of times that result in the final joltages.
        // Note: Once we press the initial buttons, we have to press each additional button at least twice.  So we can actually reduce the sample size by cutting the joltages in half, and multiplying the number of ways to press the remaining buttons by 2 at the end.
        initialButtonPresses.forEach((initialButtonsToPress: Button[]) => {
            let countButtonPresses = 0;

            let newRemainingJoltages = [...remainingJoltages];

            initialButtonsToPress.forEach(button => {
                countButtonPresses++;
                newRemainingJoltages = this.pressButton(newRemainingJoltages, button);
            });

            if (this.allZeroes(newRemainingJoltages)) {
                fewestButtonPresses = Math.min(fewestButtonPresses, countButtonPresses);
            } else {
                console.log(`Initial buttons to press: ${initialButtonsToPress.map(button => button.id).join(',')}`);
                console.log(`After pressing the initial ${countButtonPresses} buttons, the remaining joltages are: ${newRemainingJoltages.join(',')}`);
                console.log(`Target joltages: ${this.targetJoltages.join(',')}`);

                let pow = 1;
                let halfTargetJoltages = newRemainingJoltages.map(joltage => Math.floor(joltage / 2));

                while (halfTargetJoltages.every(joltage => joltage % 2 === 0)) {
                    halfTargetJoltages = halfTargetJoltages.map(joltage => joltage / 2);
                    pow++;
                }
                console.log(`Half target joltages: ${halfTargetJoltages.join(',')}`);
                
                console.log(`Count button presses: ${countButtonPresses}`);
                console.log(`Fewest button presses so far: ${fewestButtonPresses}`);
                console.log(`--------------------------------`);

                const requiredButtonPresses = this.solve(halfTargetJoltages);
                // console.log(`Required button presses for half target joltages: ${requiredButtonPresses}`);

                countButtonPresses += (Math.pow(2, pow) * requiredButtonPresses);
                
                fewestButtonPresses = Math.min(fewestButtonPresses, countButtonPresses);
                // console.log(`Fewest button presses: ${fewestButtonPresses}`);
                // console.log(`--------------------------------`);
            }
        });

        return fewestButtonPresses;
    }

    solve(joltagesToGo: number[]): number {
        let counter = 0;
        const rootNode = new GraphNode(counter++, joltagesToGo, 0);
        const queue: GraphNode[] = [rootNode];
        const cache: Map<number, boolean> = new Map<number, boolean>();
        
        while (queue.length > 0) {
            console.log(`Queue size: ${queue.length}`);
            const currentState = queue.shift();
            console.log(`Current state: ${currentState.state.join(',')}`);

            if (currentState.isValidState() === false) {
                throw new Error(`State is invalid: ${JSON.stringify(currentState.state)}, skipping`);
            }

            if (cache.has(currentState.id)) {
                console.log(`State already visited, skipping`);
                continue;
            }

            console.log(`State not visited, adding to cache`);
            cache.set(currentState.id, true);

            if (currentState.isGoalState()) {
                return currentState.depth;
            }

            const buttonsToPress = this.buttons.filter((button) =>{
                let invalid = button.wires.some(wire => currentState.state[wire] <= 0)
                return !invalid;
            });

            buttonsToPress.forEach(button => {
                const newState = new GraphNode(counter++, this.pressButton(currentState.state, button), currentState.depth + 1);
                currentState.addChild(newState);
                queue.push(newState);
            });
        }

        return 9999999999;
    }

    isGoalState(state: number[]): boolean {
        return state.every((value, index) => value === this.targetJoltages[index]);
    }

    isState(currentState: number[], targetState: number[]): boolean {
        return currentState.every((value, index) => value === targetState[index]);
    }

    isValidState(state: number[]): boolean {
        return state.every((value) => value >= 0);
    }
}
