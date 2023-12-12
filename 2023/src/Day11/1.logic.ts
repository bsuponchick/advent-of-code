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

export const expandMap = (map: string[]): string[] => {
    const verticallyExpandedMap: string[] = [];

    map.forEach((row, index) => {
        verticallyExpandedMap.push(row);

        const characters = row.split('');
        const countOfDots = characters.filter((char) => char === '.').length;
        if (countOfDots === row.length) {
            // Add a duplicate row to deal with expansion
            verticallyExpandedMap.push(row);
        }
    });

    const horizontallyExpandedMap: string[] = [];
    const columnMap: string[] = [];
    
    verticallyExpandedMap.forEach((row) => {
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
        characters.forEach((char, columnIndex) => {
            if (horizontallyExpandedMap[columnIndex] === undefined) {
                horizontallyExpandedMap[columnIndex] = '';
            }

            horizontallyExpandedMap[columnIndex] += char;
        });

        const countOfDots = characters.filter((char) => char === '.').length;
        if (countOfDots === column.length) {
            // Add a duplicate column to deal with expansion
            characters.forEach((char, columnIndex) => {
                horizontallyExpandedMap[columnIndex] += char;
            });
        }
    });

    return horizontallyExpandedMap;
};

export const calculateManhattanDistance = (start: {x: number, y: number}, end: {x: number, y: number}): number => {
    return Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
};

export const printMap = (map: string[]) => {
    map.forEach((row) => {
        console.log(row);
    });
};