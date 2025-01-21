export class Key {
    private heights: number[] = [-1,-1,-1,-1,-1];

    constructor(layout: string[]) {
        for (let y = 0; y < layout.length; y++) {
            for (let x = 0; x < layout[y].length; x++) {
                if (layout[y][x] === '#') {
                    this.heights[x]++;
                }
            }
        }
    }

    fitsLock(lock: Lock): boolean {
        return this.heights.every((height, index) => (height + lock.getTumblerHeight(index) <= 5));
    }

    getHeights(): number[] {
        return this.heights;
    }
}

export class Lock {
    private heights: number[] = [6,6,6,6,6];

    constructor(layout: string[]) {
        for (let y = 0; y < layout.length; y++) {
            for (let x = 0; x < layout[y].length; x++) {
                if (layout[y][x] === '.') {
                    this.heights[x]--;
                }
            }
        }
    }

    getTumblerHeight(index: number): number {
        return this.heights[index];
    }

    getHeights(): number[] {
        return this.heights;
    }
}