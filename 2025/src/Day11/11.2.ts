import { findAllPaths } from './11.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const graph: Map<string, string[]> = new Map<string, string[]>();

const execute = () => {
    console.log(`The graph is: $${JSON.stringify(graph)}`);

    const paths = findAllPaths({
        startNode: 'svr',
        endNode: 'out',
        graph: graph,
    });

    console.log(`The paths are: $${JSON.stringify(paths)}`);

    const pathsContainingDACandFFT = paths.filter(path => path.includes('dac') && path.includes('fft'));

    console.log(`The number of paths to the goal state is: ${pathsContainingDACandFFT.length}`);
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