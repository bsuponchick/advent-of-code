import { Node, parseNodes, establishConnections, findStartingNode, getCircuit } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const map: Node[][] = [];

const execute = () => {   
    establishConnections(map);

    const startingNode = findStartingNode(map);

    if (startingNode === null) {
        throw new Error('Starting node was null');
    } else {
        const circuit = getCircuit(startingNode);

        console.log(`Furthest node is a distance of ${circuit.length / 2}`);
    }
}

const parseLine = (line: string) => {
    map.push(parseNodes(line));
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