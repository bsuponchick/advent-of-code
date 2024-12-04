import { Report } from './2.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const reports: Report[] = [];
let count = 0;

const execute = () => {
    let countOfSafeReports = 0;

    reports.forEach((report, index) => {
        if (report.determineIfSafe()) {
            console.log(`${JSON.stringify(report.levels)} Safe`);
            countOfSafeReports++;
        } else {
            console.log(`${JSON.stringify(report.levels)} Not Safe`);
        }
    });

    console.log(`There are ${countOfSafeReports} safe reports.`);
}

const parseLine = (line: string) => {
    const levels = line.split(' ').map((level) => parseInt(level));
    const report = new Report(count, levels);
    count++;

    reports.push(report);
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