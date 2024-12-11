import { Hiker, Tile, HikingMap } from  './10.2.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const hikingMap = new HikingMap();
const trailheads: Tile[] = [];
const scores: number[] = [];

const execute = () => {
    hikingMap.connectTiles();

    if (debug) {
        console.log(`The hiking map looks like this:\n`);
        hikingMap.print();
    }

    trailheads.forEach((trailhead, index) => {
        const hiker = new Hiker(trailhead, { debug });
        hiker.hike();

        const score = hikingMap.calculateScore();
        console.log(`Trailhead ${index} has a score of ${score}`);
        scores.push(score);

        hikingMap.reset();
    });

    let sumOfScores = scores.reduce((acc, score) => acc + score, 0);
    console.log(`The sum of all scores is ${sumOfScores}`);
}

const parseLine = (line: string) => {
    const row: Tile[] = [];

    line.split('').forEach((character, index) => {
        const value = Number.parseInt(character, 10);
        const tile = new Tile(value);

        row.push(tile);

        if (value === 0) {
            trailheads.push(tile);
        }
    });

    hikingMap.addRow(row);
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