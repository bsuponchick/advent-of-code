import { v4 as uuidv4 } from 'uuid';

enum BlockType {
    Trench = 'trench',
    Hole = 'hole',
    Sky = 'sky',
    Unknown = 'unknown'
}

export class Block {
    id: string = '';
    x: number = 0;
    y: number = 0;
    baseColor: string = '';
    northColor: string = '';
    eastColor: string = '';
    southColor: string = '';
    westColor: string = '';
    north: Block | null = null;
    east: Block | null = null;
    south: Block | null = null;
    west: Block | null = null;
    type: BlockType = BlockType.Unknown;

    constructor() {
        this.id = uuidv4();
    }

    paint() {
        if (this.north) {
            // Set the north color to nil to indicate it has no wall
            this.northColor = 'nil';

            if (this.south) {
                // This is a straight block, so need to set the north and south colors to nil
                this.southColor = 'nil';
            } else {
                // This is a bend, determine which way it bends
                if (this.east) {
                    // East block exists, so south color is the east color
                    this.eastColor = 'nil';
                    this.southColor = this.east.baseColor;
                } else if (this.west) {
                    // West block exists, so south color is the west color
                    this.westColor = 'nil';
                    this.southColor = this.west.baseColor;
                }
            }
        } else {
            if (this.south) {
                // This is a bend, determine which way it bends
                if (this.east) {
                    // East block exists, so north color is the east color
                    this.eastColor = 'nil';
                    this.northColor = this.east.baseColor;
                } else if (this.west) {
                    // West block exists, so north color is the west color
                    this.westColor = 'nil';
                    this.northColor = this.west.baseColor;
                }
            } else {
                // This should be a block with an east and west, set those sides to 'nil'
                this.eastColor = 'nil';
                this.westColor = 'nil';
            }            
        }

        // if (this.south) {
        //     // Set the south color to nil to indicate it has no wall
        //     this.southColor = 'nil';
        // } else {
        //     // No south block, so need to set the south color based on the bend
        //     if (this.east) {
        //         // East block exists, so south color is the east color
        //         this.southColor = this.eastColor;
        //     } else if (this.west) {
        //         // West block exists, so south color is the west color
        //         this.southColor = this.westColor;
        //     } else {

        //     }
        // }

        // if (this.east) {
        //     // Set the east color to nil to indicate it has no wall
        //     this.eastColor = 'nil';
        // } else {
        //     // No east block, so need to set the east color based on the bend
        //     if (this.north) {
        //         // North block exists, so east color is the north color
        //         this.eastColor = this.northColor;
        //     } else if (this.south) {
        //         // South block exists, so east color is the south color
        //         this.eastColor = this.southColor;
        //     }
        
        // }

        // if (this.west) {
        //     // Set the west color to nil to indicate it has no wall
        //     this.westColor = 'nil';
        // } else {
        //     // No west block, so need to set the west color based on the bend
        //     if (this.north) {
        //         // North block exists, so west color is the north color
        //         this.westColor = this.northColor;
        //     } else if (this.south) {
        //         // South block exists, so west color is the south color
        //         this.westColor = this.southColor;
        //     }
        // }
    }
}

export class Map {
    blocks: Block[][] = [];

    constructor() {
        this.blocks = [];
    }

    initialize = (dimensions: {width: number, height: number}) => {
        for (let x = 0; x < dimensions.width; x++) {
            this.blocks[x] = [];

            for (let y = 0; y < dimensions.height; y++) {
                this.blocks[x][y] = new Block();
            }
        }

        this.establishConnections();
    }

    establishConnections = () => {
        this.blocks.forEach((row, rowIndex) => {
            row.forEach((block, columnIndex) => {
                if (rowIndex > 0) {
                    const neighbor = this.blocks[rowIndex - 1][columnIndex];
                    block.north = neighbor;
                }
    
                if (columnIndex > 0) {
                    const neighbor = row[columnIndex - 1];
                    block.west = neighbor;
                }
    
                if (rowIndex < this.blocks.length - 1) {
                    const neighbor = this.blocks[rowIndex + 1][columnIndex];
                    block.south = neighbor;
                }
    
                if (columnIndex < row.length - 1) {
                    const neighbor = row[columnIndex + 1];
                    block.east = neighbor;
                }
            });
        });
    }

    expand = () => {
        this.blocks.forEach((row) => {
            row.unshift(new Block());
            row.push(new Block());
        });

        const newFirstRow: Block[] = [];
        const newLastRow: Block[] = [];

        this.blocks[0].forEach(() => {
            newFirstRow.push(new Block());
            newLastRow.push(new Block());
        });

        this.blocks.unshift(newFirstRow);
        this.blocks.push(newLastRow);
    }
}

export const parseInstruction = (instruction: string) => {
    const [direction, distance, color] = instruction.split(' ');

    return {
        direction,
        distance: parseInt(distance, 10),
        color: color.replace('(', '').replace(')', '')
    };
};

export const determineBoundingBox = (instructions: string[]): { height: number; width: number, minX: number, minY: number, maxX: number, maxY: number, startingPoint: { x: number; y: number} } => {
    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    let x = 0;
    let y = 0;

    instructions.forEach((instruction) => {
        const { direction, distance, color } = parseInstruction(instruction);

        switch (direction) {
            case 'U':
                y += distance;
                break;
            case 'R':
                x += distance;
                break;
            case 'D':
                y -= distance;
                break;
            case 'L':
                x -= distance;
                break;
        }

        if (x < minX) {
            minX = x;
        }

        if (x > maxX) {
            maxX = x;
        }

        if (y < minY) {
            minY = y;
        }

        if (y > maxY) {
            maxY = y;
        }
    });

    let height = Math.abs(minY) + Math.abs(maxY) + 1;
    let width = Math.abs(minX) + Math.abs(maxX) + 1;

    let startingX = 0;
    
    if ((minX !== 0) && (maxX !== 0)) {
        startingX = minX  + width - 1;
    }
    
    let startingY = 0;
    
    if ((minY !== 0) && (maxY !== 0)) {
        startingY = minY + height - 1;
    }

    return {
        height,
        width,
        minX,
        maxX,
        minY,
        maxY,
        startingPoint: {
            x: startingX,
            y: startingY
        }
    };
};