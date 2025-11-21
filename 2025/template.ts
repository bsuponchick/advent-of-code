const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const execute = () => {
    // This is where you add your code
}

const parseLine = (line) => {
    // Include line parsing logic here
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