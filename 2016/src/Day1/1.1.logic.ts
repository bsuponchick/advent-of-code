import { Coordinate } from '../utils/interfaces/coordinate';

export enum Direction {
    North = 'north',
    East = 'east',
    South = 'south',
    West = 'west',
}

interface Instruction {
    turn: string;
    steps: number;
}

export class Traveler {
    coordinate: Coordinate;
    direction: Direction;

    constructor(coordinate: Coordinate) {
        this.coordinate = coordinate;
        this.direction = Direction.North;
    }

    faceDirection(direction: Direction): void {
        this.direction = direction;
    }

    turnRight(): void {
        switch (this.direction) {
            case Direction.North:
                this.direction = Direction.East;
                break;
            case Direction.East:
                this.direction = Direction.South;
                break;
            case Direction.South:
                this.direction = Direction.West;
                break;
            case Direction.West:
                this.direction = Direction.North;
                break;
            default:
                break;
        }
    }

    turnLeft(): void {
        switch (this.direction) {
            case Direction.North:
                this.direction = Direction.West;
                break;
            case Direction.West:
                this.direction = Direction.South;
                break;
            case Direction.South:
                this.direction = Direction.East;
                break;
            case Direction.East:
                this.direction = Direction.North;
                break;
            default:
                break;
        }
    }

    moveForward(steps: number): void {
        switch (this.direction) {
            case Direction.North:
                this.coordinate.y += steps;
                break;
            case Direction.East:
                this.coordinate.x += steps;
                break;
            case Direction.South:
                this.coordinate.y -= steps;
                break;
            case Direction.West:
                this.coordinate.x -= steps;
                break;
            default:
                break;
        }
    }

    parseInstruction(instruction: string): Instruction {
        let turn = instruction.charAt(0);
        let steps = parseInt(instruction.substring(1));

        return { turn, steps};
    }

    followInstructions(instructions: string[]): void {
        instructions.forEach(instruction => {
            const { turn, steps } = this.parseInstruction(instruction);
            if (turn === 'R') {
                this.turnRight();
            } else {
                this.turnLeft();
            }
            this.moveForward(steps);
        });
    }

    calculateDistance(): number {
        return Math.abs(this.coordinate.x) + Math.abs(this.coordinate.y);
    }
}