import { Instruction } from './6.1.logic';

export class LightGrid {
    public lights: number[][];

    constructor(maxX: number, maxY: number) {
        this.lights = [];

        for (let i = 0; i < maxX; i++) {
            this.lights[i] = [];

            for (let j = 0; j < maxY; j++) {
                this.lights[i][j] = 0;
            }
        }
    }

    applyInstruction(instruction: Instruction) {
        for (let i = instruction.start.x; i <= instruction.end.x; i++) {
            for (let j = instruction.start.y; j <= instruction.end.y; j++) {
                if (instruction.type === 'toggle') {
                    this.lights[i][j]+= 2;
                } else if (instruction.type === 'on') {
                    this.lights[i][j]+= 1;
                } else if (instruction.type === 'off') {
                    if (this.lights[i][j] > 0) {
                        this.lights[i][j]-= 1;
                    }
                }
            }
        }
    }

    calculateBrightness(): number {
        let brightness = 0;

        for (let i = 0; i < this.lights.length; i++) {
            for (let j = 0; j < this.lights[i].length; j++) {
                brightness += this.lights[i][j];
            }
        }

        return brightness;
    }
}