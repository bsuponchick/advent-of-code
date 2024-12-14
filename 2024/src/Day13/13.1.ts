import { ClawMachine, ButtonPress, Coordinate } from './13.1.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let buttonAInput: string;
let buttonBInput: string;

const clawMachines: ClawMachine[] = [];

const execute = () => {
    console.log(`There are ${clawMachines.length} claw machines to calculate.`);

    let totalTokensRequired = 0;

    clawMachines.forEach((clawMachine) => {
        try {
            const score = clawMachine.calculateCheapestPathToGoal();
            totalTokensRequired += score;
        } catch (e) {
            // Claw machine had no unique solution
        }
    });

    console.log(`Total tokens required: ${totalTokensRequired}`);
}

const parseLine = (line: string) => {
    if (line.trim().length === 0) {
        return;
    }

    if (line.indexOf('Button A') === 0) {
        buttonAInput = line;
    } else if (line.indexOf('Button B') === 0) {
        buttonBInput = line;
    } else {
        const buttonAParts = buttonAInput.slice(10).split(', ');
        const buttonBParts = buttonBInput.slice(10).split(', ');
        const goalPars = line.slice(7).split(', ');

        const buttonAPress: ButtonPress = {
            x: Number.parseInt(buttonAParts[0].slice(2), 10),
            y: Number.parseInt(buttonAParts[1].slice(2), 10)
        };

        const buttonBPress: ButtonPress = {
            x: Number.parseInt(buttonBParts[0].slice(2), 10),
            y: Number.parseInt(buttonBParts[1].slice(2), 10)
        };

        const goal: Coordinate = {
            x: Number.parseInt(goalPars[0].slice(2), 10),
            y: Number.parseInt(goalPars[1].slice(2), 10)
        }

        clawMachines.push(new ClawMachine(goal, buttonAPress, buttonBPress));
        buttonAInput = '';
        buttonBInput = '';
    }
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