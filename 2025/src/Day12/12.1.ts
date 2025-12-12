import { PuzzlePiece, Grid } from './12.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let puzzlePieces: PuzzlePiece[] = [];
let puzzlePieceStrings: string[] = [];

let gridInputs: string[] = [];
let grids: Grid[] = [];

const execute = () => {
    let currentPuzzlePieceIndex = 0;
    for (let i = 0; i < puzzlePieceStrings.length; i+=3) {
        puzzlePieces.push(new PuzzlePiece(`${currentPuzzlePieceIndex}`, puzzlePieceStrings.slice(i, i+3)));
        currentPuzzlePieceIndex++;
    }

    console.log(`There are ${puzzlePieces.length} puzzle pieces`);
    puzzlePieces.forEach((puzzlePiece) => {
        puzzlePiece.print();
    });

    for (let i = 0; i < gridInputs.length; i++) {
        let gridParts = gridInputs[i].split(': ');
        let sizeParts = gridParts[0].split('x');
        let goalParts = gridParts[1].split(' ');
        grids.push(new Grid({ height: parseInt(sizeParts[0]), width: parseInt(sizeParts[1]) }, goalParts.map(Number)));
    }

    // Determine if there are any grids that are impossible to solve due to area mismatch
    let gridsToSolve: Grid[] = [];
    let countImpossibleDueToAreaMismatch = 0;
    grids.forEach((grid) => {
        if (grid.calculateAreaOfGrid() < grid.calculateAreaOfGoal(puzzlePieces)) {
            console.log(`Grid ${grid.size.height}x${grid.size.width} is impossible to solve due to area mismatch`);
            countImpossibleDueToAreaMismatch++;
        } else {
            gridsToSolve.push(grid);
        }
    });

    console.log(`There are ${countImpossibleDueToAreaMismatch} grids that are impossible to solve due to area mismatch`);
    console.log(`There are ${gridsToSolve.length} grids that are possible to solve`);
}

const parseLine = (line: string) => {
    if (line.indexOf('.') > -1 || line.indexOf('#') > -1) {
        puzzlePieceStrings.push(line);
    } else if (line.indexOf('x') > -1) {
        gridInputs.push(line);
    }
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