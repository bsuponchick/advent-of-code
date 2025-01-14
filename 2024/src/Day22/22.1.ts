import { getXthEvolution } from './22.1.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');
const test2 = args.includes('--test2');

const secrets: bigint[] = [];

const execute = () => {
   let sumOfFinalSecrets: bigint = 0n;
   let evolutionCache: Map<bigint, bigint> = new Map();

    secrets.forEach((secret) => {
         sumOfFinalSecrets += getXthEvolution(secret, 2000, evolutionCache);
    });

    console.log(`The sum of the final secrets is ${sumOfFinalSecrets}`);
}

const parseLine = (line: string) => {
    secrets.push(BigInt(line));
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : test2 ? './test2.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};