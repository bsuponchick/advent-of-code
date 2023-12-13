import { parseSprings, determinePossibleValidArrangements } from "./2.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const lines: string[] = [];

const execute = () => {
    const validConfigurations = lines.map((line) => {
        return determinePossibleValidArrangements(line);
    });

    const sumOfValidConfigurations = validConfigurations.reduce((sum, validConfiguration) => sum + validConfiguration, 0);
    console.log(`Sum of valid configurations: ${sumOfValidConfigurations}`);
};

const parseLine = (line: string) => {
   lines.push(line);
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