export class Galaxy {
    x: number;
    y: number;
    name: string;

    constructor({x, y, name}) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
}

export const generateGalaxies = (map: string[]): Galaxy[] => {
    const galaxies: Galaxy[] = [];

    map.forEach((row, y) => {
        const characters = row.split('');
        characters.forEach((char, x) => {
            if (char === '#') {
                galaxies.push(new Galaxy({x, y, name: `Galaxy-${galaxies.length + 1}`}));
            }
        });
    });

    return galaxies;
};

export const determineEmptyRowsAndColumnIndicess = (map: string[]): {emptyRowIndices: number[], emptyColumnIndices: number[]} => {
    const emptyRowIndices: number[] = [];
    const emptyColumnIndices: number[] = [];

    map.forEach((row, index) => {
        const characters = row.split('');
        const countOfDots = characters.filter((char) => char === '.').length;
        if (countOfDots === row.length) {
            emptyRowIndices.push(index);
        }
    });

    const columnMap: string[] = [];
    
    map.forEach((row) => {
        const characters = row.split('');
        characters.forEach((char, index) => {
            if (columnMap[index] === undefined) {
                columnMap[index] = '';
            }

            columnMap[index] += char;
        });
    });

    columnMap.forEach((column, index) => {
        const characters = column.split('');
        const countOfDots = characters.filter((char) => char === '.').length;
        if (countOfDots === column.length) {
            emptyColumnIndices.push(index);
        }
    });

    return {emptyRowIndices, emptyColumnIndices};
};

export const updateGalaxyPositionsGivenEmptyRowsAndColumns = (galaxies: Galaxy[], emptyRowIndices: number[], emptyColumnIndices: number[]): Galaxy[] => {
    const updatedGalaxies: Galaxy[] = [];

    galaxies.forEach((galaxy) => {
        const updatedGalaxy = {...galaxy};

        emptyRowIndices.forEach((rowIndex) => {
            if (galaxy.y > rowIndex) {
                updatedGalaxy.y += 999999;
            }
        });

        emptyColumnIndices.forEach((columnIndex) => {
            if (galaxy.x > columnIndex) {
                updatedGalaxy.x += 999999;
            }
        });

        updatedGalaxies.push(updatedGalaxy);
    });

    return updatedGalaxies;
};

export const calculateManhattanDistance = (start: {x: number, y: number}, end: {x: number, y: number}): number => {
    return Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
};

export const printMap = (map: string[]) => {
    map.forEach((row) => {
        console.log(row);
    });
};