export class DiskMap {
    blocks: string[];

    constructor () {
        this.blocks = [];
    }

    parseRawInput (rawInput: string): void {
        const inputCharacters = rawInput.split('');
        let currentIndex = -1;

        inputCharacters.forEach((character, index) => {
            if (index % 2 === 0) {
                // This is a block
                currentIndex++;
                const block = parseInt(character, 10);

                for (let i = 0; i < block; i++) {
                    this.blocks.push(`${currentIndex}`);
                }
            } else {
                // This is free space
                for (let i = 0; i < parseInt(character, 10); i++) {
                    this.blocks.push('.');
                }
            }
        });
    }

    shiftBlocks (): void {
        for (let i = this.blocks.length - 1; i > 0; i--) {
            if (this.blocks[i] !== '.') {
                const firstFreeSpaceIndex = this.blocks.indexOf('.');

                if (firstFreeSpaceIndex < i) {
                    // Swap the blocks
                    this.blocks[firstFreeSpaceIndex] = this.blocks[i];
                    this.blocks[i] = '.';
                } else {
                    // We're done...
                    break;
                }
            }
        }
    }

    generateBlockString (): string {
        let line = '';
        this.blocks.forEach((block, index) => {
            line += block;
        });

        return line;
    }

    calculateChecksum (): number {
        let sum = 0;

        this.blocks.forEach((block, index) => {
            if (block !== '.') {
                sum += (parseInt(block, 10) * index);
            }
        });

        return sum;
    }
}