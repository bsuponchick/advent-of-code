export const cpy = (x: string, y: string, registers: { [key: string]: number }) => {
    let value = 0;

    if (registers[x] === undefined) {
        value = Number(x);
    } else {
        value = registers[x];
    }

    console.log(`Setting register ${y} to ${x}`);
    registers[y] = value;
}

export const inc = (x: string, registers: { [key: string]: number }) => {
    console.log(`Current value of register ${x} is ${registers[x]}`);
    console.log(`Incrementing register ${x} to ${registers[x] + 1}`);
    const value = registers[x] || 0;
    registers[x] = value + 1;
}

export const dec = (x: string, registers: { [key: string]: number }) => {
    const value = registers[x] || 0;
    registers[x] = value - 1;
}

export const jnz = (x: string, y: string, registers: { [key: string]: number }, instructionPointer: number): number => {
    let value = 0;
    if (registers[x] === undefined) {
        value = Number(x);
    } else {
        value = registers[x];
    }

    if (value !== 0) {
        return instructionPointer + Number(y);
    }

    return instructionPointer + 1;
}

export class Instruction { 
    public type: string;
    public x: string;
    public y: string;

    constructor(type: string, x: string, y: string| null) {
        this.type = type;
        this.x = x;
        this.y = y;
    }

    execute(instructionPointer: number, registers: { [key: string]: number }): number {
        switch (this.type) {
            case 'cpy':
                cpy(this.x, this.y as string, registers);
                break;
            case 'inc':
                inc(this.x, registers);
                break;
            case 'dec':
                dec(this.x, registers);
                break;
            case 'jnz':
                return jnz(this.x, this.y, registers, instructionPointer);
            default:
                throw new Error(`Invalid instruction: ${this.type}`);
        }

        return instructionPointer + 1;
    }
}