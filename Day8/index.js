var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

const trees = [];

class PlantedTree {
    constructor (height) {
        this.height = height;
        this.visible = false;
    }
}

lineReader.on('line', (line) => {
    const row = [];

    for (let i = 0; i < line.length; i++) {
        row.push(new PlantedTree(Number.parseInt(line.charAt(i), 10)));
    }

    trees.push(row);
}).on('close', () => {
    // Determine Left Visibility
    trees.forEach((row) => {
        let maxHeight = 0;

        row.forEach((tree, index) => {
            if (tree.height > maxHeight || (index === 0)) {
                maxHeight = tree.height;
                tree.visible = true;
            }
        });
    });

    // Determine Right Visibility
    trees.forEach((row) => {
        row.reverse();
        let maxHeight = 0;

        row.forEach((tree, index) => {
            if (tree.height > maxHeight || (index === 0)) {
                maxHeight = tree.height;
                tree.visible = true;
            }
        });

        row.reverse();
    });

    const numRows = trees.length;
    const numColumns = trees[0].length;

    // Determine Top Visibility
    for (let column = 0; column < numColumns; column++) {
        let maxHeight = 0;

        for (let row = 0; row < numRows; row++) {
            if (trees[row][column].height > maxHeight || (row === 0)) {
                maxHeight = trees[row][column].height;
                trees[row][column].visible = true;
            }
        }
    }

    // Determine Bottom Visibility
    for (let column = numColumns - 1; column >= 0; column--) {
        let maxHeight = 0;

        for (let row = numRows - 1; row >= 0; row--) {
            if (trees[row][column].height > maxHeight || (row === numRows - 1)) {
                maxHeight = trees[row][column].height;
                trees[row][column].visible = true;
            }
        }
    }

    let countVisible = 0;

    trees.forEach((row) => {
        row.forEach((tree) => {
            if (tree.visible) {
                countVisible++;
            }
        });
    });

    console.log(`There are ${countVisible} visible trees in the grove.`);

    trees.forEach((row) => {
        let message = '[';

        row.forEach((tree) => {
            message = message + `${tree.visible}, `;
        });

        message = message + `']'`;
        console.log(`${message}`);
    });
});
