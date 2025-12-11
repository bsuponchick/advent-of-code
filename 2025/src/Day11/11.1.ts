import { topologicalSortDFS, determineNumberOfPathsToGoalState } from './11.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const graph: Map<string, string[]> = new Map<string, string[]>();

const execute = () => {
    console.log(`The graph is: $${JSON.stringify(graph)}`);

    const sortedNodes = topologicalSortDFS(graph);
    console.log(`The sorted nodes are: $${JSON.stringify(sortedNodes)}`);

    const numberOfPathsToGoalState = determineNumberOfPathsToGoalState({ graph, goal: 'out', start: 'you' });
    console.log(`The number of paths to the goal state is: ${numberOfPathsToGoalState}`);
}

const parseLine = (line: string) => {
   const parts = line.split(': ');
   const node = parts[0];
   const neighbors = parts[1].split(' ');
   graph.set(node, neighbors);
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