import { Keypad } from './2.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let instructions: string[] = [];

const execute = () => {
    const keypad = new Keypad();
    let code = '';

    instructions.forEach((instruction) => {
        code += keypad.followDirectionsAndReturnCode(instruction).toString();
    });

    console.log(`The code is ${code}`);
}

const parseLine = (line: string) => {
   instructions.push(line);
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