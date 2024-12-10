export class Block {
    id: number;

    constructor (id: number) {
        this.id = id;
    }
}

export class DiskMap {
    blocks: Block[] | null;

    constructor () {
        this.blocks = [];
    }

    parseRawInput (rawInput: string): void {
        const inputCharacters = rawInput.split('');
        let currentFileId = -1;

        inputCharacters.forEach((character, index) => {
            if (index % 2 === 0) {
                // This is a block
                currentFileId++;
                const blockLength = parseInt(character, 10);

                for (let i = 0; i < blockLength; i++) {
                    this.blocks.push(new Block(currentFileId));
                }
            } else {
                // This is free space
                const freeSpaceLength = parseInt(character, 10);
                for (let i = 0; i < freeSpaceLength; i++) {
                    this.blocks.push(null);
                }
            }
        });
    }

    shiftBlocks (): void {
        let currentBlockId;

        for (let i = this.blocks.length - 1; i > 0; i--) {
            if (this.blocks[i] !== null && (this.blocks[i].id !== currentBlockId)) {
                const copyOfBlock = this.blocks[i];
                currentBlockId = this.blocks[i].id;
                let countSameBlock = 0;

                while (this.blocks[i - countSameBlock] && (this.blocks[i - countSameBlock].id === this.blocks[i].id)) {
                    countSameBlock++;
                }

                console.log(`Looking for ${countSameBlock} free spaces for block ${this.blocks[i].id}`);
                
                let freeSpaces = '';
                for (let j = 0; j < countSameBlock; j++) {
                    freeSpaces += '.';
                }

                let indexOfEnoughOpenSpace = -1;

                for (let i = 0; i < this.blocks.length; i++) {
                    let consecutiveFreeSpaces = 0;

                    while (this.blocks[i + consecutiveFreeSpaces] === null) {
                        consecutiveFreeSpaces++;
                    }

                    if (consecutiveFreeSpaces >= countSameBlock) {
                        indexOfEnoughOpenSpace = i;
                        break;
                    } else {
                        consecutiveFreeSpaces = 0;
                    }
                }                

                if (indexOfEnoughOpenSpace > -1) {
                    // There is room somewhere...
                    if (indexOfEnoughOpenSpace < i) {
                        console.log(`Found enough open space for block ${this.blocks[i].id} at index ${indexOfEnoughOpenSpace}`);

                        // Swap the blocks
                        for (let k = 0; k < countSameBlock; k++) {
                            this.blocks[indexOfEnoughOpenSpace + k] = new Block(currentBlockId);
                            this.blocks[i - k] = null;
                        }
                    }
                }
            }
        }
    }

    generateBlockString (): string {
        let line = '';
        this.blocks.forEach((block, index) => {
            if (block === null) {
                line += '.';
            } else {
                line += `${block.id}`;
            }
        });

        return line;
    }

    calculateChecksum (): bigint {
        let sum: bigint = 0n;

        this.blocks.forEach((block, index) => {
            if (block !== null) {
                let value = BigInt(block.id) * BigInt(`${index}`);
                sum = sum + value;
            }
        });

        return sum;
    }
}