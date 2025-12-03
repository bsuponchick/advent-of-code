const min = 0;
const max = 99;

interface TurnResult {
    position: number;
    goals: number;
}

const bruteForceTurnLeft = (args: { start: number, amount: number }): TurnResult => {
    let position = args.start;
    let goals = 0;

    for (let i = 0; i < args.amount; i++) {
        position = position - 1;
        if (position === min) {
            goals++;
        } else if (position === -1) {
            position = max;
        }
    }
    return { position, goals };
}

const bruteForceTurnRight = (args: { start: number, amount: number }): TurnResult => {
    let position = args.start;
    let goals = 0;

    for (let i = 0; i < args.amount; i++) {
        position = position + 1;
        if (position > max) {
            position = min;
            goals++;
        }
    }
    return { position, goals };
}

export const turnLeft = (args: { start: number, amount: number }): TurnResult => {
    return bruteForceTurnLeft(args);
}

export const turnRight = (args: { start: number, amount: number }): TurnResult => {
    return bruteForceTurnRight(args);
}