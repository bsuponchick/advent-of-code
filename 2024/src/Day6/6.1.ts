import { Guard } from './6.1.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const map: string[][] = [];

const execute = () => {
    const guard = new Guard(map);

    while (guard.move()) {
        if (debug) {
            console.log(`The guard is at ${guard.x},${guard.y} facing ${guard.direction}`);
            console.log(guard.map.map((row) => row.join('')).join('\n'));
            console.log();
        }
    }

    let countOfTilesVisited = 0;
    guard.map.forEach((row) => {
        row.forEach((tile) => {
            if (tile === 'X') {
                countOfTilesVisited++;
            }
        });
    });

    console.log(`The guard visited ${countOfTilesVisited} tiles.`);
}

const parseLine = (line: string) => {
    map.push(line.split(''));
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