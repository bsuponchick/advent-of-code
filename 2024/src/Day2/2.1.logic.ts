export class Report {
    levels: number[] = [];

    public constructor(levels: number[]) {
        this.levels = levels;
    }

    public determineIfSafe(): boolean {
        if (this.levels[0] < this.levels[1]) {
            // All levels should be decreasing
            for (let i = 0; i < this.levels.length - 1; i++) {
                if (this.levels[i] >= this.levels[i + 1]) {
                    return false;
                } else if (Math.abs(this.levels[i] - this.levels[i + 1]) > 3) {
                    return false;
                }
            }
        } else {
            // All levels should be increasing
            for (let i = 0; i < this.levels.length - 1; i++) {
                if (this.levels[i] <= this.levels[i + 1]) {
                    return false;
                } else if (Math.abs(this.levels[i] - this.levels[i + 1]) > 3) {
                    return false;
                }
            }
        }

        return true;
    }
}