export class Computer {
    aRegister: number;
    bRegister: number;
    cRegister: number;
    instructionPointer: number;
    outputs: number[];

    constructor() {
        this.aRegister = 0;
        this.bRegister = 0;
        this.cRegister = 0;
        this.instructionPointer = 0;
        this.outputs = [];
    }

    setARegister(value: number) {
        this.aRegister = value;
    }

    setBRegister(value: number) {
        this.bRegister = value;
    }

    setCRegister(value: number) {
        this.cRegister = value;
    }

    executeInstruction(instruction: number, operand: number): void {
        switch (instruction) {
            case 0:
                this.advInstruction(operand);
                break;
            case 1:
                this.bxlInstruction(operand);
                break;
            case 2:
                this.bstInstruction(operand);
                break;
            case 3:
                this.jnzInstruction(operand);
                break;
            case 4:
                this.bxcInstruction();
                break;
            case 5:
                this.outInstruction(operand);
                break;
            case 6:
                this.bdvInstruction(operand);
                break;
            case 7:
                this.cdvInstruction(operand);
                break;
            default:
                break;
        }
    }

    getComboValue(value: number): number {
        switch (value) {
            case 0:
            case 1:
            case 2:
            case 3:
                return value;
            case 4:
                return this.aRegister;
            case 5:
                return this.bRegister;
            case 6:
                return this.cRegister;
            default:
                throw new Error(`Invalid operand value: ${value}`);
        }
    }

    advInstruction(operand: number) {
        let result = this.aRegister / Math.pow(2, this.getComboValue(operand));
        this.setARegister(Math.floor(result));
        this.instructionPointer += 2;
    }

    bxlInstruction(operand: number) {
        let result = this.bRegister ^ operand;
        this.setBRegister(result);
        this.instructionPointer += 2;
    }

    bstInstruction(operand: number) {
        let result = this.getComboValue(operand) % 8;
        this.setBRegister(result);
        this.instructionPointer += 2;
    }

    jnzInstruction(operand: number) {
        if (this.aRegister === 0) {
            this.instructionPointer += 2;
        } else {
            this.instructionPointer = operand;
        }
    }

    bxcInstruction() {
        let result = this.bRegister ^ this.cRegister;
        this.setBRegister(result);
        this.instructionPointer += 2;
    }

    outInstruction(operand: number) {
        let result = this.getComboValue(operand) % 8;
        this.outputs.push(result);
        this.instructionPointer += 2;
    }

    bdvInstruction(operand: number) {
        let result = this.aRegister / Math.pow(2, this.getComboValue(operand));
        this.setBRegister(Math.floor(result));
        this.instructionPointer += 2;
    }

    cdvInstruction(operand: number) {
        let result = this.aRegister / Math.pow(2, this.getComboValue(operand));
        this.setCRegister(Math.floor(result));
        this.instructionPointer += 2;
    }

    executeProgram(instructions: number[]) {
        while (this.instructionPointer < instructions.length - 1) {
            this.executeInstruction(instructions[this.instructionPointer], instructions[this.instructionPointer + 1]);
        }
    }
}