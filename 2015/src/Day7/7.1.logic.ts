export class Wire {
    id: string;
    value: number;

    constructor(id: string) {
        this.id = id;
        this.value = null;
    }

    setValue(value: number): void {
        this.value = value;
        this.print();
    }

    hasValue(): boolean {
        return this.value !== null;
    }

    reset(): void {
        this.value = null;
    }

    print(): void {
        console.log(`${this.id}: ${this.value}`);
    }
}

export interface Gate {
    canTrigger(): boolean;
    hasTriggered(): boolean;
    trigger(): void;
    print(): void;
    reset(): void;
    getOutput(): Wire;
}

export class AndGate implements Gate {
    input1: Wire | number;
    input2: Wire;
    output: Wire;
    triggered: boolean;

    constructor(input1: Wire | number, input2: Wire, output: Wire) {
        this.input1 = input1;
        this.input2 = input2;
        this.output = output;
        this.triggered = false;
    }

    canTrigger(): boolean {
        if (typeof this.input1 === 'number') {
            return this.input2.hasValue();
        } else {
            return this.input1.hasValue() && this.input2.hasValue();
        }
    }

    hasTriggered(): boolean {
        return this.triggered;
    }

    getOutput(): Wire {
        return this.output;
    }

    trigger(): void {
        if (typeof this.input1 === 'number') {
            this.output.setValue((this.input1 & 0xFFFF) & (this.input2.value & 0xFFFF));
        } else {
            this.output.setValue((this.input1.value & 0xFFFF) & (this.input2.value & 0xFFFF));
        }
        
        this.triggered = true;
    }

    reset(): void {
        this.triggered = false;
    }

    print(): void {
        if (typeof this.input1 === 'number') {
            console.log(`AND: ${this.input1} & ${this.input2.id}:${this.input2.value} -> ${this.output.id}:${this.output.value}`);
        } else {
            console.log(`AND: ${this.input1.id}:${this.input1.value} & ${this.input2.id}:${this.input2.value} -> ${this.output.id}:${this.output.value}`);
        }   
    }
}

export class OrGate implements Gate {
    input1: Wire | number;
    input2: Wire;
    output: Wire;
    triggered: boolean;

    constructor(input1: Wire | number, input2: Wire, output: Wire) {
        this.input1 = input1;
        this.input2 = input2;
        this.output = output;
        this.triggered = false;
    }

    canTrigger(): boolean {
        if (typeof this.input1 === 'number') {
            return this.input2.hasValue();
        } else {
            return this.input1.hasValue() && this.input2.hasValue();
        }
    }

    hasTriggered(): boolean {
        return this.triggered;
    }

    getOutput(): Wire {
        return this.output;
    }

    trigger(): void {
        if (typeof this.input1 === 'number') {
            this.output.setValue((this.input1 & 0xFFFF) | (this.input2.value & 0xFFFF));
        } else {
            this.output.setValue((this.input1.value & 0xFFFF) | (this.input2.value & 0xFFFF));
        }

        this.triggered = true;
    }

    reset(): void {
        this.triggered = false;
    }

    print(): void {
        if (typeof this.input1 === 'number') {
            console.log(`OR: ${this.input1} | ${this.input2.id}:${this.input2.value} -> ${this.output.id}:${this.output.value}`);
        } else {
            console.log(`OR: ${this.input1.id}:${this.input1.value} | ${this.input2.id}:${this.input2.value} -> ${this.output.id}:${this.output.value}`);
        }
    }
}

export class NotGate implements Gate {
    input1: Wire;
    output: Wire;
    triggered: boolean;

    constructor(input1: Wire, output: Wire) {
        this.input1 = input1;
        this.output = output;
        this.triggered = false;
    }

    canTrigger(): boolean {
        return this.input1.hasValue();
    }

    hasTriggered(): boolean {
        return this.triggered;
    }

    getOutput(): Wire {
        return this.output;
    }

    trigger(): void {
        this.output.setValue(~this.input1.value & 0xFFFF);
        this.triggered = true;
    }

    reset(): void {
        this.triggered = false;
    }

    print(): void {
        console.log(`NOT: ~${this.input1.id}:${this.input1.value} -> ${this.output.id}:${this.output.value}`);
    }
}

export class LShiftGate implements Gate {
    input1: Wire;
    input2: number;
    output: Wire;
    triggered: boolean;

    constructor(input1: Wire, input2: number, output: Wire) {
        this.input1 = input1;
        this.input2 = input2;
        this.output = output;
        this.triggered = false;
    }

    canTrigger(): boolean {
        return this.input1.hasValue();
    }

    hasTriggered(): boolean {
        return this.triggered;
    }

    getOutput(): Wire {
        return this.output;
    }

    trigger(): void {
        this.output.setValue((this.input1.value << this.input2) & 0xFFFF);
        this.triggered = true;
    }

    reset(): void {
        this.triggered = false;
    }

    print(): void {
        console.log(`LSHIFT: ${this.input1.id}:${this.input1.value} << ${this.input2} -> ${this.output.id}:${this.output.value}`);
    }
}

export class RShiftGate implements Gate {
    input1: Wire;
    input2: number;
    output: Wire;
    triggered: boolean;

    constructor(input1: Wire, input2: number, output: Wire) {
        this.input1 = input1;
        this.input2 = input2;
        this.output = output;
        this.triggered = false;
    }

    canTrigger(): boolean {
        return this.input1.hasValue();
    }

    hasTriggered(): boolean {
        return this.triggered;
    }

    getOutput(): Wire {
        return this.output;
    }

    trigger(): void {
        this.output.setValue((this.input1.value >> this.input2) & 0xFFFF);
        this.triggered = true;
    }

    reset(): void {
        this.triggered = false;
    }

    print(): void {
        console.log(`RSHIFT: ${this.input1.id}:${this.input1.value} >> ${this.input2} -> ${this.output.id}:${this.output.value}`);
    }
}

export class PassthroughGate implements Gate {
    input1: Wire;
    output: Wire;
    triggered: boolean;

    constructor(input1: Wire, output: Wire) {
        this.input1 = input1;
        this.output = output;
        this.triggered = false;
    }

    canTrigger(): boolean {
        return this.input1.hasValue();
    }

    getOutput(): Wire {
        return this.output;
    }

    hasTriggered(): boolean {
        return this.triggered;
    }

    trigger(): void {
        this.output.setValue(this.input1.value);
        this.triggered = true;
    }

    reset(): void {
        this.triggered = false;
    }

    print(): void {
        console.log(`PASSTHROUGH: ${this.input1.id}:${this.input1.value} -> ${this.output.id}:${this.output.value}`);
    }
}

export class DirectAssignmentGate implements Gate {
    input1: number;
    output: Wire;
    triggered: boolean;

    constructor(input1: number, output: Wire) {
        this.input1 = input1;
        this.output = output;
        this.triggered = false;
    }

    canTrigger(): boolean {
        return this.input1 !== null;
    }

    getOutput(): Wire {
        return this.output;
    }

    hasTriggered(): boolean {
        return this.triggered;
    }

    trigger(): void {
        this.output.setValue(this.input1);
        this.triggered = true;
    }

    reset(): void {
        this.triggered = false;
    }

    print(): void {
        console.log(`DIRECT ASSIGNMENT: ${this.input1} -> ${this.output.id}:${this.output.value}`);
    }
}