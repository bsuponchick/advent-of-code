import { Machine, Button } from './10.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const machines: Machine[] = [];

const execute = () => {
    let totalButtonPresses = 0;
    
    machines.forEach((machine, index) => {
        // machine.print();
        if (index > 0) return;

        // const endStateMask = machine.determineEndStateMask();
        // console.log(`End state mask: ${endStateMask}`);

        const buttonsToPress = machine.determineOneButtonPressesToEndStateMask();
        console.log(`There are ${buttonsToPress.length} ways to press the buttons for machine ${index + 1} to get to the end state mask.`);


        const buttonPresses = machine.findShortestPathToGoalState();
        totalButtonPresses += buttonPresses;

        console.log(`Machine ${index + 1} required ${buttonPresses} button presses.`);
        // const buttonPresses = machine.findShortestPathToGoalState();
        // totalButtonPresses += buttonPresses;

        // console.log(`This machine required ${buttonPresses} button presses.`);
    });

    console.log(`Total button presses: ${totalButtonPresses}`);
}

const parseLine = (line: string) => {
    const parts = line.split(' ');
    let buttons: Button[] = [];
    let joltage: number[] = [];
    
    parts.forEach(part => {
        if (part.charAt(0) === '[') {
            // Ignore this part
        } else if (part.charAt(0) === '(') {
            buttons.push(new Button(part, part.slice(1, part.length - 1).split(',').map(Number)));
        } else if (part.charAt(0) === '{') {
            joltage = part.slice(1, part.length - 1).split(',').map(Number);
        }
    });

    machines.push(new Machine(joltage, buttons));
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