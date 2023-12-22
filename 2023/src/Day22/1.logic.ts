import { v4 as uuidv4 } from 'uuid';

export class Block {
    id: string;
    x: number;
    y: number;
    z: number;
    startingX: number;
    startingY: number;
    startingZ: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        
        this.startingX = x;
        this.startingY = y;
        this.startingZ = z;

        this.id = `${x},${y},${z}`;
    }

    fall = () => {
        this.z--;
        this.id = `${this.x},${this.y},${this.z}`;
    }

    reset = () => {
        this.x = this.startingX;
        this.y = this.startingY;
        this.z = this.startingZ;

        this.id = `${this.x},${this.y},${this.z}`;
    }

    updateDefaults = () => {
        this.startingX = this.x;
        this.startingY = this.y;
        this.startingZ = this.z;
    }
}

export class Brick {
    id: string;
    blocks: Block[] = [];
    blockCache: { [id: string]: Block };

    constructor(input: string, cache: { [id: string]: Block }) {
        this.id = uuidv4();

        const [start, end] = input.split('~');
        const [x1, y1, z1] = start.split(',');
        const [x2, y2, z2] = end.split(',');

        this.blockCache = cache;

        // Add the first block
        const firstBlock = new Block(parseInt(x1, 10), parseInt(y1, 10), parseInt(z1, 10));
        this.blocks.push(firstBlock);
        this.blockCache[firstBlock.id] = firstBlock;

        // Add the other blocks
        if (x1 !== x2) {
            for (let x = parseInt(x1, 10) + 1; x <= parseInt(x2, 10); x++) {
                const block = new Block(x, parseInt(y1, 10), parseInt(z1, 10));
                this.blocks.push(block);
                this.blockCache[block.id] = block;
            }
        } else if (y1 !== y2) {
            for (let y = parseInt(y1, 10) + 1; y <= parseInt(y2, 10); y++) {
                const block = new Block(parseInt(x1, 10), y, parseInt(z1, 10));
                this.blocks.push(block);
                this.blockCache[block.id] = block;
            }
        } else if (z1 !== z2) {
            for (let z = parseInt(z1, 10) + 1; z <= parseInt(z2, 10); z++) {
                const block = new Block(parseInt(x1, 10), parseInt(y1, 10), z);
                this.blocks.push(block);
                this.blockCache[block.id] = block;
            }
        }
    }

    couldPotentiallyFall = () => {
        // Check if any blocks are at ground level
        const onGroundLevel = this.blocks.some(block => block.z === 1);

        if (onGroundLevel) {
            return false;
        }

        // Check if any blocks have a block directly below them that don't belong to this brick
        const hasBlockBelow = this.blocks.some(block => {
            const id = `${block.x},${block.y},${block.z - 1}`;

            if (this.blockCache[id]) {
                // There's a block below this one, determine if its in this brick
                return this.blocks.some(b => b.id === id) === false;
            } else {
                // There's no block below this one
                return false;
            }
        });

        return hasBlockBelow === false;
    }

    fall = () => {
        this.blocks.forEach((block) => {
            delete this.blockCache[block.id];
            block.fall()
            this.blockCache[block.id] = block;
        });
    }

    removeFromBlockCache = () => {
        this.blocks.forEach((block) => {
            delete this.blockCache[block.id];
        });
    }

    addToBlockCache = () => {
        this.blocks.forEach((block) => {
            this.blockCache[block.id] = block;
        });
    }

    reset = () => {
        this.blocks.forEach((block) => {
            block.reset();
            this.blockCache[block.id] = block;
        });
    }

    setDefaultPositions = () => {
        this.blocks.forEach((block) => {
            block.updateDefaults();
        });
    };
}

export const resetBlockCache = (cache: { [id: string]: Block }) => {
    Object.keys(cache).forEach(key => {
        delete cache[key];
    });
};