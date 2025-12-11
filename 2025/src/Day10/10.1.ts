import { Machine, Button } from './10.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const machines: Machine[] = [];

const execute = () => {
    machines.forEach(machine => {
        machine.print();
    });
}

const parseLine = (line: string) => {
    const parts = line.split(' ');
    let goalState = '';
    let buttons: Button[] = [];
    let joltage: number[] = [];
    
    parts.forEach(part => {
        if (part.charAt(0) === '[') {
            goalState = part.slice(1, part.length - 1);
        } else if (part.charAt(0) === '(') {
            buttons.push(new Button(part.slice(1, part.length - 1).split(',').map(Number)));
        } else if (part.charAt(0) === '{') {
            joltage = part.slice(1, part.length - 1).split(',').map(Number);
        }
    });

    machines.push(new Machine(goalState, buttons, joltage));
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