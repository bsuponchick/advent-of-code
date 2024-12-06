export class Guard {
    x: number;
    y: number;
    direction: string;
    map: string[][];

    constructor(map: string[][]) {
        this.map = map;

        map.forEach((row, y) => {
            row.forEach((tile, x) => {
                if (tile === '^' || tile === 'v' || tile === '<' || tile === '>') {
                    this.x = x;
                    this.y = y;
                    this.direction = tile;
                }
            });
        });
    }

    move(): boolean {
        let nextTile: string;

        switch (this.direction) {
            case '^':
                if (this.y === 0) {
                    this.map[this.y][this.x] = 'X';
                    return false;
                }

                nextTile = this.map[this.y - 1][this.x];
                if (nextTile === '#') {
                    this.direction = '>';
                } else {
                    this.map[this.y][this.x] = 'X';
                    this.y--;
                    this.map[this.y][this.x] = '^';
                }
                
                return true;
            case 'v':
                if (this.y === this.map.length - 1) {
                    this.map[this.y][this.x] = 'X';
                    return false;
                }

                nextTile = this.map[this.y + 1][this.x];
                if (nextTile === '#') {
                    this.direction = '<';
                } else {
                    this.map[this.y][this.x] = 'X';
                    this.y++;
                    this.map[this.y][this.x] = 'v';
                }

                return true;
            case '<':
                if (this.x === 0) {
                    this.map[this.y][this.x] = 'X';
                    return false;
                }

                nextTile = this.map[this.y][this.x - 1];
                if (nextTile === '#') {
                    this.direction = '^';
                } else {
                    this.map[this.y][this.x] = 'X';
                    this.x--;
                    this.map[this.y][this.x] = '<';
                }
                
                return true;
            case '>':
                if (this.x === this.map[0].length - 1) {
                    this.map[this.y][this.x] = 'X';
                    return false;
                }

                nextTile = this.map[this.y][this.x + 1];
                if (nextTile === '#') {
                    this.direction = 'v';
                } else {
                    this.map[this.y][this.x] = 'X';
                    this.x++;
                    this.map[this.y][this.x] = '>';
                }

                return true;
            default:
                return false;
        }
    }
}