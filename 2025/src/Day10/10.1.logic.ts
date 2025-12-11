export class Button {
    wires: number[];

    constructor(wires: number[]) {
        this.wires = wires;
    }
}

export class Machine {
    goalState: string;
    currentState: string;
    buttons: Button[];
    joltage: number[];

    constructor(goalState: string, buttons: Button[], joltage: number[]) {
        this.goalState = goalState;
        this.buttons = buttons;
        this.joltage = joltage;

        this.currentState = '';
        this.initialize();
    }

    initialize(): void {
        for (let i = 0; i < this.goalState.length; i++) {
            this.currentState += '.';
        }
    }

    setState(state: string): void {
        this.currentState = state;
    }

    print(): void {
        console.log(`Goal state: ${this.goalState}`);
        console.log(`Current state: ${this.currentState}`);
        console.log(`Buttons: ${this.buttons.map(button => button.wires.join(',')).join(' ')}`);
        console.log(`Joltage: ${this.joltage.join(',')}`);
        console.log('--------------------------------');
    }

    pressButton(button: Button): void {
        let newState = '';
        // Pressing a button will change the current state of the machine by flipping each bit in the button's wires
        for (let i = 0; i < button.wires.length; i++) {
            newState += this.currentState.charAt(button.wires[i]) === '.' ? '#' : '.';
        }
        this.setState(newState);
    }

    isInGoalState(): boolean {
        return this.currentState === this.goalState;
    }
}