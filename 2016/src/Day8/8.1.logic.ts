export class Screen {
    pixels: boolean[][] = [];

    constructor(width: number, height: number) {
        this.pixels = [];

        for (let i = 0; i < height; i++) {
            this.pixels[i] = [];

            for (let j = 0; j < width; j++) {
                this.pixels[i][j] = false;
            }
        }
    }

    rect(width: number, height: number) {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                this.pixels[i][j] = true;
            }
        }
    }

    rotateRow(row: number, amount: number) {
        const rowPixels = this.pixels[row];

        for (let i = 0; i < amount; i++) {
            rowPixels.unshift(rowPixels.pop());
        }
    }

    rotateColumn(column: number, amount: number) {
        const columnPixels = this.pixels.map((row) => row[column]);

        for (let i = 0; i < amount; i++) {
            columnPixels.unshift(columnPixels.pop());
        }
        
        for (let i = 0; i < this.pixels.length; i++) {
            this.pixels[i][column] = columnPixels[i];
        }
    }

    followCommand(command: string) {
        if (command.startsWith('rect')) {
            // Issue the rect command, it will be in the format of "rect <width>x<height>"
            const parts = command.split(' ');
            const [width, height] = parts[1].split('x');
            this.rect(Number(width), Number(height));
        } else if (command.startsWith('rotate row y=')) {
            // Issue the rotate row command, it will be in the format of "rotate row y=<row> by <amount>"
            const parts = command.split('rotate row y=');
            const [row, amount] = parts[1].split(' by ');
            this.rotateRow(Number(row), Number(amount));
        } else if (command.startsWith('rotate column x=')) {
            // Issue the rotate column command, it will be in the format of "rotate column x=<column> by <amount>"
            const parts = command.split('rotate column x=');
            const [column, amount] = parts[1].split(' by ');
            this.rotateColumn(Number(column), Number(amount));
        }
        else {
            throw new Error(`Invalid command: ${command}`);
        }
    }

    countPixelsOn(): number {
        return this.pixels.reduce((sum, row) => {
            return sum + row.reduce((sum, pixel) => {
                return sum + (pixel ? 1 : 0);
            }, 0);
        }, 0);
    }

    print() {
        let output = '';

        for (let i = 0; i < this.pixels.length; i++) {
            for (let j = 0; j < this.pixels[i].length; j++) {
                output += this.pixels[i][j] ? '#' : '.';
            }
            output += '\n';
        }

        console.log(output);
    }
}