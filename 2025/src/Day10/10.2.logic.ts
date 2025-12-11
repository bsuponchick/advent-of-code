export class Button {
    wires: number[];

    constructor(wires: number[]) {
        this.wires = wires;
    }
}

export class Machine {
    goalState: string;
    buttons: Button[];
    initialState: string;

    constructor(goalState: string, buttons: Button[]) {
        this.goalState = goalState;
        this.buttons = buttons;
        this.initialState = goalState.split('#').map(() => '0').join('#');
    }

    print(): void {
        console.log(`Goal state: ${this.goalState}`);
        console.log(`Initial state: ${this.initialState}`);
        console.log(`Buttons: ${this.buttons.map(button => button.wires.join(',')).join(' ')}`);
        console.log('--------------------------------');
    }

    pressButton(currentState: string, button: Button): string {
        const currentStateArray = currentState.split('#').map(Number);
        let newState: number[] = [];

        // Pressing a button will change the current state of the machine by flipping each bit in the button's wires
        for (let i = 0; i < currentStateArray.length; i++) {
            if (button.wires.includes(i)) {
                newState[i] = currentStateArray[i] + 1;
            } else {
                newState[i] = currentStateArray[i];
            }
        }
        return newState.join('#');
    }

    findShortestPathToGoalState(): number {
        if (this.initialState === this.goalState) {
            return 0;
        }

        const cache: Map<string, boolean> = new Map<string, boolean>();

        // Start by determining if there are any buttons with a wire that only appears once
        const wireCounts = new Map<number, number>();
        this.buttons.forEach(button => {
            button.wires.forEach(wire => {
                wireCounts.set(wire, (wireCounts.get(wire) || 0) + 1);
            });
        });

        let steps = 0;
        let goalReached = false;

        // First, we need to press any buttons with a wire that only appears once and then remove those buttons from being pressed again
        const singleWireButtons = this.buttons.filter(button => button.wires.some(wire => wireCounts.get(wire) === 1));
        let startingState = this.initialState;

        if (singleWireButtons.length > 0) {
            // We know we have to press these button exacly n times, where n is the number in the goal state for the corresponding wire.
            singleWireButtons.forEach(button => {
                // Find the wire that only appears once
                const wire = button.wires.find(wire => wireCounts.get(wire) === 1);

                const numberOfPresses = Number(this.goalState.split('#')[wire]);
                console.log(`Pressing button ${button.wires.join(',')} ${numberOfPresses} times`);
                for (let i = 0; i < numberOfPresses; i++) {
                    startingState = this.pressButton(startingState, button);
                    steps++;
                }

                this.buttons = this.buttons.filter(b => b !== button);
                console.log(`Buttons after pressing button: ${this.buttons.map(button => button.wires.join(',')).join(' ')}`);
            });

        }
        
        let statesToEvaluate: string[] = [startingState];

        while (goalReached === false) {
            const statesThisRound: string[] = [];

            statesToEvaluate.forEach(state => {
                if (!cache.has(state)) {
                    cache.set(state, true);

                    const newStates: string[] = [];

                    this.buttons.forEach(button => {
                        const potentialNewState = this.pressButton(state, button);
                        // console.log(`Potential new state: ${potentialNewState}`);
                        if (this.isValidState(potentialNewState)) { 
                            newStates.push(potentialNewState);
                        }                        
                    });

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

    isValidState(state: string): boolean {
        const stateArray = state.split('#').map(Number);
        const goalStateArray = this.goalState.split('#').map(Number);

        return stateArray.every((value, index) => value <= goalStateArray[index]);
    }
}