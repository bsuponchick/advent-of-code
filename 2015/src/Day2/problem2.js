var presents = [];
let paperRequired = 0;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

const calculateVolume = (length, width, height) => {
    return length * width * height;
}

const calculateRibbon = (length, width, height) => {
    const sides = [length, width, height];
    sides.sort((a, b) => {
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    });

    return (sides[0] * 2) + (sides[1] * 2);
}

lineReader.on('line', (line) => {
    presents.push(line);
}).on('close', () => {
    presents.forEach((present) => {
        const dimensions = present.split('x').map((value) => {
            return Number.parseInt(value, 10);
        });
        const volume = calculateVolume(dimensions[0], dimensions[1], dimensions[2]);
        const ribbon = calculateRibbon(dimensions[0], dimensions[1], dimensions[2]);

        paperRequired = paperRequired + volume + ribbon;
    });

    console.log(`The elves need ${paperRequired} feet of ribbon.`);
});
