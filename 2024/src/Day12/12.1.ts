import { Garden, GardenPlot } from './12.1.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let garden = new Garden();

const execute = () => {
    garden.connectPlots();
    garden.markRegions();

    console.log(`The total price of fencing is ${garden.calculateTotalPriceOfFencing()}`);
}

const parseLine = (line: string) => {
    let row = line.split('').map((label) => new GardenPlot(label));
    garden.addRow(row);
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