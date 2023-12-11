import { Node, parseNodes, establishConnections, identifyTilesSurroundedByPipes, expandMap, findStartingNode, getCircuit } from "./2.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const nodes: Node[][] = [];
const map: string[] = [];

const execute = () => {
    console.log(`--------- Initial Map ---------`);
    map.forEach(line => {
        console.log(line);
    });

    const expandedMap: string[] = expandMap(map);

    console.log(`--------- Expanded Map ---------`);
    expandedMap.forEach(line => {
        console.log(line);
    });
    
    expandedMap.forEach(line => { 
        nodes.push(parseNodes(line));
    });

    establishConnections(nodes);

    const startingNode = findStartingNode(nodes);

    if (startingNode === null) {
        throw new Error('Starting node was null');
    } else {
        const circuit = getCircuit(startingNode);
    }

    const tilesSurroundedByPipes = identifyTilesSurroundedByPipes(nodes);

    console.log(`--------- Tiles ---------`);
    nodes.forEach(line => {
        console.log(line.map(node => node.visited ? '#' : node.value).join(''));
    });

    console.log(`Tiles surrounded by pipes: ${tilesSurroundedByPipes.length}`);
}

const parseLine = (line: string) => {
    map.push(line);
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