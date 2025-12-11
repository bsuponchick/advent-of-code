import { Machine, Button } from './10.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const machines: Machine[] = [];

const execute = () => {
    let totalButtonPresses = 0;
    
    machines.forEach(machine => {
        machine.print();
        const buttonPresses = machine.findShortestPathToGoalState();
        totalButtonPresses += buttonPresses;

        console.log(`This machine required ${buttonPresses} button presses.`);
    });

    console.log(`Total button presses: ${totalButtonPresses}`);
}

const parseLine = (line: string) => {
    const parts = line.split(' ');
    let goalState = '';
    let buttons: Button[] = [];
    let joltage: number[] = [];
    
    parts.forEach(part => {
        if (part.charAt(0) === '[') {
            // Ignore this part
        } else if (part.charAt(0) === '(') {
            buttons.push(new Button(part.slice(1, part.length - 1).split(',').map(Number)));
        } else if (part.charAt(0) === '{') {
            joltage = part.slice(1, part.length - 1).split(',').map(Number);
            goalState = joltage.join('#');
        }
    });

    machines.push(new Machine(goalState, buttons));
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