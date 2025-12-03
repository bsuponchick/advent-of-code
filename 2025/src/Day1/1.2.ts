import { turnLeft, turnRight } from './1.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let messages: string[] = [];

const execute = () => {
    let goalsReached = 0;
    let currentPosition = 50;

    messages.forEach((message) => {
        let direction = message.startsWith('L') ? 'left' : 'right';
        let amount = Number.parseInt(message.slice(1), 10);
        let turnResult: { position: number, goals: number };

        if (amount > 0) {
            if (direction === 'left') {
                turnResult = turnLeft({ start: currentPosition, amount});
            } else {
                turnResult = turnRight({ start: currentPosition, amount});
            }

            goalsReached += turnResult.goals;
            currentPosition = turnResult.position;
        }
    });

    console.log(`The count of goal reached is ${goalsReached}`);
}

const parseLine = (line: string) => {
   messages.push(line);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};