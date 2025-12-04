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
    visitedCoordinates: Map<string, number> = new Map();

    constructor(coordinate: Coordinate) {
        this.coordinate = coordinate;
        this.direction = Direction.North;
        this.visitCoordinate(coordinate);
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
                this.visitCoordinate(this.coordinate);
                break;
            case Direction.East:
                this.coordinate.x += steps;
                this.visitCoordinate(this.coordinate);
                break;
            case Direction.South:
                this.coordinate.y -= steps;
                this.visitCoordinate(this.coordinate);
                break;
            case Direction.West:
                this.coordinate.x -= steps;
                this.visitCoordinate(this.coordinate);
                break;
            default:
                break;
        }
    }

    visitCoordinate(coordinate: Coordinate): void {
        if (this.visitedCoordinates.has(`${coordinate.x},${coordinate.y}`)) {
            this.visitedCoordinates.set(`${coordinate.x},${coordinate.y}`, this.visitedCoordinates.get(`${coordinate.x},${coordinate.y}`) + 1);
        } else {
            this.visitedCoordinates.set(`${coordinate.x},${coordinate.y}`, 1);
        }
    }

    parseInstruction(instruction: string): Instruction {
        let turn = instruction.charAt(0);
        let steps = parseInt(instruction.substring(1));

        return { turn, steps};
    }

    followInstructionsUntilVisitedCoordinateTwice(instructions: string[]): void {
        let visitedCoordinateTwice = false;
        
        instructions.forEach(instruction => {
            if (visitedCoordinateTwice) {
                return;
            }

            const { turn, steps } = this.parseInstruction(instruction);
            if (turn === 'R') {
                this.turnRight();
            } else {
                this.turnLeft();
            }

            for (let i = 0; i < steps; i++) {
                this.moveForward(1);

                if (this.visitedCoordinates.get(`${this.coordinate.x},${this.coordinate.y}`) > 1) {
                    console.log(`Visited coordinate: ${this.coordinate.x}, ${this.coordinate.y} ${this.visitedCoordinates.get(`${this.coordinate.x},${this.coordinate.y}`)} times`);
                    visitedCoordinateTwice = true;
                    return;
                }
            }
        });
    }

    calculateDistance(): number {
        return Math.abs(this.coordinate.x) + Math.abs(this.coordinate.y);
    }
}