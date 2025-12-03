import { Lock } from './1.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let messages: string[] = [];
let countGoalReached = 0;

const execute = () => {
    const lock = new Lock({
        position: 50,
        min: 0,
        max: 99,
        goal: 0
    });

    messages.forEach((message) => {
        let direction = message.startsWith('L') ? 'left' : 'right';
        let amount = Number.parseInt(message.slice(1), 10);

        if (direction === 'left') {
            lock.turnLeft(amount);
        } else {
            lock.turnRight(amount);
        }

        if (lock.isGoal()) {
            countGoalReached++;
        }
    });

    console.log(`The count of goal reached is ${countGoalReached}`);
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