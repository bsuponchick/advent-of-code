var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

const input = [];
const xcoords = [];
const ycoords = [];
const map = [];
let sandCounter = 0;

getAdjustedXCoord = (startingValue) => {
    return startingValue - xcoords[0];
}

generateMap = () => {
    input.forEach((path) => {
        path.forEach((positions) => {
            const coords = positions.split(',');
            xcoords.push(Number.parseInt(coords[0], 10));
            ycoords.push(Number.parseInt(coords[1], 10));
        });
    });

    xcoords.sort((a, b) => {
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    });
    ycoords.sort((a, b) => {
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    });

    const width = xcoords[xcoords.length - 1] - xcoords[0];
    const height = ycoords[ycoords.length - 1];

    for (let y = 0; y <= height; y++) {
        const row = [];

        for (let x = 0; x <= width; x++) {
            row.push('.');
        }

        map.push(row);
    }

    input.forEach((path) => {
        path.forEach((position, index) => {
            if (index < path.length - 1) {
                // console.log(`Evaluating ${position} -> ${path[index+1]}`);
                const leftCoords = position.split(',');
                const rightCoords = path[index + 1].split(',');

                const leftX = getAdjustedXCoord(Number.parseInt(leftCoords[0], 10));
                const leftY = Number.parseInt(leftCoords[1], 10);

                const rightX = getAdjustedXCoord(Number.parseInt(rightCoords[0], 10));
                const rightY = Number.parseInt(rightCoords[1], 10);

                // console.log(`Adjusted Left X is ${leftX}`);
                // console.log(`Adjusted Left Y is ${leftY}`);

                // console.log(`Adjusted Right X is ${rightX}`);
                // console.log(`Adjusted Right Y is ${rightY}`);

                if (leftX === rightX) {
                    // We're moving vertically
                    if (leftY < rightY) {
                        // We're moving down
                        // console.log(`Wall runs down`);
                        const diffY = rightY - leftY;

                        for (let i = 0; i <= diffY; i++) {
                            // console.log(`Attempting to put wall at ${leftX}, ${leftY + i}`);                                                    
                            // console.log(`i is ${i}`);
                            // console.log(`Row was   ${JSON.stringify(map[leftY + i])}`);
                            map[leftY + i][leftX] = '#';
                            // console.log(`Row is now ${JSON.stringify(map[leftY + i])}`);
                        }
                    } else {
                        // We're moving up
                        // console.log(`Wall runs up`);
                        const diffY = leftY - rightY;

                        for (let i = 0; i <= diffY; i++) {
                            // console.log(`Attempting to put wall at ${leftX}, ${leftY - i}`);                            
                            // console.log(`i is ${i}`);
                            // console.log(`Row was    ${JSON.stringify(map[leftY - i])}`);
                            map[leftY - i][leftX] = '#';
                            // console.log(`Row is now ${JSON.stringify(map[leftY - i])}`);
                        }
                    }
                } else if (leftX < rightX) {
                    // We're moving right
                    // console.log(`Wall runs right`);
                    const diffX = rightX - leftX;

                    for (let i = 0; i <= diffX; i++) {
                        // console.log(`Attempting to put wall at ${leftX + i}, ${leftY}`);
                        // console.log(`i is ${i}`);
                        // console.log(`Row was    ${JSON.stringify(map[leftY])}`);
                        map[leftY][leftX + i] = '#';
                        // console.log(`Row is now ${JSON.stringify(map[leftY])}`);
                    }
                } else {
                    // We're moving left
                    // console.log(`Wall runs left`);
                    const diffX = leftX - rightX;

                    for (let i = 0; i <= diffX; i++) {
                        // console.log(`Attempting to put wall at ${leftX - i}, ${leftY}`);
                        // console.log(`i is ${i}`);
                        // console.log(`Row was    ${JSON.stringify(map[leftY])}`);
                        map[leftY][leftX - i] = '#';
                        // console.log(`Row is now ${JSON.stringify(map[leftY])}`);
                    }
                }
            }
        });
    });
};

printMap = () => {
    console.log(`Width of map is ${map[0].length}`);
    console.log(`Height of map is ${map.length}`);

    for (let i = 0; i < 3; i++) {
        let columnNames = '    ';
        for (let j = 0; j < map[0].length; j++) {
            columnNames = columnNames + `${j + xcoords[0]}`.charAt(i);
        }
        console.log(columnNames);
    }

    for (let y = 0; y < map.length; y++) {
        let row = '';
        for (let i = 0; i < map[y].length; i++) {
            row = row + map[y][i];
        }

        console.log(`${y < 10 ? '  ' + y : y < 100 ? ' ' +y : y} ${row}`);
    }
}

dropSand = () => {
    const dropPointXCoord = getAdjustedXCoord(500);
    const dropPointYCoord = 0;

    if (map[dropPointYCoord][dropPointXCoord] === '.') {
        map[dropPointYCoord][dropPointXCoord] = 'o';
        //console.log(`Dropping sand at ${dropPointXCoord}, ${dropPointYCoord}`);
        const sandFellOffEdge = gravity(dropPointXCoord, dropPointYCoord);
        if (sandFellOffEdge) {
            // We did it
            printMap();
            console.log(`You dropped ${sandCounter} pieces of sand before one fell into the void`);
        } else {
            //console.log(`Dropping another piece of sand`);
            sandCounter = sandCounter + 1;
            dropSand();
        }
    } else {
        printMap();
        console.log(`There's something at the drop point, you done bro`);
        console.log(`You dropped ${sandCounter} pieces of sand before one fell into the void`);
    }
}

outOfBounds = (x,y) => {
    return (x < 0) || (x >= map[0].length) || (y < 0) || (y >= map.length);
}

isAir = (x,y) => {
    // console.log(`Checking for air at ${x},${y}`);
    if (outOfBounds(x,y)) {
        return false;
    } else {
        return map[y][x] === '.';
    }
}

isRock = (x,y) => {
    // console.log(`Checking for rock at ${x},${y}`);
    if (outOfBounds(x,y)) {
        return false;
    } else {
        return map[y][x] === '#';
    }
}

isSand = (x,y) => {
    // console.log(`Checking for sand at ${x},${y}`);
    if (outOfBounds(x,y)) {
        return false;
    } else {
        return map[y][x] === 'o';
    }
}

gravity = (x,y) => {
    // printMap();
    if (isAir(x, y + 1)) {
        map[y][x] = '.';
        map[y + 1][x] = 'o';
        return gravity(x, y + 1);
    } else if (isRock(x, y + 1) || isSand(x, y + 1)) {
        if (x === 0) {
            //Falls off left edge, need to stop
            return true;
        } else if (isAir(x - 1, y + 1)) {
            map[y][x] = '.';
            map[y + 1][x - 1] = 'o';
            return gravity(x - 1, y + 1);
        } else if (x >= map.length) {
            // Falls of right edge, need to stop
            return true;
        } else if (isAir(x + 1, y + 1)) {
            map[y][x] = '.';
            map[y + 1][x + 1] = 'o';
            return gravity(x + 1, y + 1);
        } else if (y >= map.length) {
            // Falls off bottom edge, need to stop
            return true;
        } else {
            // You hit something solid and can stop.
            return false;
        }
    } else {
        // Falls off bottom edge, need to stop
        return true;
    }
}

lineReader.on('line', (line) => {
    input.push(line.split(' -> '));
}).on('close', () => {
    generateMap();
    dropSand();
});