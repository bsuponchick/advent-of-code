import { count } from 'console';
import { Node } from './8.1.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const map: Node[][] = [];
const nodesWithSymbols: Map<string, Node[]> = new Map();

const execute = () => {
    const symbols = Array.from(nodesWithSymbols.keys());
    
    symbols.forEach((symbol) => {
        const nodes = nodesWithSymbols.get(symbol);
        
        if (nodes.length === 1) {
            console.log(`Symbol ${symbol} has only one node.`);
        } else {
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const nodeA = nodes[i];
                    const nodeB = nodes[j];

                    const potentialAntiNodes = nodeA.getAntiNodeCoordinates(nodeB);

                    potentialAntiNodes.forEach((coordinate) => {
                        if (coordinate.x >= 0 && coordinate.x < map[0].length && coordinate.y >= 0 && coordinate.y < map.length) {
                            const potentialAntiNode = map[coordinate.y][coordinate.x];
                            potentialAntiNode.addAntiNode(symbol);
                        }
                    });
                }
            }
        }
    });

    let countAntiNodes = 0;

    map.forEach((row) => {
        row.forEach((node) => {
            if (node.hasAntiNode()) {
                countAntiNodes++;
            }
        });
    });

    console.log(`There are ${countAntiNodes} antiNodes.`);
}

const parseLine = (line: string) => {
    const row: Node[] = [];

    line.split('').forEach((symbol, x) => {
        const node = new Node(symbol, { x, y: map.length });
        row.push(node);
        
        if (symbol !== '.') {
            if (nodesWithSymbols.has(symbol)) {
                nodesWithSymbols.get(symbol).push(node);
            } else {
                nodesWithSymbols.set(symbol, [node]);
            }
        }
    });

    map.push(row);
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