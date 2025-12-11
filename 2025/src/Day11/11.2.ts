import { countPathsFromSvrToOut } from './11.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const graph: Map<string, string[]> = new Map<string, string[]>();

const execute = () => {
    console.log(`The graph is: $${JSON.stringify(graph)}`);

    const paths = countPathsFromSvrToOut(graph);

    console.log(`The number of paths to the goal state is: ${paths}`);
}

const parseLine = (line: string) => {
   const parts = line.split(': ');
   const node = parts[0];
   const neighbors = parts[1].split(' ');
   graph.set(node, neighbors);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test2.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};