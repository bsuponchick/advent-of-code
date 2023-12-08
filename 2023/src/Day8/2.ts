import { Node, determineStepsInPath, determineStartingNodes } from "./2.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const instructions: string[] = [];
const nodes: { [id: string]: Node } = {};

const execute = () => {
    if (debug) {
        console.log(`There are ${instructions.length} instructions`);
        console.log(`There are ${Object.keys(nodes).length} nodes`);
        
        const orderedKeys = Object.keys(nodes).sort();
        for (let i = 0; i < orderedKeys.length; i++) {
            const key = orderedKeys[i];
            nodes[key].print();
        }
    }

    const startingNodes = determineStartingNodes(Object.values(nodes));
    const stepsInPath = determineStepsInPath({ nodes, startingNodes, instructions });

    console.log(`The length of the path is ${stepsInPath}`);;
}

const parseLine = (line: string) => {
    if (line.length === 0) return;

    if (line.indexOf(' = ') === -1) {
        // This is the first line
        instructions.push(...line.split(''));
    } else {
        // This is a node
        const [id, neighbors] = line.split(' = ');
        const [left, right] = neighbors.split(', ');
        
        const node = new Node(id, left.replace('(', ''), right.replace(')', ''));
        nodes[id] = node;
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