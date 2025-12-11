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