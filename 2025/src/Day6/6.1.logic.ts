export interface Command {
    type: 'add' | 'multiply';
    values: number[];
}

export class CephalopodCalculator {
    public static add(...values: number[]): number {
        return values.reduce((acc, curr) => acc + curr, 0);
    }

    public static multiply(...values: number[]): number {
        return values.reduce((acc, curr) => acc * curr, 1);
    }

    public static executeCommandsAndAddResults(commands: Command[]): number {
        const results: number[] = [];

        for (const command of commands) {
            if (command.type === 'add') {
                const result = this.add(...command.values);
                console.log(`The result of the add command is ${result}`);
                results.push(this.add(...command.values));
            } else if (command.type === 'multiply') {
                const result = this.multiply(...command.values);
                console.log(`The result of the multiply command is ${result}`);
                results.push(this.multiply(...command.values));
            }
        }

        return this.add(...results);
    }
}