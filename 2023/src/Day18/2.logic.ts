import { v4 as uuidv4 } from 'uuid';

enum BlockType {
    Trench = 'trench',
    Ground = 'ground',
    Unknown = 'unknown',
}

export class Block {
    id: string = '';
    x: number = 0;
    y: number = 0;
    baseColor: string = '';
    north: Block | null = null;
    east: Block | null = null;
    south: Block | null = null;
    west: Block | null = null;
    type: BlockType = BlockType.Unknown;

    constructor() {
        this.id = uuidv4();
    }

    setType = (type: BlockType) => {
        this.type = type;
    };

    setBaseColor = (color: string) => {
        this.baseColor = color;
    };
}

export class Map {
    blocks: Block[][] = [];

    constructor() {
        this.blocks = [];
    }

    initialize = (dimensions: { width: number; height: number }) => {
        // Totally cheating by adding 200 to each dimension to make sure we have enough space
        for (let x = 0; x < dimensions.height + 200; x++) {
            this.blocks[x] = [];

            for (let y = 0; y < dimensions.width + 200; y++) {
                this.blocks[x][y] = new Block();
            }
        }

        this.establishConnections();
    };

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
    };

    generateGround = (): Block => {
        const block = new Block();
        block.setType(BlockType.Ground);

        return block;
    };

    expand = () => {
        this.blocks.forEach((row) => {
            row.unshift(this.generateGround());
            row.push(this.generateGround());
        });

        const newFirstRow: Block[] = [];
        const newLastRow: Block[] = [];

        this.blocks[0].forEach(() => {
            newFirstRow.push(this.generateGround());
            newLastRow.push(this.generateGround());
        });

        this.blocks.unshift(newFirstRow);
        this.blocks.push(newLastRow);
    };

    dig = (coordinate: { x: number; y: number }, color: string) => {
        const block = this.blocks[coordinate.y][coordinate.x];
        block.setBaseColor(color);
        block.setType(BlockType.Trench);
    };

    digTrench = (startingCoordinate: { x: number; y: number }, instructions: string[]) => {
        let currentCoordinate = startingCoordinate;

        instructions.forEach((instruction, index) => {
            const { direction, distance, color } = parseInstruction(instruction);
            console.log(`Digging ${distance} blocks ${direction} with color ${color} from ${JSON.stringify(currentCoordinate)}}`);

            if (index === 0) {
                this.dig(currentCoordinate, color);
            }

            for (let i = 0; i < distance; i++) {
                switch (direction) {
                    case 'U':
                        currentCoordinate.y--;
                        break;
                    case 'R':
                        currentCoordinate.x++;
                        break;
                    case 'D':
                        currentCoordinate.y++;
                        break;
                    case 'L':
                        currentCoordinate.x--;
                        break;
                }

                this.dig(currentCoordinate, color);
            }
        });
    };
    
    identifyGroundBlocks = () => {
        // Add an outer layer of blocks to start as ground
        this.expand();
        this.establishConnections();

        let found = 0;
        let started = false;
        
        while (found > 0 || started === false) {
            found = 0;
            started = true;

            // Loop through all blocks and identify the ground blocks
            for (let row = 0; row < this.blocks.length; row++) {
                for (let column = 0; column < this.blocks[row].length; column++) {
                    const block = this.blocks[row][column];

                    if (block.type === BlockType.Unknown) {
                        // This is an unknown block, so check if it is ground
                        if ((block.north?.type === BlockType.Ground) || (block.east?.type === BlockType.Ground) || (block.south?.type === BlockType.Ground) || (block.west?.type === BlockType.Ground)) {
                            // This is a ground block
                            block.setType(BlockType.Ground);
                            found++;
                        }
                    }
                }
            }
        }

        
    };

    digInnerTrenches = () => {
        // Loop through all blocks and identify the ground blocks
        for (let row = 0; row < this.blocks.length; row++) {
            for (let column = 0; column < this.blocks[row].length; column++) {
                const block = this.blocks[row][column];

                if (block.type === BlockType.Unknown) {
                    // This is an inner block, dig it without a paint color
                    this.dig({ x: column, y: row }, 'nil');
                }
            }
        }
    }

    calculateCubitMetersOfTrench = () => {
        let total = 0;

        this.blocks.forEach((row) => {
            row.forEach((block) => {
                if (block.type === BlockType.Trench) {
                    total++;
                }
            });
        });

        return total;
    }

    print = () => {
        let line = '';
        this.blocks.forEach((row) => {
            row.forEach((block) => {
                switch (block.type) {
                    case BlockType.Trench:
                        line += '#';
                        break;
                    case BlockType.Ground:
                        line += ' ';
                        break;
                    case BlockType.Unknown:
                        line += '?';
                        break;
                }
            });

            line += '\n';
        });

        console.log(`${line}`);
    };
}

export const parseInstruction = (instruction: string) => {
    let [junk1, junk2, hexCode] = instruction.split(' ');
    hexCode = hexCode.replace('(', '').replace(')', '').replace('#', '');

    let distanceInHex = hexCode.substring(0, 5);
    let directionInHex = hexCode.substring(5);

    let direction = '';

    switch (directionInHex) {
        case '0':
            direction = 'R';
            break;
        case '1':
            direction = 'D';
            break;
        case '2':
            direction = 'L';
            break;
        case '3':
            direction = 'U';
            break;
        default:
            break;
    }

    return {
        direction,
        distance: hexToAscii(distanceInHex),
        color: 'nil',
    };
};

export const hexToAscii = (hex: string): number => {
    return parseInt(hex, 16);
};

export const determineBoundingBox = (
    instructions: string[],
): {
    height: number;
    width: number;
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    startingPoint: { x: number; y: number };
} => {
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

    if (minX !== 0 && maxX !== 0) {
        startingX = minX + width - 1;
    }

    let startingY = 0;

    if (minY !== 0 && maxY !== 0) {
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
            y: startingY,
        },
    };
};
