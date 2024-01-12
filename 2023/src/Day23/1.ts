import { Map, Tile, TileType, TreeNode } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const map = new Map();

const execute = () => {
    map.initialize();
    map.print();

    const startingTile = map.getStartingTile();
    const goalTile = map.getGoalTile();

    const treeNodes: TreeNode[] = [];
    const root = map.generateTree(startingTile, treeNodes);

    const goalNodes = treeNodes.filter((node) => node.id === goalTile.id);
    const distancesToStart = goalNodes.map((node) => node.getDistanceToRoot());

    console.log(`There are ${goalNodes.length} paths to the goal node`);
    console.log(`The maximum distance is ${Math.max(...distancesToStart)}`);
};

const parseLine = (line: string) => {
    let row: Tile[] = [];

    line.split('').forEach((char) => {
        row.push(new Tile(char as TileType));
    });

    map.addRow(row);
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