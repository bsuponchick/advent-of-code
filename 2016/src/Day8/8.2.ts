import { Screen } from './8.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let commands: string[] = [];

const execute = () => {
    const screen = test ? new Screen(7, 3) : new Screen(50, 6);
    for(const command of commands) {
        screen.followCommand(command);
        if (debug) {
            screen.print();
        }
    }
    screen.print();
}

const parseLine = (line: string) => {
   commands.push(line);
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