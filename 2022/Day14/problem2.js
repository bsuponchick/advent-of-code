var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

const input = [];
const xcoords = [];
const ycoords = [];
const map = [];
let sandCounter = 0;
let sandOnFloor = false;

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
                const leftCoords = position.split(',');
                const rightCoords = path[index + 1].split(',');

                const leftX = getAdjustedXCoord(Number.parseInt(leftCoords[0], 10));
                const leftY = Number.parseInt(leftCoords[1], 10);

                const rightX = getAdjustedXCoord(Number.parseInt(rightCoords[0], 10));
                const rightY = Number.parseInt(rightCoords[1], 10);

                if (leftX === rightX) {
                    // We're moving vertically
                    if (leftY < rightY) {
                        // We're moving down
                        const diffY = rightY - leftY;

                        for (let i = 0; i <= diffY; i++) {
                            map[leftY + i][leftX] = '#';
                        }
                    } else {
                        // We're moving up
                        const diffY = leftY - rightY;

                        for (let i = 0; i <= diffY; i++) {
                            map[leftY - i][leftX] = '#';
                        }
                    }
                } else if (leftX < rightX) {
                    // We're moving right
                    const diffX = rightX - leftX;

                    for (let i = 0; i <= diffX; i++) {
                        map[leftY][leftX + i] = '#';
                    }
                } else {
                    // We're moving left
                    const diffX = leftX - rightX;

                    for (let i = 0; i <= diffX; i++) {
                        map[leftY][leftX - i] = '#';
                    }
                }
            }
        });
    });

    // Insert a row of air and ground
    const airRow = [];
    const groundRow = [];
    for (let x = 0; x <= width; x++) {
        airRow.push('.');
        groundRow.push('#');
    }

    map.push(airRow);
    map.push(groundRow);
};

expandMap = () => {
    xcoords.splice(0, 0, xcoords[0] - 1);
    xcoords.splice(xcoords.length - 1, xcoords[xcoords.length] + 1);

    map.forEach((row, index) => {
        if (index < (map.length - 1)) {
            // insert air on left and right;
            row.splice(0, 0, '.');
            row.push('.');
        } else {
            // insert rock on left and right;
            row.splice(0, 0, '#');
            row.push('#');
        }
    });
}

printMap = () => {
    console.log(`Width of map is ${map[0].length}`);
    console.log(`Height of map is ${map.length}`);
    console.log(`Units of sand dropped is ${sandCounter}`);

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

    map[dropPointYCoord][dropPointXCoord] = 'o';
    //console.log(`Dropping sand at ${dropPointXCoord}, ${dropPointYCoord}`);
    gravity(dropPointXCoord, dropPointYCoord);

    if (map[dropPointYCoord][dropPointXCoord] === 'o') {
        printMap();
        console.log(`There's something at the drop point, you done bro`);
        console.log(`You dropped ${sandCounter + 1} pieces of sand until we filled up`);
    } else {
        //console.log(`Dropping another piece of sand`);
        //printMap();
        sandCounter = sandCounter + 1;
        //printMap();
        setTimeout(() => {
            dropSand();
        });
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

isFloor = (x,y) => {
    return y >= map.length - 1;
}

gravity = (x,y) => {
    let xcoord = x;
    let ycoord = y;

    //console.log(`x is ${x}, y is ${y}, width is ${map[0].length}`);
    if (x === 0) {
        //console.log(`Expand left`);
        expandMap();
        xcoord = 1;
    } else if (x >= map[0].length - 2) {
        //console.log(`Expand right`);
        expandMap();
    }

    if (isAir(xcoord, ycoord + 1)) {
        map[ycoord][xcoord] = '.';
        map[ycoord + 1][xcoord] = 'o';
        gravity(xcoord, ycoord + 1);
    } else if (isRock(xcoord, ycoord + 1) || isSand(xcoord, ycoord + 1)) {
        if (isAir(xcoord - 1, ycoord + 1)) {
            map[ycoord][xcoord] = '.';
            map[ycoord + 1][xcoord - 1] = 'o';
            gravity(xcoord - 1, ycoord + 1);
        } else if (isAir(xcoord + 1, ycoord + 1)) {
            map[ycoord][xcoord] = '.';
            map[ycoord + 1][xcoord + 1] = 'o';
            gravity(xcoord + 1, ycoord + 1);
        }
    }
}

lineReader.on('line', (line) => {
    input.push(line.split(' -> '));
}).on('close', () => {
    generateMap();
    dropSand();
});