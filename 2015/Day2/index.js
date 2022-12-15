var presents = [];
let paperRequired = 0;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

const calculateSurfaceArea = (length, width, height) => {
    return (2 * length * width) + (2 * width * height) + (2 * height * length);
}

const calculateSlack = (length, width, height) => {
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

    return sides[0] * sides[1];
}

lineReader.on('line', (line) => {
    presents.push(line);
}).on('close', () => {
    presents.forEach((present) => {
        const dimensions = present.split('x').map((value) => {
            return Number.parseInt(value, 10);
        });
        const surfaceArea = calculateSurfaceArea(dimensions[0], dimensions[1], dimensions[2]);
        const slack = calculateSlack(dimensions[0], dimensions[1], dimensions[2]);

        paperRequired = paperRequired + surfaceArea + slack;
    });

    console.log(`The elves need ${paperRequired} square feet of wrapping paper.`);
});
