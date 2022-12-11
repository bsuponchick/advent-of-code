let overlaps = 0;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    const ranges = line.split(',');
    const leftRange = ranges[0].split('-').map((value) => Number.parseInt(value, 10));
    const rightRange = ranges[1].split('-').map((value) => Number.parseInt(value, 10));

    if ((leftRange[0] < rightRange[0])) {
        if (leftRange[1] >= rightRange[1]) {
            overlaps = overlaps + 1;
        }
    } else if (leftRange[0] > rightRange[0]) {
        if (rightRange[1] >= leftRange[1]) {
            overlaps = overlaps + 1;
        }
    } else {
        overlaps = overlaps + 1;
    }
}).on('close', () => {
    console.log(`The total number of groups who fully overlap is ${overlaps}`);
});
