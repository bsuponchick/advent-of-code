import { createGraph } from './13.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let message: string = '';

const execute = () => {
    const graph = createGraph(50, 50, test ? 10 : 1364);
    const startingNode = graph.getNode('1,1');
    const endNode = test ? graph.getNode('7,4') : graph.getNode('31,39');
    const shortestPath = graph.findShortestPath(startingNode, endNode);
    console.log(`The shortest path is ${shortestPath.distance}`);
}

const parseLine = (line: string) => {
   message = line;
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