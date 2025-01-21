export interface IWireObserver {
    notify(): void;
}

export class Wire {
    // -1 is no value, otherwise it should be 0 or 1
    private value: number = -1;
    private id: string = "";
    private observers: IWireObserver[] = [];
    
    constructor(id: string) {
        this.id = id;
    }

    getId(): string {
        return this.id;
    }

    setValue(value: number) {
        this.value = value;
        this.notifyObservers();
    }

    getValue(): number {
        return this.value;
    }

    addObserver(observer: IWireObserver): void {
        this.observers.push(observer);
    }

    notifyObservers(): void {
        this.observers.forEach(observer => observer.notify());
    }

    isZWire(): boolean {
        return this.id.startsWith('z');
    }
}

export class AndGate implements IWireObserver {
    private id: string = "";
    private input1: Wire;
    private input2: Wire;
    private output: Wire;

    constructor(id: string, input1: Wire, input2: Wire, output: Wire) {
        this.id = id;
        this.input1 = input1;
        this.input2 = input2;
        this.output = output;

        this.input1.addObserver(this);
        this.input2.addObserver(this);
    }

    notify(): void {
        if (this.input1.getValue() === -1 || this.input2.getValue() === -1) {
            return;
        } else {
            this.output.setValue(this.input1.getValue() & this.input2.getValue());
        }
    }
}

export class OrGate implements IWireObserver {
    private id: string = "";
    private input1: Wire;
    private input2: Wire;
    private output: Wire;

    constructor(id: string, input1: Wire, input2: Wire, output: Wire) {
        this.id = id;
        this.input1 = input1;
        this.input2 = input2;
        this.output = output;

        this.input1.addObserver(this);
        this.input2.addObserver(this);
    }

    notify(): void {
        if (this.input1.getValue() === -1 || this.input2.getValue() === -1) {
            return;
        } else {
            this.output.setValue(this.input1.getValue() | this.input2.getValue());
        }
    }
}

export class XorGate implements IWireObserver {
    private id: string = "";
    private input1: Wire;
    private input2: Wire;
    private output: Wire;

    constructor(id: string, input1: Wire, input2: Wire, output: Wire) {
        this.id = id;
        this.input1 = input1;
        this.input2 = input2;
        this.output = output;

        this.input1.addObserver(this);
        this.input2.addObserver(this);
    }

    notify(): void {
        if (this.input1.getValue() === -1 || this.input2.getValue() === -1) {
            return;
        } else {
            this.output.setValue(this.input1.getValue() ^ this.input2.getValue());
        }
    }
}