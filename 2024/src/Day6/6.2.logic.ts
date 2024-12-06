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

    moveTwo(): boolean {
        let nextTile: string;

        switch (this.direction) {
            case '^':
                if (this.y === 0) {
                    if (this.map[this.y][this.x] === '.' || this.map[this.y][this.x] === '^') {
                        this.map[this.y][this.x] = '^';
                    } else {
                        this.map[this.y][this.x] += '^';
                    }
                    return false;
                }

                nextTile = this.map[this.y - 1][this.x];
                if (nextTile === '#' || nextTile === 'O') {
                    this.direction = '>';
                } else if (nextTile.indexOf('^') !== -1) {
                    throw new Error('The guard is moving to a tile that has already been visited.');
                } else {
                    if (this.map[this.y][this.x] === '.' || this.map[this.y][this.x] === '^') {
                        this.map[this.y][this.x] = '^';
                    } else {
                        this.map[this.y][this.x] += '^';
                    }
                    this.y--;
                }
                
                return true;
            case 'v':
                if (this.y === this.map.length - 1) {
                    if (this.map[this.y][this.x] === '.' || this.map[this.y][this.x] === 'v') {
                        this.map[this.y][this.x] = 'v';
                    } else {
                        this.map[this.y][this.x] += 'v';
                    }
                    return false;
                }

                nextTile = this.map[this.y + 1][this.x];
                if (nextTile === '#' || nextTile === 'O') {
                    this.direction = '<';
                } else if (nextTile.indexOf('v') !== -1) {
                    throw new Error('The guard is moving to a tile that has already been visited.');
                } else {
                    if (this.map[this.y][this.x] === '.' || this.map[this.y][this.x] === 'v') {
                        this.map[this.y][this.x] = 'v';
                    } else {
                        this.map[this.y][this.x] += 'v';
                    }
                    this.y++;
                }

                return true;
            case '<':
                if (this.x === 0) {
                    if (this.map[this.y][this.x] === '.' || this.map[this.y][this.x] === '<') {
                        this.map[this.y][this.x] = '<';
                    } else {
                        this.map[this.y][this.x] += '<';
                    }
                    return false;
                }

                nextTile = this.map[this.y][this.x - 1];
                if (nextTile === '#' || nextTile === 'O') {
                    this.direction = '^';
                } else if (nextTile.indexOf('<') !== -1) {
                    throw new Error('The guard is moving to a tile that has already been visited.');
                } else {
                    if (this.map[this.y][this.x] === '.' || this.map[this.y][this.x] === '<') {
                        this.map[this.y][this.x] = '<';
                    } else {
                        this.map[this.y][this.x] += '<';
                    }
                    this.x--;
                }
                
                return true;
            case '>':
                if (this.x === this.map[0].length - 1) {
                    if (this.map[this.y][this.x] === '.' || this.map[this.y][this.x] === '>') {
                        this.map[this.y][this.x] = '>';
                    } else {
                        this.map[this.y][this.x] += '>';
                    }
                    return false;
                }

                nextTile = this.map[this.y][this.x + 1];
                if (nextTile === '#' || nextTile === 'O') {
                    this.direction = 'v';
                } else if (nextTile.indexOf('>') !== -1) {
                    throw new Error('The guard is moving to a tile that has already been visited.');
                } else {
                    if (this.map[this.y][this.x] === '.' || this.map[this.y][this.x] === '>') {
                        this.map[this.y][this.x] = '>';
                    } else {
                        this.map[this.y][this.x] += '>';
                    }
                    this.x++;
                }

                return true;
            default:
                return false;
        }
    }
}