let jetPatterns = [];
let debug = false;
const MAX_ROCKS = 1000000000000;
//const MAX_ROCKS = 100;

class Piece {
    constructor (yCoord, height) {
        this.yCoord = yCoord;
        this.height = height;
    }
    
    fall = () => {
        this.yCoord = this.yCoord - 1;
        if (debug) {
            console.log(`Piece is now at y coordinate ${this.yCoord}`);
        }
    }

    print = () => {
        console.log(`>>> Piece <<<`);
        console.log(`yCoord: ${this.yCoord}`);
        console.log(`height: ${this.height}`);
    }
}

placeRock = (counter, gameboard) => {
    addEmptyRows(3, gameboard);
    switch (counter) {
        case 0:
            /*
             * ...... 
             * .####.
             * ......
             */
            gameboard.push('|..@@@@.|');
            return new Piece(gameboard.length - 1, 1);
        case 1:
            /* .....
             * ..#..
             * .###.
             * ..#..
             * .....
             */
            gameboard.push('|...@...|');
            gameboard.push('|..@@@..|');
            gameboard.push('|...@...|');
            return new Piece(gameboard.length - 3, 3);
        case 2:
            /* .....  
             * ...#.
             * ...#.
             * .###.
             * .....
             */

            gameboard.push('|..@@@..|');
            gameboard.push('|....@..|');
            gameboard.push('|....@..|');
            return new Piece(gameboard.length - 3, 3);
        case 3:
            /* ...
             * .#.
             * .#.
             * .#.
             * .#.
             * ...
             */
            gameboard.push('|..@....|');
            gameboard.push('|..@....|');
            gameboard.push('|..@....|');
            gameboard.push('|..@....|');
            return new Piece(gameboard.length - 4, 4);
        case 4:
            /* ....
             * .##.
             * .##.
             * ....
             */
            gameboard.push('|..@@...|');
            gameboard.push('|..@@...|');
            return new Piece(gameboard.length - 2, 2);
        default:
            throw new Error(`Invalid counter detected ${counter}`);
    }
}

printGameboard = (gameboard) => {
    if (debug) {
        for (let i = gameboard.length; i > 0; i--) {
            console.log(`${gameboard[i-1]}`);
        }
        console.log('');
    }
};

addEmptyRows = (number, gameboard) => {
    for (let i = 0; i < number; i++) {
        gameboard.push('|.......|');
    }
};

parseLine = (line) => {
    jetPatterns = Array.from(line);
};

pieceCanDrop = (piece, gameboard) => {
    let canDrop = true;
    const rowsToEvaluate = gameboard.slice(piece.yCoord - 1, piece.yCoord + piece.height);
    
    for (let i = 0; i < rowsToEvaluate.length - 1; i++) {
        const top = Array.from(rowsToEvaluate[i + 1]);
        const bottom = Array.from(rowsToEvaluate[i]);

        for (let j = 0; j < top.length; j++) {
            if (top[j] === '@') {
                let spaceBelow = bottom[j];
                if ((spaceBelow === '#') || (spaceBelow === '-')) {
                    canDrop = false;
                }
            }
        }
    }
    
    // console.log(`Piece Can Drop: ${canDrop}`);
    return canDrop;
}

pieceCanMove = (piece, gameboard, jet) => {
    let canMove = true;
    const rowsToEvaluate = gameboard.slice(piece.yCoord - piece.height);
    
    for (let i = 0; i < rowsToEvaluate.length - 1; i++) {
        const row = Array.from(rowsToEvaluate[i + 1]);

        for (let j = 0; j < row.length; j++) {
            if (row[j] === '@') {
                if (jet === '<') {
                    let spaceLeft = row[j - 1];
                    if ((spaceLeft === '#') || (spaceLeft === '|')) {
                        canMove = false;
                    }
                } else if (jet === '>') {
                    let spaceRight = row[j + 1];
                    if ((spaceRight === '#') || (spaceRight === '|')) {
                        canMove = false;
                    }
                }
            }
        }
    }

    return canMove;
}

gravity = (piece, gameboard) => {
    // Only need to evaluate the rows occupied by the piece and the one below it.
    if (debug) {
        console.log(`Rock falls 1 unit:`);
    }

    for (let i = 0; i < piece.height; i++) {
        const fallingRow = Array.from(gameboard[piece.yCoord + i]);

        for (let j = 0; j < fallingRow.length; j++) {
            if (fallingRow[j] === '@') {
                gameboard[piece.yCoord + i - 1] = `${gameboard[piece.yCoord + i - 1].substring(0, j)}@${gameboard[piece.yCoord + i - 1].substring(j + 1)}`;
            }
        }

        gameboard[piece.yCoord + i] = gameboard[piece.yCoord + i].replaceAll('@', '.');
    }

    while (gameboard[gameboard.length - 1] === '|.......|') {
        gameboard.pop();
    }
    piece.fall();
}

applyJet = (piece, gameboard, jet) => {
    if (pieceCanMove(piece, gameboard, jet)) {
        if (debug) {
            console.log(`Jet of gas pushes rock ${jet === '<' ? 'left' : 'right'}:`);
        }
        
        for (let i = 0; i < piece.height; i++) {
            const movingRow = Array.from(gameboard[piece.yCoord + i]);

            if (jet === '<') {
                const newRow = [];
                for (let j = 0; j < movingRow.length; j++) {
                    if (movingRow[j] === '|' || movingRow[j] === '#') {
                        newRow[j] = movingRow[j];
                    } else if (movingRow[j] === '.') {
                        if ((movingRow[j + 1] === '.') || (movingRow[j + 1] === '@')) {
                            newRow[j] = movingRow[j + 1];
                        } else {
                            newRow[j] = '.';
                        }
                    } else if (movingRow[j] === '@') {
                        if ((movingRow[j + 1] === '.') || (movingRow[j + 1] === '@')) {
                            newRow[j] = movingRow[j + 1];
                        } else {
                            newRow[j] = '.';
                        }
                    }
                }

                gameboard[piece.yCoord + i] = newRow.join('');
            } else if (jet === '>') {
                const newRow = [];
                for (let j = 0; j < movingRow.length; j++) {
                    if (movingRow[j] === '|' || movingRow[j] === '#') {
                        newRow[j] = movingRow[j];
                    } else if (movingRow[j] === '.') {
                        if ((movingRow[j - 1] === '.') || (movingRow[j - 1] === '@')) {
                            newRow[j] = movingRow[j - 1];
                        } else {
                            newRow[j] = '.';
                        }
                    } else if (movingRow[j] === '@') {
                        if ((movingRow[j - 1] === '.') || (movingRow[j - 1] === '@')) {
                            newRow[j] = movingRow[j - 1];
                        } else {
                            newRow[j] = '.';
                        }
                    }
                }

                gameboard[piece.yCoord + i] = newRow.join('');
            }
        }
    } else {
        if (debug) {
            console.log(`Jet of gas pushes rock ${jet === '<' ? 'left' : 'right'}, but nothing happens:`);
        }
    }
}

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    const gameboard = ['+-------+'];
    let pieceCounter = 0;
    let currentPiece;
    let round = 0;

    const jet = () => {
        if (round === jetPatterns.length) {
            if (debug) {
                console.log(`Resetting jetPatterns after ${round} pushes`);
            }
            round = 0;
        }
        
        applyJet(currentPiece, gameboard, jetPatterns[round]);
        printGameboard(gameboard);
        round++;
    }

    const nextRock = () => {
        if (debug) {
            console.log(`A rock begins falling:`);
        }
        currentPiece = placeRock(pieceCounter, gameboard);
        printGameboard(gameboard);

        pieceCounter++;
    
        if (pieceCounter > 4) {
            pieceCounter = 0;
        }
    }

    const applyGravity = () => {
        gravity(currentPiece, gameboard);
        printGameboard(gameboard);

        jet();
    }

    const convertRocksToObstacles = () => {       
        if (debug) {
            console.log(`Converting rock to obstacles`);
        } 
        gameboard.forEach((row, index) => {
            gameboard[index] = row.replaceAll('@', '#');
        });
        printGameboard(gameboard);
    }

    for (let i = 0; i < MAX_ROCKS; i++) {
        nextRock();
        jet();

        while (pieceCanDrop(currentPiece, gameboard)) {
            applyGravity();
        }

        convertRocksToObstacles();
    }

    console.log(`The tower will be ${gameboard.length - 1} tall after ${MAX_ROCKS} have fallen.`);
});