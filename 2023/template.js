const arguments = process.argv;
const debug = arguments.includes('--debug');
const test = arguments.includes('--test');

execute = () => {
    // This is where you add your code
}

parseLine = (line) => {
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