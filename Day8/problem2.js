var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

const trees = [];

class PlantedTree {
    constructor (height) {
        this.height = height;
        this.top = null;
        this.left = null;
        this.bottom = null;
        this.right = null;
    }

    getRange = (currentRange, direction, maxHeight) => {
        if (this[direction] === null) {
            // console.log(`Edge detected, stopping at range ${currentRange}`);
            return currentRange;
        } else if (maxHeight > this[direction].height) {
            // console.log(`Found tree of height ${this[direction].height}, which is less than ${maxHeight}, rolling on with range of ${currentRange + 1}`);
            return this[direction][direction] === null ? currentRange : this[direction].getRange(currentRange + 1, direction, maxHeight);
        } else {
            // console.log(`View is blocked by tree of height ${this[direction].height}, stopping at range ${currentRange}`);
            return currentRange;
        }
    }
}

lineReader.on('line', (line) => {
    const row = [];

    for (let i = 0; i < line.length; i++) {
        row.push(new PlantedTree(Number.parseInt(line.charAt(i), 10)));
    }

    trees.push(row);
}).on('close', () => {
    const numRows = trees.length;
    const numColumns = trees[0].length;
    let maxScore = 0;

    for (let row = 0; row < numRows; row++) {
        for (let column = 0; column < numColumns; column++) {
            const tree = trees[row][column];

            if (row > 0) {
                tree.top = trees[row - 1][column];
            }

            if (row < (numRows - 1)) {
                tree.bottom = trees[row + 1][column];
            }

            if (column > 0) {
                tree.left = trees[row][column - 1];
            }

            if (column < (numColumns - 1)) {
                tree.right = trees[row][column + 1];
            }
        }
    }

    for (let row = 0; row < numRows; row++) {
        for (let column = 0; column < numColumns; column++) {
            const tree = trees[row][column];

            console.log(`Evaluating tree of height ${tree.height}`);

            // Get Visibility
            const leftRange = tree.left === null ? 0 : tree.getRange(1, 'left', tree.height);
            const rightRange = tree.right === null ? 0 : tree.getRange(1, 'right', tree.height);
            const topRange = tree.top === null ? 0 : tree.getRange(1, 'top', tree.height);
            const bottomRange = tree.bottom === null ? 0 : tree.getRange(1, 'bottom', tree.height);

            const score = leftRange * rightRange * topRange * bottomRange;
            console.log(`Tree score is ${score}`);
            if (score > maxScore) {
                console.log(`New High Score: ${score}.  This tree is at ${row},${column}`);
                maxScore = score;
            }
        }
    }

    console.log(`The highest scenic score is ${maxScore}`);
});
