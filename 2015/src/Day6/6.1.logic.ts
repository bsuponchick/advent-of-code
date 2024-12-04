interface Coordinate {
    x: number;
    y: number;
}

export class Instruction {
    public type: string;
    public start: Coordinate;
    public end: Coordinate;

    constructor(input: string) {
        let parts = input.split(' ');

        if (parts[0] === 'toggle') {
            this.type = 'toggle';
            this.start = this.parseXY(parts[1]);
            this.end = this.parseXY(parts[3]);
        } else if (parts[1] === 'on') {
            this.type = 'on';
            this.start = this.parseXY(parts[2]);
            this.end = this.parseXY(parts[4]);
        } else if (parts[1] === 'off') {
            this.type = 'off';
            this.start = this.parseXY(parts[2]);
            this.end = this.parseXY(parts[4]);
        } else {
            throw new Error('Invalid instruction');
        }
    }

    parseXY(input: string): Coordinate {
        let parts = input.split(',');

        return { x: parseInt(parts[0]), y: parseInt(parts[1]) };
    }
}

export class LightGrid {
    public lights: boolean[][];

    constructor(maxX: number, maxY: number) {
        this.lights = [];

        for (let i = 0; i < maxX; i++) {
            this.lights[i] = [];

            for (let j = 0; j < maxY; j++) {
                this.lights[i][j] = false;
            }
        }
    }

    applyInstruction(instruction: Instruction) {
        for (let i = instruction.start.x; i <= instruction.end.x; i++) {
            for (let j = instruction.start.y; j <= instruction.end.y; j++) {
                if (instruction.type === 'toggle') {
                    this.lights[i][j] = !this.lights[i][j];
                } else if (instruction.type === 'on') {
                    this.lights[i][j] = true;
                } else if (instruction.type === 'off') {
                    this.lights[i][j] = false;
                }
            }
        }
    }

    countLightsThatAreOn(): number {
        let count = 0;

        for (let i = 0; i < this.lights.length; i++) {
            for (let j = 0; j < this.lights[i].length; j++) {
                if (this.lights[i][j]) {
                    count++;
                }
            }
        }

        return count;
    }
}